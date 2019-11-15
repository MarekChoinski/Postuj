

import React from 'react';

import PostCard from '../components/PostCard';

import { useSelector } from 'react-redux';

import { postsSelectors } from '../state/ducks/posts';
import AddPostForm from '../components/AddPostForm';

const Mainpage: React.FC = () => {

    const posts = useSelector(postsSelectors.getPosts);

    const postList = posts.map((post: any) =>
        <PostCard
            author={post.user}
            text={post.text}
            key={post.id}
            date={post.date}
        />
    );


    return (
        <>
            <AddPostForm />
            {postList}

        </>
    );
}

export default Mainpage;
