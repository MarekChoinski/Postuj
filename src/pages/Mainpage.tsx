

import React from 'react';

import PostCard from '../components/PostCard';

import { useSelector } from 'react-redux';

// import { postsSelectors } from '../state/ducks/posts';
import AddPostForm from '../components/AddPostForm';
import { useFirestoreConnect, useFirebase } from 'react-redux-firebase'
import Spinner from 'react-bootstrap/Spinner';


const Mainpage: React.FC = () => {

    // const firebase = useFirebase();

    // const auth = useSelector((state: any) => state.firebase.auth)









    useFirestoreConnect([
        { collection: 'posts' } // or 'todos'
    ])
    const posts = useSelector((state: any) => state.firestore.ordered.posts);



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



    return (
        <>
            <AddPostForm />
            {postList}

        </>
    );
}

export default Mainpage;
