import React from 'react';
import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';


const SignUpForm: React.FC = () => {

    return (
        <Card
            style={{
                width: "600px",
                margin: "50px auto"
            }
            }
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
                        <h4>Lorem ipsum</h4>
                        <em>
                            Lorem, ipsum dolor.
    </em>
                    </Media.Body>
                </Media>
                {/* <p className="justify-content-end">+</p> */}
            </Card.Header>
            <Card.Body>
                {/* <Card.Title>Special title treatment</Card.Title> */}
                {/* <Card.Text> */}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, minima sint adipisci repellendus quod autem delectus corrupti? Pariatur dolorum optio qui perferendis nesciunt iste velit corrupti nemo unde! Minus ullam officia id atque praesentium asperiores. Aliquam, exercitationem minima? Vero repellat dicta rem culpa doloribus perferendis earum adipisci sed modi quis.
    {/* </Card.Text> */}
            </Card.Body>
            <Card.Footer className="text-muted">2 days ago</Card.Footer>
        </Card >
    );


};

export default SignUpForm;