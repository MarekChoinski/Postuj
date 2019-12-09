import React from 'react';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
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

const SortBar: React.FC = () => {

    return (
        <Card
            style={{
                width: "900px",
                margin: "50px auto"
            }}
        >
            <Card.Body>
                <span
                    style={{
                        display: "inline",
                    }}
                >

                    Sortuj według:
                </span>

                <Dropdown
                    style={{
                        display: "inline",
                        marginLeft: "10px",
                    }}
                >
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                        najnowszych
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">najpopularniejszych</Dropdown.Item>
                        <Dropdown.Item href="#/action-1">najpopularniejszych z ostatnich 6h</Dropdown.Item>
                        <Dropdown.Item href="#/action-1">najpopularniejszych z ostatnich 12h</Dropdown.Item>
                        <Dropdown.Item href="#/action-1">najpopularniejszych z ostatniej doby</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Card.Body>
        </Card>
    );


};

export default SortBar;