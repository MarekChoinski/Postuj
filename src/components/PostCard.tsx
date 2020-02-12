import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';
import DefaultAvatar from '../assets/images/defaultAvatar.png';
import { useFirestoreConnect, useFirebase, useFirestore } from 'react-redux-firebase'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useSelector, useDispatch } from 'react-redux';
import { ReactComponent as IconFavorite } from '../assets/post-icon_favorite.svg';
import { ReactComponent as IconAddToFavorite } from '../assets/post-icon_add_to_favorite.svg';
import { ReactComponent as IconLike } from '../assets/post-icon_like.svg';

import { ThemeContext } from '../contexts/ThemeContext';

import {
    Link
} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { addPostToFavorites, removePostFromFavorites, likePost, unlikePost } from '../state/ducks/posts/operations';
// import { likePost } from '../state/ducks/posts/actions';

interface PostProps {
    author: string,
    authorId: string,
    date: any,
    content: string,
    id: string,
    authorProfilePicture: string,
    likedBy: Array<string>,
    favorite: boolean,
};

const PostCard: React.FC<PostProps> = (props) => {

    const { theme } = useContext(ThemeContext);

    const {
        author,
        authorId,
        date,
        content,
        id,
        authorProfilePicture,
        likedBy,
        favorite,
    } = props;
    const dispatch = useDispatch();

    const authorized = useSelector((state: any) =>
        !state.firebase.auth.isEmpty
    );

    const profile = useSelector((state: any) =>
        !state.firebase.auth.isEmpty ? state.firebase.profile : null
    );


    const isAlreadyLiked = useSelector((state: any) =>
        (authorized && profile) ?
            likedBy.includes(state.firebase.auth.uid)
            : false
    );

    // console.log("id", id);

    return (
        <Card
            className={`post_card ${theme}`}
        >
            <Card.Header
                className={`post_card__header `}
            >
                <Media>
                    <Link to={"/profile/" + authorId}>
                        <img
                            width={64}
                            height={64}
                            className="mr-3"
                            src={authorProfilePicture || DefaultAvatar}
                            alt="User avatar"
                            style={{
                                borderRadius: "5px",
                            }}
                        />
                    </Link>
                    <Media.Body>
                        <Link to={"/profile/" + authorId}>
                            <h4
                                className={`post_card__username ${theme}`}>
                                {author}
                            </h4>
                        </Link>
                        <span
                            className="text-muted"
                            title="My tip"
                        >
                            {formatDistanceToNow(date * 1000, { addSuffix: true })}
                        </span>



                    </Media.Body>
                </Media>
                {
                    (authorized && profile) &&
                    <Button
                        variant="light"
                        className={`post_card__observe ${theme}`}
                    >
                        Obserwuj
                        <IconLike
                            className={`post_card__observe_icon ${theme}`} />
                    </Button>

                }
            </Card.Header>
            <Card.Body
                className={`post_card__body ${theme}`}
            >
                <Card.Text>
                    {content}
                </Card.Text>

                <img src="https://placekitten.com/300/200" alt="test" className={`post_card__image ${theme}`} />

            </Card.Body>
            <Card.Footer
                className={`text-muted post_card__footer `}
            >
                {
                    (authorized && profile) ?
                        (favorite ?
                            <Button
                                variant="light"
                                className={`text-muted post_card__fav_button ${theme}`}
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
                                className={`text-muted post_card__fav_button ${theme}`}
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
                    variant={isAlreadyLiked ? "success" : "light"}
                    className={`post_card__fav_button post_card__fav_button--plus ${theme}`}
                    onClick={
                        () => {
                            if (authorized && profile) {
                                if (isAlreadyLiked) {
                                    dispatch(unlikePost(id))
                                }
                                dispatch(likePost(id))
                            }
                        }
                    }
                >
                    <IconLike
                        style={{
                            height: "24px",
                        }} />
                    <span
                        style={{
                            color: "black",
                            fontWeight: "bold",
                            // padding: "3px",
                            fontSize: "17px",
                            display: "block",
                            height: "24px",
                            lineHeight: "24px",
                            marginLeft: "5px",
                        }}>
                        {likedBy.length}
                    </span>
                </Button>




                <Button
                    variant="light"
                    as={Link}
                    to={"/post/" + id}
                    className={`post_card__show_post ${theme}`}

                >
                    Pokaż post
                </Button>
            </Card.Footer>
        </Card >
    );


};

export default PostCard;