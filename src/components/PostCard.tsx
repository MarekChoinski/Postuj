import React from 'react';
import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';

interface PostProps {
    author: string,
    date: string,
    text: string,

};

const PostCard: React.FC<PostProps> = (props) => {

    const { author, date, text } = props;

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
                        src="http://via.placeholder.com/64"
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
                {text}
            </Card.Body>
            <Card.Footer className="text-muted">{date}</Card.Footer>
        </Card >
    );


};

export default PostCard;