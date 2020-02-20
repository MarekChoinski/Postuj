import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import DefaultAvatar from '../assets/images/defaultAvatar.png';

import { useDispatch, useSelector } from 'react-redux';

import ThemeSwitch from './ThemeSwitch';

import {
    NavLink
} from "react-router-dom";
import { signOut, signUp } from '../state/ducks/auth/operations';


const MenuBar: React.FC = () => {

    const dispatch = useDispatch();

    const authorized = useSelector((state: any) =>
        !state.firebase.auth.isEmpty
    );

    const profile = useSelector((state: any) =>
        !state.firebase.auth.isEmpty ? state.firebase.profile : null
    );

    const uid = useSelector((state: any) =>
        !state.firebase.auth.isEmpty ? state.firebase.auth.uid : null
    );

    const links = (authorized && profile) ?
        <>

            <NavDropdown
                title={profile.username}
                className="menu_bar__username"
                id="basic-nav-dropdown">
                <NavDropdown.Item
                    onClick={() => dispatch(signOut())}><b>Admin</b></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => dispatch(signOut())}>Wyloguj się</NavDropdown.Item>
                {/* <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
            </NavDropdown>
            {/* <Nav.Link as="img" to="/">Zarejestruj się</Nav.Link> */}
            <Nav.Link as={NavLink} to={`/profile/${uid}`}>

                <img
                    className="menu_bar__avatar"
                    src={profile.profilePicPath || DefaultAvatar}
                    alt="placeholder"
                />
            </Nav.Link>

        </>
        :
        <>
            <Nav.Link className="menu_bar__item" as={NavLink} to="/signup">Zarejestruj się</Nav.Link>
            <Nav.Link className="menu_bar__item" as={NavLink} to="/login">Zaloguj się</Nav.Link>
        </>;


    return (


        <Navbar className="menu_bar navbar-expand" bg="primary" variant="light" fixed="top">
            <Navbar.Brand as={NavLink} to="/" >Postuj.pl</Navbar.Brand >
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
                id="basic-navbar-nav"
                className="justify-content-end"
            >

                {/* <ThemeSwitch /> */}
                <Nav>

                    {links}

                </Nav>
            </Navbar.Collapse>
        </Navbar >
    );


};

export default MenuBar;