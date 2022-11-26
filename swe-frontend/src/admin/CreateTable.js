import React, { useState } from 'react'; 
import Layout from '../shared/Layout';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

const API = 'http://localhost:8000/api';

const CreateTable = () => {
    const [values, setValues] = useState({
        tableNum: 0,
        capacity: 0
    });

    const { tableNum, capacity } = values;

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = name => e => {
        var value = e.target.value;
        
        setValues({...values, [name]: value});
    };

    const handleSubmit = e => {
        e.preventDefault();

        fetch(`${API}/create-table`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(res => {
                if (res.error) {
                    setError(res.error);
                }
                else {
                    setSuccess(true);
                }
            })
            .catch(err => console.log(err));
    };


    //TODO: show existing tables in list view

    return (
        <Layout>
            <Container>
                <h1> Create New Table </h1>
                { success && 
                <Alert variant='success'>
                    Successfully added table!
                </Alert>
                }

                { error && 
                <Alert variant='danger'>
                    {error}
                </Alert>
                }

                <Form>
                    <Form.Group className='mb-3' controlId='formGroupTableNum'>
                        <Form.Label>TableNumber</Form.Label>
                        <Form.Control
                            type='number'
                            placeHolder='Enter Table Number'
                            value={tableNum}
                            onChange={handleChange('tableNum')}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='formGroupTableNum'>
                        <Form.Label>Seat Capacity</Form.Label>
                        <Form.Control
                            type='number'
                            placeHolder='Enter Table Number'
                            value={capacity}
                            onChange={handleChange('capacity')}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button variant='primary' onClick={handleSubmit}> Submit </Button>
                </Form>
            </Container>
        </Layout>
    );
};

export default CreateTable;
