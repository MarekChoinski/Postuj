import React, { useState, useContext, useCallback } from 'react';
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

    // const { theme } = useContext(ThemeContext);

    const [sortMethodText, setSortText] = useState('newest');
    const dispatch = useDispatch();

    const handleChange = useCallback(
        (option: any) => {
            dispatch(setSortMethod(option))
            setSortText(option)
        },
        [setSortMethod, setSortText],
    );

    type sortOptions = {
        [key: string]: string
    }

    //TODO this has no sense, should iterate by keys - but for now i should check i18n
    const PL: sortOptions = {
        best: "Najlepsze",
        newest: "Najnowsze",
        favorite: "Ulubione",
        liked: "Polubione",
        observed: "Obserwowani",
    };

    //TODO this has no sense, should iterate by keys - but for now i should check i18n
    const sortOptions = [
        "best",
        "newest",
        "favorite",
        "liked",
        "observed",
    ];


    return (
        <ToggleButtonGroup
            type="radio"
            name="theme"
            value={sortMethodText}
            onChange={handleChange}
            className="sort_profile_bar"
        >

            {sortOptions.map((option: string) => (

                <ToggleButton
                    value={option}
                    variant="light"
                    className="sort_profile_bar__button"
                >
                    {PL[option]}
                </ToggleButton>
            ))}

        </ToggleButtonGroup>
    );

};

export default SortProfileBar;