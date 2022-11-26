import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { isAuthenticated, signout } from '../auth';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
    const navigate = useNavigate();
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Software engineering project</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            { isAuthenticated() 
                                ?
                                    <>
                                        <Nav.Link href="/">Home</Nav.Link>
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

export default Layout;
