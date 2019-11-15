import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import {
    NavLink
} from "react-router-dom";


const MenuBar: React.FC = () => {



    return (
        <Navbar expand="lg" bg="primary" variant="light" fixed="top">
            <Navbar.Brand as={NavLink} to="/" > React - Bootstrap</Navbar.Brand >
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav>
                    {/* <Nav.Link as={NavLink} to="/" exact>Home</Nav.Link> */}
                    <Nav.Link as={NavLink} to="/404">404</Nav.Link>
                    <Nav.Link as={NavLink} to="/signup">signup</Nav.Link>
                    <Nav.Link as={NavLink} to="/login">login</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar >
    );


};

export default MenuBar;