import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch } from 'react-redux';
import { setSortMethod } from '../state/ducks/posts/operations';
import * as types from '../state/ducks/types';

const SortBar: React.FC<{}> = (props) => {

    const [sortMethodText, setSortText] = useState(types.SortMethod.Newest);
    const dispatch = useDispatch();

    type sortOptions = {
        [key in types.SortMethod]?: string
    }
    const optionText: sortOptions = {
        Newest: "najnowszych",
        Top: "najpopularniejszych",
        Top6: "najpopularniejszych z ostatnich 6h",
        Top12: "najpopularniejszych z ostatnich 12h",
        Top24: "najpopularniejszych z ostatniej doby",
    };

    //TODO this has no sense, should iterate by keys - but for now i should check i18n
    // const sortOptions = [
    //     "newest", "topAll", "top6", "top12", "top24",
    // ];

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
                        {optionText[sortMethodText]}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {Object.keys(optionText).map((option: string) => (
                            <Dropdown.Item
                                key={option}
                                onClick={
                                    () => {
                                        dispatch(setSortMethod(types.SortMethod[option]))
                                        setSortText(types.SortMethod[option])
                                    }
                                }
                            >
                                {optionText[option]}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </Card.Body>
        </Card >
    );
};

export default SortBar;