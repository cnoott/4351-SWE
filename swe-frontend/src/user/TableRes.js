import React, { useState, useEffect } from 'react'; 
import Layout from '../shared/Layout';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../auth';

// TODO: on success redirect to reserved tables page

const API = 'http://localhost:8000/api';

const TableRes = () => {
    const [values, setValues] = useState({
        numGuests:'',
        date:'',
        time:'',
        userId: ''
    });

    const [matchingTables, setMatchingTables] = useState([]);

    const [error, setError] = useState('');


    const { numGuests, date, time } = values;
    const handleChange = name => e => {
        const value = e.target.value;

        setValues({...values, [name]: value});
    };

    const { token, user: { _id } } = isAuthenticated();


    const handleSubmit = e => {
        e.preventDefault();

        fetch(`${API}/check-tables`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(async res => {
                const tables = await res.json();

                if (tables.error) {
                    setError(tables.error);
                    setMatchingTables([]);
                }
                else {
                    console.log(tables.matchingTables);
                    setMatchingTables(tables.matchingTables);
                }
            });
    };

    const navigate = useNavigate();

    const handleChooseReservation = tableId => { 
        console.log(tableId);

        fetch(`${API}/make-reservation/${tableId}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...values, userId: _id })
        })
            .then(async res => {
                const response = res.json();
                if (response.error) {
                    setError(response.error);
                }
                else {
                    //TODO redirect to resreved tables page
                    navigate('/');
                }
            });
    };



    return(
        <Layout>
            { matchingTables.length === 0 ?
                <Form className=''>
                    { error && <Alert variant='danger'> {error} </Alert> }
                    <Form.Group className = "mb-3" controlId = "regNumGuests">
                        <Form.Label>Number of Guests</Form.Label>
                        <Form.Control 
                            type="name" 
                            placeholder="Enter Number of Guests" 
                            value={numGuests}
                            onChange={handleChange('numGuests')}
                        />
                        {numGuests}
                    </Form.Group>

                    <Form.Group className = "mb-3" controlId = "regDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control 
                            type="date" 
                            placeholder="Enter Reservation Date (MM/DD/YYYY)" 
                            value={date}
                            onChange={handleChange('date')}
                        />
                        {date}
                    </Form.Group>

                    <Form.Group className = "mb-3" controlId = "regTime">
                        <Form.Label>Time</Form.Label>
                        <Form.Control 
                            type="time" 
                            placeholder="Enter Reservation Time (HH:MM)" 
                            value={time}
                            onChange={handleChange('time')}
                        />
                        {time}
                    </Form.Group>

                    <Button variant='primary' onClick={handleSubmit}> Reserve</Button>
                </Form>
                :
                <Container>
                    <ListGroup>
                        { matchingTables.map((table, i) => (
                            <ListGroup.Item
                                onClick={() => handleChooseReservation(table._id)}
                            > 
                                Table number: {table.tableNum} : Capacity: {table.capacity}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Container>
            }
        </Layout>
    );
};

export default TableRes;
