import React from 'react';
import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';
import DefaultAvatar from '../assets/images/defaultAvatar.png';
import { useFirestoreConnect, useFirebase, useFirestore } from 'react-redux-firebase'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useSelector, useDispatch } from 'react-redux';
import { ReactComponent as IconFavorite } from '../assets/post-icon_favorite.svg';
import { ReactComponent as IconAddToFavorite } from '../assets/post-icon_add_to_favorite.svg';
import { ReactComponent as IconLike } from '../assets/post-icon_like.svg';


import {
    Link
} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { addPostToFavorites, removePostFromFavorites } from '../state/ducks/posts/operations';

interface PostProps {
    author: string,
    date: any,
    content: string,
    id: string,
    authorProfilePicture: string,
    likes: number,
    favorite: boolean,
};

const PostCard: React.FC<PostProps> = (props) => {

    const {
        author,
        date,
        content,
        id,
        authorProfilePicture,
        likes,
        favorite
    } = props;
    const dispatch = useDispatch();

    const authorized = useSelector((state: any) =>
        !state.firebase.auth.isEmpty
    );

    const profile = useSelector((state: any) =>
        !state.firebase.auth.isEmpty ? state.firebase.profile : null
    );

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

                {

                    (authorized && profile) ?
                        (favorite ?

                            <Button
                                variant="light"
                                style={{
                                    padding: "3px",
                                }}
                                onClick={
                                    () => {
                                        dispatch(removePostFromFavorites(id))
                                    }
                                }
                            >
                                <IconFavorite />
                            </Button>
                            : <Button
                                variant="light"
                                style={{
                                    padding: "3px",
                                }}
                                onClick={
                                    () => {
                                        dispatch(addPostToFavorites(id))
                                    }
                                }
                            >
                                <IconAddToFavorite />
                            </Button>) : null

                }



                <Button
                    variant="light"
                    style={{
                        // padding: "3px",
                        // lineHeight: "32px",
                    }}
                >
                    <IconLike />
                    <span
                        style={{
                            color: "black",
                            fontWeight: "bold",
                            // padding: "3px",
                            fontSize: "17px",
                        }}>
                        {likes}
                    </span>
                </Button>




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