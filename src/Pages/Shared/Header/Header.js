import { signOut } from 'firebase/auth';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../../firebase.init';
import logo from '../../../img/logo.png';
import './Header.css'

const Header = () => {
    const [user] = useAuthState(auth);

    const handleSignOut = () => {
        signOut(auth);
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" sticky='top' bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/home"><img src={logo} width='200px' alt="" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className='ms-auto'>
                            <Nav.Link className='text-white me-5' href="home#services">Services</Nav.Link>
                            <Nav.Link className='text-white me-5' href="home#experts">Experts</Nav.Link>
                            <Nav.Link className='text-white me-5' as={Link} to="/about">About</Nav.Link>
                            {
                                user && <>
                                    <Nav.Link className='text-white me-5' as={Link} to="/addservice">Add service</Nav.Link>
                                    <Nav.Link className='text-white me-5' as={Link} to="/manage">Manage service</Nav.Link>
                                    <Nav.Link className='text-white me-5' as={Link} to="/orders">Orders</Nav.Link>
                                </>
                            }
                            {
                                user ?
                                    <button onClick={handleSignOut} className='btn btn-light'>Sign out</button>
                                    :
                                    <Nav.Link className='text-white me-2' as={Link} to="login">Login</Nav.Link>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;