import React, { useState} from 'react'; 
import Layout from '../shared/Layout';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router-dom';
import Holiday from 'date-holidays';
import Alert from 'react-bootstrap/Alert';
import Dropdown from 'react-bootstrap/Dropdown';
var hd = new Holiday('US');

const API = 'http://localhost:8000/api';
const GuestReserve = () => {
    const [values, setValues] = useState({
        name:'',
        phone:'',
        email:'',
        date:'',
        time:'',
        numGuests: 0,
    });

    const { name, phone, email, date, time, numGuests } = values;

    const [matchingTables, setMatchingTables] = useState([]);

    const [error, setError] = useState('');
    const [warning, setWarning] = useState('');
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
                setWarning('Warning, this is a holiday, you must be logged in with a card on file to reserve a table');
            }
            else if (convertedDate.getDay() < 1 || convertedDate.getDay() > 4) {
                setValues({...values, [name]: value, isSpecialDay:true});
                setWarning('Warning, this is a weekend, you must be logged in with a card on file to reserve a table');
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


    const handleSubmit = e => {
        e.preventDefault();

        fetch(`${API}/check-tables`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...values, isGuest: true })
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
            body: JSON.stringify({ ...values, isGuest: true })
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
            <Container>
                <Form className=''>
                    { error && <Alert variant='danger'> {error} </Alert> }
                    { warning && <Alert variant='warning'> {warning} </Alert> }
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
                    </Form.Group>
                    <Form.Group className = "mb-3" controlId = "formGroupDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control 
                            type="date" 
                            placeholder="Enter date" 
                            value={date}
                            onChange={handleChange('date')}
                        />
                    </Form.Group>
                    {/*TIMES*/}
                    <Form.Group  controlId = "TimeOptions">



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
                                <Dropdown.Item eventKey={'12:00'}>12:00PM</Dropdown.Item>
                                <Dropdown.Item eventKey={'12:30'}>12:30PM</Dropdown.Item>
                                <Dropdown.Item eventKey={'13:00'}>1:00PM</Dropdown.Item>
                                <Dropdown.Item eventKey={'13:30'}>1:30PM</Dropdown.Item>
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

                    <Form.Group className = "mb-3" controlId = "formGroupNumberOfGuests">
                        <Form.Label>Number of Guests</Form.Label>
                        <Form.Control 
                            type="numGuests" 
                            placeholder="Enter numGuests" 
                            value={numGuests}
                            onChange={handleChange('numGuests')}
                        />
                    </Form.Group>
                </Form>
                <Button variant='primary' onClick={handleSubmit}> Check Avaliable Tables</Button>
            </Container>
            :
                <Container>
                    <ListGroup>
                        { matchingTables.map((table, i) => (
                            <ListGroup.Item
                                onClick={() => handleChooseReservation(table._id)}
                            > 
                                Table number: {table.tableNum} : Capacity: {table.capacity}
                                { table.combinedWith && (<p> <strong> Combined with: </strong> table {table.combinedWith.tableNum}, capactiy: {table.combinedWith.capacity}</p>)}

                            </ListGroup.Item>

                        ))}
                    </ListGroup>
                </Container>
            }
        </Layout>
    );
};

export default GuestReserve;
