import React, { useState} from 'react'; 
import Layout from '../shared/Layout';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';


const TableRes = () => {
    const [values, setValues] = useState({
        numGuests:'',
        date:'',
        time:'',
    });

    const { numGuests, date, time } = values;
    const handleChange = name => e => {
        const value = e.target.value;

        setValues({...values, [name]: value});
    };



    return(
        <Layout>
            <Form className=''>
                <Form.Group className = "mb-3" controlId = "regNumGuests">
                    <Form.Label>Number of Guests</Form.Label>
                    <Form.Control 
                        type="name" 
                        placeholder="Enter Number of Guests" 
                        value={numGuests}
                        onChange={handleChange('NumGuests')}
                    />
                    {numGuests}
                </Form.Group>
                
                <Form.Group className = "mb-3" controlId = "regDate">
                    <Form.Label>Date</Form.Label>
                    <Form.Control 
                        type="date" 
                        placeholder="Enter Reservation Date (MM/DD/YYYY)" 
                        value={date}
                        onChange={handleChange('Date')}
                    />
                    {date}
                </Form.Group>
                
                <Form.Group className = "mb-3" controlId = "regTime">
                    <Form.Label>Time</Form.Label>
                    <Form.Control 
                        type="time" 
                        placeholder="Enter Reservation Time (HH:MM)" 
                        value={time}
                        onChange={handleChange('Time')}
                    />
                    {time}
                </Form.Group>
            </Form>
        </Layout>
    );
};

export default Signup;