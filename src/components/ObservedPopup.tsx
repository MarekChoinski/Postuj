import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';
import DefaultAvatar from '../assets/images/defaultAvatar.png';
// import { useFirestoreConnect, useFirebase, useFirestore } from 'react-redux-firebase'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { format } from 'date-fns'
import { useSelector, useDispatch } from 'react-redux';
import { ReactComponent as IconClose } from '../assets/observed_popup-icon_close.svg';
// import { ReactComponent as IconAddToFavorite } from '../assets/post-icon_add_to_favorite.svg';
// import { ReactComponent as IconLike } from '../assets/post-icon_like.svg';

// import { ThemeContext } from '../contexts/ThemeContext';

import {
    Link
} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { addPostToFavorites, removePostFromFavorites, likePost, unlikePost } from '../state/ducks/posts/operations';
// import { likePost } from '../state/ducks/posts/actions';

interface PostProps {
    author: string,
    authorId: string,
    // date: any,
    content: string,
    // attachedPhoto: any,
    id: string,
    authorProfilePicture: string,
    // likedBy: Array<string>,
    // favorite: boolean,
};

const ObservedPopup: React.FC<PostProps> = (props) => {

    const {
        author,
        authorId,
        // date,
        content,
        // attachedPhoto,
        id,
        authorProfilePicture,
        // likedBy,
        // favorite,
    } = props;


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
                            className="text-muted"
                        // title={format((date * 1000), "'Opublikowano 'dd-MM-yyyy' o godz. 'hh:mm")}
                        >
                            przed chwilą
                        </span>



                    </Media.Body>
                </Media>

                <Button
                    variant="light"
                    className="post_card__observe_button"
                >
                    <IconClose
                        className="post_card__observe_icon" />
                </Button>

            </Card.Header>
            <Card.Body
                className="post_card__body"
            >
                <Card.Text>
                    {content}
                </Card.Text>

            </Card.Body>
            <Card.Footer
                className="text-muted post_card__footer"
            >

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

export default ObservedPopup;