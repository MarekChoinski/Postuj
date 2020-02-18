import React, { useState, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Media from 'react-bootstrap/Media';
import DefaultAvatar from '../assets/images/defaultAvatar.png';
import { useFirestoreConnect, useFirebase, useFirestore } from 'react-redux-firebase'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useSelector, useDispatch } from 'react-redux';
import { setSortMethod } from '../state/ducks/posts/operations';

import { ThemeContext } from '../contexts/ThemeContext';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';


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

const SortProfileBar: React.FC<{}> = (props) => {

    const { theme } = useContext(ThemeContext);

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
        <ToggleButtonGroup
            type="radio"
            name="theme"
            style={{
                margin: "50px auto 0 auto",
                width: "900px",
            }}
        // value={value}
        // onChange={handleChange}
        // className={`theme_switch ${theme}`}
        >

            <ToggleButton
                value="best"
                variant="light"
            // className={`theme_switch__button ${theme}`}
            >
                Najlepsze
                                </ToggleButton>

            <ToggleButton
                value="newest"
                variant="light"
            // className={`theme_switch__button ${theme}`}
            >
                Najnowsze
                                </ToggleButton>

            <ToggleButton
                value="favorite"
                variant="light"
            // className={`theme_switch__button ${theme}`}
            >
                Ulubione
                                </ToggleButton>
            <ToggleButton
                value="liked"
                variant="light"
            // className={`theme_switch__button ${theme}`}
            >
                Polubione
                                </ToggleButton>

            <ToggleButton
                value="observed"
                variant="light"
            // className={`theme_switch__button ${theme}`}
            >
                Obserwowani
                                </ToggleButton>

        </ToggleButtonGroup>
    );


};

export default SortProfileBar;