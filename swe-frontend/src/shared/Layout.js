import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ListGroup from 'react-bootstrap/ListGroup';
import { isAuthenticated, signout } from '../auth';
import { useNavigate } from 'react-router-dom';
const API = 'http://localhost:8000/api';

const Layout = ({ children }) => {
    const navigate = useNavigate();

    const [tables, setTables] = useState([]);

    useEffect(() => {
        fetch(`${API}/read-tables`, {
            method: 'GET',
            headers: {
                'Content-type':'application/json',
                Accept:'application/json',
            }
        })
    },[]);

    if (isAuthenticated()) {
        const { user: { _id } } = isAuthenticated();
        return (
            <>
                <Navbar bg="light" expand="lg">
                    <ListGroup>
                        {  }
                    </ListGroup>

                    <Container>
                        <Navbar.Brand href="/">Software engineering project</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                { isAuthenticated() 
                                    ?
                                        <>
                                            <Nav.Link href="/">Home</Nav.Link>
                                            <Nav.Link href={`/user-profile/${_id}`}>User Profile</Nav.Link>
                                            <Nav.Link 
                                                onClick={
                                                    () => signout(() => {
                                                        navigate('/');
                                                    })}
                                            >
                                                Signout 
                                            </Nav.Link>
                                            { isAuthenticated().user.role === 1 &&
                                            <Nav.Link href='/create-table'> Admin: create table</Nav.Link>
                                            }
                                        </>
                                        :
                                        <>


                                            <Nav.Link href="/">Home</Nav.Link>
                                            <Nav.Link href="/login">Login</Nav.Link>
                                            <Nav.Link href="/signup">Create an account</Nav.Link>

                                        </>
                                }
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                {children}
            </>

        );
    }

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Software engineering project</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <>


                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link href="/login">Login</Nav.Link>
                                <Nav.Link href="/signup">Create an account</Nav.Link>

                            </>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {children}
        </>
    );
}

export default Layout;
