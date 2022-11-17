import React, { useState} from 'react'; 
import Layout from '../shared/Layout';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Alert from 'react-bootstrap/Alert';

const GuestReserve = () => {
    const [values, setValues] = useState({
        name:'',
        phone:'',
        email:'',
        date:'',
        time:'',
        numberOfGuests: 0,
    });

    const { name, phone, email, date, time, numberOfGuests } = values;
    const handleChange = name => e => {
        const value = e.target.value;

        setValues({...values, [name]: value});
    };



    return(
        <Layout>
            <Container>
                <Form className=''>
                    <Form.Group className = "mb-3" controlId = "formGroupName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type="name" 
                            placeholder="Enter Name" 
                            value={name}
                            onChange={handleChange('name')}
                        />
                        {name}
                    </Form.Group>
                    <Form.Group className = "mb-3" controlId = "formGroupPhone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control 
                            type="phone" 
                            placeholder="Enter phone" 
                            value={phone}
                            onChange={handleChange('phone')}
                        />
                        {phone}
                    </Form.Group>
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
                    <Form.Group className = "mb-3" controlId = "formGroupDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control 
                            type="date" 
                            placeholder="Enter date" 
                            value={date}
                            onChange={handleChange('date')}
                        />
                        {phone}
                    </Form.Group>
                    <Form.Group className = "mb-3" controlId = "formGroupTime">
                        <Form.Label>Time</Form.Label>
                        <Form.Control 
                            type="time" 
                            placeholder="Enter time" 
                            value={time}
                            onChange={handleChange('time')}
                        />
                        {phone}
                    </Form.Group>
                    <Form.Group className = "mb-3" controlId = "formGroupNumberOfGuests">
                        <Form.Label>numberOfGuests</Form.Label>
                        <Form.Control 
                            type="numberOfGuests" 
                            placeholder="Enter numberOfGuests" 
                            value={numberOfGuests}
                            onChange={handleChange('numberOfGuests')}
                        />
                        {phone}
                    </Form.Group>
                </Form>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Available Tables
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">2</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">4</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">6</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                <Button variant='primary'> Reserve </Button>
            </Container>
        </Layout>
    );
};

export default GuestReserve;