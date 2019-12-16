

import React from 'react';

import PostCard from '../components/PostCard';
import { useFirestoreConnect } from 'react-redux-firebase'
import { useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { Redirect } from 'react-router';

type Props = {
    match: {
        params: {
            readonly id: string;
        }
    }
};

const PostPage: React.FC<Props> = (props) => {


    //TODO redundancy with mainpage

    const favoritePosts = useSelector((state: any) =>
        !state.firebase.auth.isEmpty ? state.firebase.profile.favoritePosts : []
    );

    const authors = useSelector((state: any) =>
        state.firestore.ordered.authors ?
            state.firestore.ordered.authors.reduce((hash: any, author: any) => {
                hash[author.id] = {
                    ...author
                };
                return hash;
            }, {})
            : null
    );

    const posts = useSelector((state: any) =>
        authors ?
            state.firestore.ordered.posts.map(
                (post: any) =>
                    ({
                        ...post,
                        author: authors[post.authorId],
                        isFavorite: favoritePosts ? favoritePosts.includes(post.id) : false,
                    })
            )
            : state.firestore.ordered.posts
    );

    const authorsQueries = posts ? posts.map((post: any) => ({
        collection: 'users',
        doc: post.authorId,
        storeAs: 'authors'
    })) : [];

    useFirestoreConnect([
        {
            collection: 'posts',
            doc: props.match.params.id,
        },
        ...authorsQueries,
    ])




    console.log(posts);


    return (

        posts ?
            posts[0] && authors ?
                <PostCard
                    author={posts[0].author.username}
                    authorId={posts[0].author.id}
                    content={posts[0].content}
                    authorProfilePicture={posts[0].author.profilePicPath}
                    key={posts[0].id}
                    date={posts[0].createdAt.seconds}
                    id={posts[0].id}
                    likedBy={posts[0].likedBy}
                    favorite={posts[0].isFavorite} //TODO
                />
                : <Redirect to="/404" />

            : <Spinner
                animation="grow"
                style={{
                    marginTop: "30vh",
                    marginLeft: "50vw",

                }}
                role="status"
            >
                <span className="sr-only">
                    Loading...
                </span>
            </Spinner>

    );
}

export default PostPage;
