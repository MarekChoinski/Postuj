import React, { useState } from 'react';
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

    const [status, setStatus] = useState("open");


    return (
        <Card
            className={`observed_popup ${status === "closing" ? "observed_popup--closing" : (status === "closed" ? "observed_popup--closed" : null)}`}
        >
            <Card.Header
                className="observed_popup__header"
            >
                <Media
                    className="observed_popup__media_header"
                >
                    <Link to={"/profile/" + authorId}>
                        <img
                            className="observed_popup__avatar"
                            src={authorProfilePicture || DefaultAvatar}
                            alt="User avatar"
                        />
                    </Link>
                    <Media.Body>
                        <h4
                            className="observed_popup__username">
                            {author} dodał przed chwilą post
                        </h4>

                    </Media.Body>
                </Media>

                <Button
                    variant="light"
                    className="observed_popup__close_btn"
                    onClick={
                        () => {
                            setStatus("closing");
                            setTimeout(function () {
                                setStatus("closed");
                            }, 500);
                        }
                    }
                >
                    <IconClose />
                </Button>

            </Card.Header>
            <Card.Body
                className="observed_popup__body"
            >
                <Card.Text>
                    {content.length > 200 ? content.substr(0, 200) + "..." : content}
                </Card.Text>

            </Card.Body>
            <Card.Footer
                className="observed_popup__footer"
            >

                <Button
                    variant="light"
                    as={Link}
                    to={"/post/" + id}
                    className="observed_popup__show_post"

                >
                    Pokaż post
                </Button>
            </Card.Footer>
        </Card >
    );


};

export default ObservedPopup;