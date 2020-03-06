

import React, { useMemo } from 'react';

import PostCard from '../components/PostCard';
import PostCard404 from '../components/PostCard404';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase'
import { subHours } from 'date-fns';
import LoadingSpinner from './LoadingSpinner';
import * as types from '../state/ducks/types'

interface PostListParametres {
    author?: string,
};

const PostsList: React.FC<PostListParametres> = () => {

    const sortMethod: types.SortMethod = useSelector((state: types.State) =>
        state.posts.sortMethod
    );

    const favoritePosts = useSelector((state: types.State) =>
        !state.firebase.auth.isEmpty ? state.firebase.profile.favoritePosts : []
    );

    // TODO make this as a selector returning tuple
    let valueToOrderTo = "createdAt";

    const before = useMemo(
        () => {
            if (sortMethod === types.SortMethod.Top6) {
                return subHours(new Date(), 6);
            }
            else if (sortMethod === types.SortMethod.Top12) {
                return subHours(new Date(), 12);
            }
            else if (sortMethod === types.SortMethod.Top24) {
                return subHours(new Date(), 24);
            }
            else return null;
        },
        [sortMethod]
    );

    if (sortMethod === types.SortMethod.Newest) {
        valueToOrderTo = "createdAt";
        // before = null;
    }
    else {
        valueToOrderTo = "likes";
    }

    const authors = useSelector((state: types.State) =>
        state.firestore.ordered.authors ?
            state.firestore.ordered.authors.reduce((hash: any, author: any) => {
                hash[author.id] = {
                    ...author
                };
                return hash;
            }, {})
            : null
    );

    const posts = useSelector((state: types.State) =>
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

    // console.log("posts", posts);
    // console.log("au", authors);
    // console.log();

    const authorsQueries = posts ? posts.map((post: any) => ({
        collection: 'users',
        doc: post.authorId,
        storeAs: 'authors'
    })) : [];

    useFirestoreConnect([
        ...authorsQueries,
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
    ]);

    if (posts && before) {
        posts.sort((a: any, b: any) => (b.likes - a.likes));
    }

    const postList = (authors) ? posts.map((post: any) =>

        <PostCard
            author={post.author.username}
            authorId={post.author.id}
            content={post.content}
            attachedPhoto={post.attachedPhoto}
            authorProfilePicture={post.author.profilePicPath}
            key={post.id}
            id={post.id}
            date={post.createdAt.seconds}
            likedBy={post.likedBy}
            favorite={post.isFavorite}
        />
    ) : <LoadingSpinner />;


    if (postList.length === 0) {
        return <PostCard404 />
    }

    return postList;
}

export default PostsList;
