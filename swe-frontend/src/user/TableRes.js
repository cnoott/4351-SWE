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
                    {/*GUESTS*/}
                    <Form.Group id = "numg" className = {"text-center w-50"} controlId = "regNumGuests">
                        <Form.Label>Number of Guests</Form.Label>
                        <Form.Control 
                            className = {"text-center w-50"}
                            type="name" 
                            placeholder="Enter Number of Guests" 
                            value={numGuests}
                            onChange={handleChange('numGuests')}
                        />
                        {numGuests}
                    </Form.Group>
                    {/*DATES*/}
                    <Form.Group className = {"text-center w-50"} controlId = "regDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control 
                            className = {"text-center w-50"}
                            type="date" 
                            placeholder="Enter Reservation Date (MM/DD/YYYY)" 
                            value={date}
                            onChange={handleChange('date')}
                        />
                        {date}
                    </Form.Group>
                    {/*TIMES*/}
                    <Form.Group className = {"text-center w-50"} controlId = "TimeOptions">
                        <Form.Label>Reservation Time</Form.Label>
                        <Dropdown onSelect={handleChange('time')}>
                            <Dropdown.Toggle variant='secondary'>
                                Select Reservation Time
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item eventKey={'10:00AM'}>10:00AM</Dropdown.Item>
                                <Dropdown.Item eventKey={'10:30AM'}>10:30AM</Dropdown.Item>
                                <Dropdown.Item eventKey={'11:00AM'}>11:00AM</Dropdown.Item>
                                <Dropdown.Item eventKey={'11:30AM'}>11:30AM</Dropdown.Item>
                                <Dropdown.Item eventKey={'12:00PM'}>12:00PM</Dropdown.Item>
                                <Dropdown.Item eventKey={'12:30PM'}>12:30PM</Dropdown.Item>
                                <Dropdown.Item eventKey={'1:00PM'}>1:00PM</Dropdown.Item>
                                <Dropdown.Item eventKey={'1:30PM'}>1:30PM</Dropdown.Item>                                <Dropdown.Item eventKey={'1:00PM'}>1:00PM</Dropdown.Item>
                                <Dropdown.Item eventKey={'2:00PM'}>2:00PM</Dropdown.Item>
                                <Dropdown.Item eventKey={'2:30PM'}>2:30PM</Dropdown.Item>
                                <Dropdown.Item eventKey={'3:00PM'}>3:00PM</Dropdown.Item>
                                <Dropdown.Item eventKey={'3:30PM'}>3:30PM</Dropdown.Item>
                                <Dropdown.Item eventKey={'4:00PM'}>4:00PM</Dropdown.Item>
                                <Dropdown.Item eventKey={'4:30PM'}>4:30PM</Dropdown.Item>
                                <Dropdown.Item eventKey={'5:00PM'}>5:00PM</Dropdown.Item>
                                <Dropdown.Item eventKey={'5:30PM'}>5:30PM</Dropdown.Item>
                                <Dropdown.Item eventKey={'6:00PM'}>6:00PM</Dropdown.Item>
                                <Dropdown.Item eventKey={'6:30PM'}>6:30PM</Dropdown.Item>
                                <Dropdown.Item eventKey={'7:00PM'}>7:00PM</Dropdown.Item>
                                <Dropdown.Item eventKey={'7:30PM'}>7:30PM</Dropdown.Item>
                                <Dropdown.Item eventKey={'8:00PM'}>8:00PM</Dropdown.Item>
                                <Dropdown.Item eventKey={'8:30PM'}>8:30PM</Dropdown.Item>
                                <Dropdown.Item eventKey={'9:00PM'}>9:00PM</Dropdown.Item>
                                <Dropdown.Item eventKey={'9:30PM'}>9:30PM</Dropdown.Item>


                            </Dropdown.Menu>
                            <p> Selected Time: <strong>{time}</strong> </p>
                        </Dropdown>
                    </Form.Group>

                    <Button variant='primary' className = {"text-center w-25"} onClick={handleSubmit}> Reserve</Button>
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

