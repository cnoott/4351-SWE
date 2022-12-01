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
import Holiday from 'date-holidays';
var hd = new Holiday('US');

// TODO: on success redirect to reserved tables page

const API = 'http://localhost:8000/api';

const TableRes = () => {
    const [values, setValues] = useState({
        numGuests:'',
        date:'',
        time:'',
        userId: '',
        isSpecialDay: false
    });

    const [matchingTables, setMatchingTables] = useState([]);

    const [error, setError] = useState('');
    const [warning, setWarning] = useState('');


    const { numGuests, date, time } = values;
    const handleTimeChange = value => {
        console.log(value);
        setValues({...values, time: value});
    };

    const handleChange = name => e => {
        const value = e.target.value;
        if (name === 'date') {
            var convertedDate = new Date(value);
            if(hd.isHoliday(convertedDate)) {
                setValues({ ...values, [name]: value, isSpecialDay: true });
                console.log('HOLDIAY');
                setWarning('Warning, this is a holiday, make sure you have a card on file');
            }
            else if (convertedDate.getDay() < 1 || convertedDate.getDay() > 4) {
                setWarning('Warning, this is a weekend, make sure you have a card on file');
            }
            else {
                setValues({...values, [name]: value, isSpecialDay:false});
                setWarning('');
            }
        }
        else {
            setValues({...values, [name]: value});
        }
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
            body: JSON.stringify({...values, userId: _id })
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
                    navigate('/reservationHistory');
                }
            });
    };



    return(
        <Layout>
            { matchingTables.length === 0 ?
                <Form className=''>
                    { error && <Alert variant='danger'> {error} </Alert> }
                    { warning && <Alert variant='warning'> {warning} </Alert> }
                    {/*GUESTS*/}
                    <Form.Group id = "numg" className = {"mb-3"} controlId = "regNumGuests">
                        <Form.Label>Number of Guests</Form.Label>
                        <Form.Control 
                            className = {"mb-3"}
                            type="name" 
                            placeholder="Enter Number of Guests" 
                            value={numGuests}
                            onChange={handleChange('numGuests')}
                        />
                        {numGuests}
                    </Form.Group>
                    {/*DATES*/}
                    <Form.Group className = {"mb-3"} controlId = "regDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control 
                            className = {"mb-3"}
                            type="date" 
                            placeholder="Enter Reservation Date (MM/DD/YYYY)" 
                            value={date}
                            onChange={handleChange('date')}
                        />
                        {date}
                    </Form.Group>
                    {/*TIMES*/}
                    <Form.Group className = {"mb-3"} controlId = "TimeOptions">



                        <Form.Label>Reservation Time</Form.Label>
                        <Dropdown onSelect={handleTimeChange}>
                            <Dropdown.Toggle variant='secondary'>
                                Select Reservation Time
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item eventKey={'10:00'}>10:00AM</Dropdown.Item>
                                <Dropdown.Item eventKey={'10:30'}>10:30AM</Dropdown.Item>
                                <Dropdown.Item eventKey={'11:00'}>11:00AM</Dropdown.Item>
                                <Dropdown.Item eventKey={'11:30'}>11:30AM</Dropdown.Item>
                                <Dropdown.Item eventKey={'12:00 '}>12:00PM</Dropdown.Item>
                                <Dropdown.Item eventKey={'12:30'}>12:30PM</Dropdown.Item>
                                <Dropdown.Item eventKey={'13:00'}>1:00PM</Dropdown.Item>

                                <Dropdown.Item eventKey={'13:30'}>1:30PM</Dropdown.Item>                                <Dropdown.Item eventKey={'1:00 PM'}>1:00PM</Dropdown.Item>
                                <Dropdown.Item eventKey={'14:00'}>2:00PM</Dropdown.Item>
                                <Dropdown.Item eventKey={'14:30'}>2:30PM</Dropdown.Item>
                                <Dropdown.Item eventKey={'15:00'}>3:00PM</Dropdown.Item>
                                <Dropdown.Item eventKey={'15:30'}>3:30PM</Dropdown.Item>
                                <Dropdown.Item eventKey={'16:00'}>4:00PM</Dropdown.Item>
                                <Dropdown.Item eventKey={'16:30'}>4:30PM</Dropdown.Item>
                                <Dropdown.Item eventKey={'17:00'}>5:00PM</Dropdown.Item>
                                <Dropdown.Item eventKey={'17:30'}>5:30PM</Dropdown.Item>
                                <Dropdown.Item eventKey={'18:00'}>6:00PM</Dropdown.Item>
                                <Dropdown.Item eventKey={'18:30'}>6:30PM</Dropdown.Item>
                                <Dropdown.Item eventKey={'19:00'}>7:00PM</Dropdown.Item>
                                <Dropdown.Item eventKey={'19:30'}>7:30PM</Dropdown.Item>
                                <Dropdown.Item eventKey={'20:00'}>8:00PM</Dropdown.Item>
                                <Dropdown.Item eventKey={'20:30'}>8:30PM</Dropdown.Item>
                                <Dropdown.Item eventKey={'21:00'}>9:00PM</Dropdown.Item>
                                <Dropdown.Item eventKey={'21:30'}>9:30PM</Dropdown.Item>


                            </Dropdown.Menu>
                            <p> Selected Time: <strong>{time}</strong> </p>
                        </Dropdown>
                    </Form.Group>

                    <Button variant='primary' className = {"mb-3"} onClick={handleSubmit}> Reserve</Button>
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

