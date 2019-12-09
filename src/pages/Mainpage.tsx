

import React, { useEffect } from 'react';

import PostCard from '../components/PostCard';

import { useSelector } from 'react-redux';

// import { postsSelectors } from '../state/ducks/posts';
import AddPostForm from '../components/AddPostForm';
import { useFirestoreConnect, useFirebase } from 'react-redux-firebase'
import Spinner from 'react-bootstrap/Spinner';


const Mainpage: React.FC = () => {

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
        { collection: 'posts' },
        ...authorsQueries,
    ]);

    const postList = (authors) ? posts.map((post: any) =>

        <PostCard
            author={post.author.username}
            content={post.content}
            authorProfilePicture={post.author.profilePicPath}
            key={post.id}
            id={post.id}
            date={post.createdAt.seconds}//TODO fix this for dates
        />
    ) : <Spinner
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
        </Spinner>;



    return (
        <>
            <AddPostForm />
            {postList}

        </>
    );
}

export default Mainpage;
