

import React from 'react';

import PostCard from '../components/PostCard';

type Props = {
    match: {
        params: {
            readonly id: string;
        }
    }
};

const PostPage: React.FC<Props> = (props) => {

    // const id = props.match.params.id;
    // console.log();

    return (
        <>
            {props.match.params.id}
            < PostCard />
        </>
    );
}

export default PostPage;
