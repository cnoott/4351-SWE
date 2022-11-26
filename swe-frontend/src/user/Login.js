import React, { useState } from 'react';
import Layout from '../shared/Layout';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { signIn, authenticate } from '../auth';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const { email, password } = values;

    const [error, setError] = useState('');

    const handleChange = name => e => {
        const value = e.target.value;

        setValues({...values, [name]: value});
    };

    const navigate = useNavigate();

    const handleSubmit = e => {
        setError('');
        e.preventDefault();

        signIn(values).then(res => {
            if (res.error) {
                setError(res.error);
            }
            else {
                authenticate(res, () => {
                    navigate('/', { replace: true });
                });
            }
        });
    };

    return(
        <Layout>
            <Container className='p-20'>
                <Form>
                    { error && 
                    <Alert variant='danger'>
                        {error}
                    </Alert>
                    }
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
                <Button 
                    variant='primary'
                    onClick={handleSubmit}
                > 
                Signin 
                </Button>

                <Button href='/signup' variant='secondary' className='mx-2'>
                    Or Create an Account
                </Button>
            </Container>
        </Layout>
    );
};

export default Login;
