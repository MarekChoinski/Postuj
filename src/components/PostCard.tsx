import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';
import DefaultAvatar from '../assets/images/defaultAvatar.png';
import { useFirestoreConnect, useFirebase, useFirestore } from 'react-redux-firebase'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { format } from 'date-fns'
import { useSelector, useDispatch } from 'react-redux';
import { ReactComponent as IconFavorite } from '../assets/post-icon_favorite.svg';
import { ReactComponent as IconAddToFavorite } from '../assets/post-icon_add_to_favorite.svg';
import { ReactComponent as IconLike } from '../assets/post-icon_like.svg';


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
    attachedPhoto: any,
    id: string,
    authorProfilePicture: string,
    likedBy: Array<string>,
    favorite: boolean,
};

const PostCard: React.FC<PostProps> = (props) => {

    const {
        author,
        authorId,
        date,
        content,
        attachedPhoto,
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

    return (
        <Card
            className="post_card"
        >
            <Card.Header
                className="post_card__header"
            >
                <Media>
                    <Link to={"/profile/" + authorId}>
                        <img
                            className="post_card__avatar"
                            src={authorProfilePicture || DefaultAvatar}
                            alt="User avatar"
                        />
                    </Link>
                    <Media.Body>
                        <Link to={"/profile/" + authorId}>
                            <h4
                                className="post_card__username">
                                {author}
                            </h4>
                        </Link>
                        <span
                            className="post_card__created_at"
                            title={format((date * 1000), "'Opublikowano 'dd-MM-yyyy' o godz. 'hh:mm")}
                        >
                            {formatDistanceToNow(date * 1000, { addSuffix: true })}
                        </span>



                    </Media.Body>
                </Media>
                {
                    (authorized && profile) &&
                    <Button
                        variant="light"
                        className="post_card__observe_button"
                    >
                        <span className="post_card__observe_text">

                            Obserwuj
                        </span>
                        <IconLike
                            className="post_card__observe_icon" />
                    </Button>

                }
            </Card.Header>
            <Card.Body
                className="post_card__body"
            >
                <Card.Text>
                    {content}
                </Card.Text>
                {
                    attachedPhoto &&
                    <img
                        src={attachedPhoto}
                        alt="test"
                        className="post_card__image" />
                }

            </Card.Body>
            <Card.Footer
                className="post_card__footer"
            >
                {
                    (authorized && profile) ?
                        (favorite ?
                            <Button
                                variant="light"
                                className="post_card__fav_button post_card__fav_button--is_favorite"
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
                                className="post_card__fav_button"
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
                    className={`post_card__fav_button ${isAlreadyLiked && "post_card__fav_button--is_liked"}`}
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
                    <IconLike />
                    <span>
                        {likedBy.length}
                    </span>
                </Button>

                <Button
                    variant="light"
                    as={Link}
                    to={"/post/" + id}
                    className="post_card__show_post"

                >
                    Pokaż post
                </Button>
            </Card.Footer>
        </Card >
    );


};

export default PostCard;