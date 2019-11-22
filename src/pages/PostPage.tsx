

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

    useFirestoreConnect([
        {
            collection: 'posts',
            doc: props.match.params.id,
        } // or 'todos'
    ])



    // useFirestoreConnect(() => [
    //     { collection: 'todos', doc: todoId } // or `todos/${props.todoId}`
    // ])
    // const todos = useSelector(({ firestore: { ordered } }) => ordered.todos && ordered.todos[todoId])
    const post = useSelector((state: any) =>
        state.firestore.ordered.posts
        // ?
        //     state.firestore.ordered.posts[0] : undefinied;
    );

    console.log(post);



    // const id = props.match.params.id;
    // console.log();

    return (

        post ?
            post[0] ?
                <PostCard
                    author={post[0].authorName}
                    text={post[0].content}
                    key={post[0].id}
                    date={(new Date(post[0].createdAt.seconds)).toString()}
                    id={post[0].id}
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
