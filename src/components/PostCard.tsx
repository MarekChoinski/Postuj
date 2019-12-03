import React from 'react';
import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';
import DefaultAvatar from '../assets/images/defaultAvatar.png';

import {
    Link
} from "react-router-dom";

interface PostProps {
    author: string,
    date: string,
    text: string,
    id: string,

};

const PostCard: React.FC<PostProps> = (props) => {

    const { author, date, text, id } = props;

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
                        src={DefaultAvatar}
                        alt="placeholder"
                    />
                    <Media.Body>
                        <h4>{author}</h4>
                        <em>
                            Lorem, ipsum dolor.
                        </em>
                    </Media.Body>
                </Media>
                {/* <p className="justify-content-end">+</p> */}
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    {text}
                </Card.Text>
            </Card.Body>
            <Card.Footer
                className="text-muted"
                style={{
                    display: "flex",
                }}
            >
                <span>

                    {date}
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