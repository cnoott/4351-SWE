import React, { useState } from 'react';
import Layout from '../shared/Layout';
import Form from 'react-bootstrap/Form';

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
            <Form className=''>
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
        </Layout>
    );
};

export default Login;
