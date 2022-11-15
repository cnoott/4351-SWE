import React, { useState} from 'react'; 
import Layout from '../shared/Layout';
import Form from 'react-bootstrap/Form';

const Signup = () => {
    const [values, setValues] = useState({
        name:'',
        phone:'',
        email:'',
        date:'',
        time:'',
        numberOfTables: 0,
    });

    const { name, phone, email, date, time, numberOfTables } = values;
    const handleChange = name => e => {
        const value = e.target.value;

        setValues({...values, [name]: value});
    };



    return(
        <Layout>
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
                <Form.Group className = "mb-3" controlId = "formGroupNumberOfTables">
                    <Form.Label>numberOfTables</Form.Label>
                    <Form.Control 
                        type="numberOfTables" 
                        placeholder="Enter numberOfTables" 
                        value={numberOfTables}
                        onChange={handleChange('numberOfTables')}
                    />
                    {phone}
                </Form.Group>
            </Form>
        </Layout>
    );
};

export default Signup;