import React, { useContext, useState, useCallback } from 'react';
import { ReactComponent as ThemeLightIcon } from '../assets/theme_light.svg';
import { ReactComponent as ThemeDarkIcon } from '../assets/theme_dark.svg';
import { ReactComponent as ThemeMoodIcon } from '../assets/theme_mood.svg';

import { ThemeContext } from '../contexts/ThemeContext';

import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';



const ThemeSwitch: React.FC = () => {

    const { setTheme, theme } = useContext(ThemeContext);
    const [value, setValue] = useState(1);

    /*
     * The second argument that will be passed to
     * `handleChange` from `ToggleButtonGroup`
     * is the SyntheticEvent object, but we are
     * not using it in this example so we will omit it.
     */
    const handleChange = useCallback(
        (value) => {
            setValue(value)
            setTheme(value);
        },
        [setValue, setTheme],
    );



    return (
        <div className="theme_switch">

            <ToggleButtonGroup
                type="radio"
                name="theme"
                value={value}
                onChange={handleChange}
                className={`theme_switch__button-group ${theme}`}
            >

                <ToggleButton
                    value="light"
                    variant="light"
                    className={`theme_switch__button ${theme}`}
                >
                    <ThemeLightIcon />
                </ToggleButton>

                <ToggleButton
                    value="mood"
                    variant="light"
                    className={`theme_switch__button ${theme}`}
                >
                    <ThemeMoodIcon />
                </ToggleButton>

                <ToggleButton
                    value="dark"
                    variant="light"
                    className={`theme_switch__button ${theme}`}
                >
                    <ThemeDarkIcon />
                </ToggleButton>

            </ToggleButtonGroup>
        </div >
    );
}

export default ThemeSwitch;