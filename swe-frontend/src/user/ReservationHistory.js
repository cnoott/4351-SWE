import React, { useState} from 'react'; 
import Layout from '../shared/Layout';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

const ReservationHistory = () => {
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

    return (
        <Layout>
            <h1> Reservation History </h1>
            <Container>
            <ListGroup>
                <ListGroup.Item
                    
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">Name</div>
                    Cras justo odio
                    </div>
                    
                </ListGroup.Item>
                <ListGroup.Item
                    
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">Phone</div>
                    Cras justo odio
                    </div>
                    
                </ListGroup.Item>
                <ListGroup.Item
                    
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">Email</div>
                    Cras justo odio
                    </div>
                    
                </ListGroup.Item>
                <ListGroup.Item
                    
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">Date</div>
                    Cras justo odio
                    </div>
                    
                </ListGroup.Item>
                <ListGroup.Item
                   
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">Time</div>
                    Cras justo odio
                    </div>
                    
                </ListGroup.Item>
                <ListGroup.Item
                    
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">Number Of Guests</div>
                    Cras justo odio
                    </div>
                    
                </ListGroup.Item>
                <ListGroup.Item
                    
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">Diner Number</div>
                    Cras justo odio
                    </div>
                    
                </ListGroup.Item>
                <ListGroup.Item
                    
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">Total Points </div>
                    Cras justo odio
                    </div>
                   <div className="ms-2 me-auto">
                   <div className="fw-bold">Points Earned</div>
                   Cras justo odio
                   </div>
                </ListGroup.Item>
                <ListGroup.Item
                    
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">Payment Method</div>
                    Cras justo odio
                    </div>
                   
                </ListGroup.Item>
                <ListGroup.Item
                    
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">Subheading</div>
                    Cras justo odio
                    </div>
                    <Badge bg="primary" pill>
                    14
                    </Badge>
                </ListGroup.Item>
                </ListGroup>
            </Container>
        </Layout>
      );
    
}


    export default ReservationHistory;