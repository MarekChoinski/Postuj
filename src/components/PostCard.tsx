import React from 'react';
import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';
import DefaultAvatar from '../assets/images/defaultAvatar.png';
import { useFirestoreConnect, useFirebase, useFirestore } from 'react-redux-firebase'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useSelector } from 'react-redux';


import {
    Link
} from "react-router-dom";

interface PostProps {
    author: string,
    date: any,
    content: string,
    id: string,
    authorProfilePicture: string,

};

const PostCard: React.FC<PostProps> = (props) => {

    const { author, date, content, id, authorProfilePicture } = props;

    // const firestore = useFirestore();

    // const aut = await firestore.collection("users").doc(author).get();

    // console.log("user", aut.get());

    // useFirestoreConnect([
    //     {
    //         collection: 'users',
    //         doc: author,
    //     }

    // ])

    // const user: any = useSelector(
    //     (state: any) => state.firestore.ordered.users &&
    //         state.firestore.ordered.users[0]
    // );


    // console.log("user", user);



    return (
        <Card
            style={{
                width: "900px",
                margin: "50px auto"
            }}
        >
            <Card.Header>
                <Media>
                    <img
                        width={64}
                        height={64}
                        className="mr-3"
                        src={authorProfilePicture || DefaultAvatar}
                        // alt="placeholder"
                        style={{
                            borderRadius: "5px",
                        }}
                    />
                    <Media.Body>
                        <h4>{author}</h4>
                        <span
                            className="text-muted"
                        >
                            {formatDistanceToNow(date * 1000, { addSuffix: true })}
                        </span>
                    </Media.Body>
                </Media>
                {/* <p className="justify-content-end">+</p> */}
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    {content}
                </Card.Text>
            </Card.Body>
            <Card.Footer
                className="text-muted"
                style={{
                    display: "flex",
                }}
            >
                <span>


                </span>
                <Card.Link
                    as={Link}
                    to={"/post/" + id}
                    // className="ml-auto"
                    style={{
                        // display: "inline-block",
                        // textAlign: "right",
                        marginLeft: "auto",
                    }}
                >
                    Pokaż post
                </Card.Link>
            </Card.Footer>
        </Card >
    );


};

export default PostCard;