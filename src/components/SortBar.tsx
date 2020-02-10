import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Media from 'react-bootstrap/Media';
import DefaultAvatar from '../assets/images/defaultAvatar.png';
import { useFirestoreConnect, useFirebase, useFirestore } from 'react-redux-firebase'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useSelector, useDispatch } from 'react-redux';
import { setSortMethod } from '../state/ducks/posts/operations';


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

const SortBar: React.FC<{}> = (props) => {

    const [sortMethodText, setSortText] = useState('newest');
    const dispatch = useDispatch();

    type sortOptions = {
        [key: string]: string
    }
    const PL: sortOptions = {
        newest: "najnowszych",
        topAll: "najpopularniejszych",
        top6: "najpopularniejszych z ostatnich 6h",
        top12: "najpopularniejszych z ostatnich 12h",
        top24: "najpopularniejszych z ostatniej doby",
    };

    const sortOptions = [
        "newest", "topAll", "top6", "top12", "top24",
    ];


    return (
        <Card
            className="sort_bar"
        >
            <Card.Body>
                <span
                    style={{
                        display: "inline",
                    }}
                >
                    Sortuj posty według:
                </span>

                <Dropdown
                    style={{
                        display: "inline",
                        marginLeft: "10px",
                    }}
                >
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                        {PL[sortMethodText]}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {sortOptions.map((option: string) => (
                            <Dropdown.Item
                                key={option}
                                onClick={
                                    () => {
                                        dispatch(setSortMethod(option))
                                        setSortText(option)
                                    }
                                }>
                                {PL[option]}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </Card.Body>
        </Card>
    );


};

export default SortBar;