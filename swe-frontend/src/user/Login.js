import React, { useState } from 'react';
import Layout from '../shared/Layout';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const { email, password } = values;


    const handleChange = name => e => {
        const value = e.target.value;

        setValues({...values, [name]: value});
    };

    return(
        <Layout>
            <Container className='p-20'>
                <Form>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            value={email}
                            onChange={handleChange('email')}
                        />
                        {email}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={handleChange('password')}
                        />
                        {password}
                    </Form.Group>
                </Form> 
                <Button variant='primary'> Signin </Button>
                <Button variant='Secondary' href='/guest-reserve'> Continue as guest </Button>
            </Container>
        </Layout>
    );
};

export default Login;
