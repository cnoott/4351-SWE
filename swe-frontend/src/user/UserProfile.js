import React, { useState, useEffect } from 'react';
import Layout from '../shared/Layout';
import { isAuthenticated } from '../auth';
import { useParams } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

const API = 'http://localhost:8000/api';

const UserProfile = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        address: '',
        billingAddress: '',
        preferredDinerNum: '',
        preferredPayment: '',
        creditCardNumber: ''
    });

    const { name, email, address, billingAddress, preferredPayment, preferredDinerNum, creditCardNumber } = values;

    const [success, setSuccess] = useState(false);

    const { user: { _id } } = isAuthenticated();
    useEffect(() => {
        fetch(`${API}/user/${_id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(async response => {
                const user = await response.json();
                console.log(user);
                setValues(user);
            });
    },[]);

    const handleChange = e => {
        setValues({...values, creditCardNumber: e.target.value});
    };

    const submit = e => {
        e.preventDefault();
        fetch(`${API}/update-user/${_id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(async response => {
                const user = await response.json();
                if (!user.error) {
                    setSuccess(true);
                }
            });
    };

    return (
        <Layout>
            <h1> Profile </h1>
            { success && <Alert variant='success'> Success! </Alert> }
            <ListGroup>
                <ListGroup.Item><strong>Name: </strong> {name}</ListGroup.Item>
                <ListGroup.Item><strong>Email:</strong> {email}</ListGroup.Item>
                <ListGroup.Item><strong>Address:</strong> {address}</ListGroup.Item>
                <ListGroup.Item><strong>Billing Address:</strong> {billingAddress}</ListGroup.Item>
                <ListGroup.Item><strong>Prefered Diner Number:</strong> {preferredDinerNum}</ListGroup.Item>
                <ListGroup.Item><strong>Preferred Payment: </strong>{preferredPayment}</ListGroup.Item>
                <ListGroup.Item
                ><strong>Credit Card Number: {' '}</strong> 
                <input onChange={handleChange} value={creditCardNumber}/></ListGroup.Item>

            </ListGroup>
                <Button variant='primary mt-2' onClick={submit}>Save Credit Card</Button>
        </Layout>
    );
};

export default UserProfile;
