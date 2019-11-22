

import React from 'react';

import PostCard from '../components/PostCard';

import { useSelector } from 'react-redux';

// import { postsSelectors } from '../state/ducks/posts';
import AddPostForm from '../components/AddPostForm';
import { useFirestoreConnect } from 'react-redux-firebase'
import Spinner from 'react-bootstrap/Spinner';


const Mainpage: React.FC = () => {

    useFirestoreConnect([
        { collection: 'posts' } // or 'todos'
    ])
    const posts = useSelector((state: any) => state.firestore.ordered.posts);

    // console.log(todos);


    // const posts = useSelector(postsSelectors.getPosts);

    const postList = posts ? posts.map((post: any) =>
        <PostCard
            author={post.authorName}
            text={post.content}
            key={post.id}
            date={(new Date(post.createdAt.seconds)).toString()}//TODO fix this for dates
            id={post.id}
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

    console.log(posts && posts[0].createdAt);



    return (
        <>
            <AddPostForm />
            {postList}

        </>
    );
}

export default Mainpage;
