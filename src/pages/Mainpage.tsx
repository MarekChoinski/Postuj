

import React, { useEffect, useMemo } from 'react';

import PostCard from '../components/PostCard';

import { useSelector } from 'react-redux';

// import { postsSelectors } from '../state/ducks/posts';
import AddPostForm from '../components/AddPostForm';
import { useFirestoreConnect, useFirebase } from 'react-redux-firebase'
import Spinner from 'react-bootstrap/Spinner';
import SortBar from '../components/SortBar';
import { subHours, getMilliseconds } from 'date-fns';


const Mainpage: React.FC = () => {

    const sortMethod = useSelector((state: any) =>
        state.posts.sortMethod
    );


    const favoritePosts = useSelector((state: any) =>
        !state.firebase.auth.isEmpty ? state.firebase.profile.favoritePosts : []
    );

    // TODO make this as a selector returning tuple
    let valueToOrderTo = "createdAt";

    // let before = subHours(new Date(), 13);



    const before = useMemo(
        () => {
            if (sortMethod == "top6") {
                return subHours(new Date(), 6);
            }
            else if (sortMethod == "top12") {
                return subHours(new Date(), 12);
            }
            else if (sortMethod == "top24") {
                return subHours(new Date(), 24);
            }
            else return null;
        },
        [sortMethod]
    );

    if (sortMethod == 'newest') {
        valueToOrderTo = "createdAt";
        // before = null;
    }
    else {
        valueToOrderTo = "likes";

    }






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
            where: before ? [
                ['createdAt', '>', before]
            ] : null,
            orderBy: !before ? [
                valueToOrderTo,
                'desc'
            ] : null,
        },
        ...authorsQueries,
    ]);

    if (before) {
        posts.sort((a: any, b: any) => (b.likes - a.likes));
    }

    const postList = (authors) ? posts.map((post: any) =>

        <PostCard
            author={post.author.username}
            content={post.content}
            authorProfilePicture={post.author.profilePicPath}
            key={post.id}
            id={post.id}
            date={post.createdAt.seconds}
            likes={post.likes}
            favorite={post.isFavorite}
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
            <SortBar />
            {postList}

        </>
    );
}

export default Mainpage;
