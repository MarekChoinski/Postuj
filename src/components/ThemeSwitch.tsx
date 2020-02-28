import React, { useContext, useState, useCallback } from 'react';
import { ReactComponent as ThemeLightIcon } from '../assets/theme_light.svg';
import { ReactComponent as ThemeDarkIcon } from '../assets/theme_dark.svg';
import { ReactComponent as ThemeMoodIcon } from '../assets/theme_mood.svg';

import { ThemeContext } from '../contexts/ThemeContext';

import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

const ThemeSwitch: React.FC = () => {

    const { setTheme, theme } = useContext(ThemeContext);
    const [value, setValue] = useState("light");

    const handleChange = useCallback(
        (value) => {
            setValue(value)
            setTheme(value);
        },
        [setValue, setTheme],
    );

    return (
        <ToggleButtonGroup
            type="radio"
            name="theme"
            value={value}
            onChange={handleChange}
            className="theme_switch"
        >

            <ToggleButton
                value="light"
                variant="light"
                className="theme_switch__button"
            >
                <ThemeLightIcon />
            </ToggleButton>

            <ToggleButton
                value="mood"
                variant="light"
                className="theme_switch__button"
            >
                <ThemeMoodIcon />
            </ToggleButton>

            <ToggleButton
                value="dark"
                variant="light"
                className="theme_switch__button"
            >
                <ThemeDarkIcon />
            </ToggleButton>

        </ToggleButtonGroup>
    );
}

export default ThemeSwitch;