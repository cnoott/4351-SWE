import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Layout from './shared/Layout';
import { isAuthenticated } from './auth';
/* 
 * If user is not logged it, it should prompt them to login before regiistering, or continue as guest
 *  If user is logged in it will say regsiter
 */
const Home = () => {

    if (isAuthenticated()) {
        return (
            <Layout>
            <Container>
                <h1> Reserve a Table </h1>

                    <Button variant="primary">Reserve Table</Button>
                    <Button variant="secondary">Check reservation</Button>
            </Container>
            </Layout>
        );
    }
    else {
        return (
            <Layout>
            <Container>
                <h1> Reserve a Table </h1>
                    <Button variant="primary" href='/login'>Signin</Button>
                    <Button variant="secondary">Reserve as guest</Button>
            </Container>
            </Layout>
        );
    }
};

export default Home;
