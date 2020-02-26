import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch } from 'react-redux';
import { setSortMethod } from '../state/ducks/posts/operations';

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

    //TODO this has no sense, should iterate by keys - but for now i should check i18n
    const sortOptions = [
        "newest", "topAll", "top6", "top12", "top24",
    ];

    return (
        <Card
            className="sort_bar"
        >
            <Card.Body>
                <span>
                    Sortuj posty według:
                </span>

                <Dropdown
                    className="sort_bar__dropdown"
                >
                    <Dropdown.Toggle
                        variant="light"
                        id="dropdown-basic"
                    >
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
        </Card >
    );
};

export default SortBar;