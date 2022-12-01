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
                    <Form.Group className = "mb-3" controlId = "formGroupTime">
                        <Form.Label>Time</Form.Label>
                        <Form.Control 
                            type="time" 
                            placeholder="Enter time" 
                            value={time}
                            onChange={handleChange('time')}
                        />
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
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Container>
            }
        </Layout>
    );
};

export default GuestReserve;
