import React, { useState, useEffect} from 'react'; 
import Layout from '../shared/Layout';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import { isAuthenticated } from '../auth';

const API = 'http://localhost:8000/api';

const ReservationHistory = () => {

    const { user: {_id } } = isAuthenticated(); 
    const [reservations, setReservations] = useState([]);


    useEffect(() => {
        fetch(`${API}/get-reservations/${_id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(async res => {
                const reservationData = await res.json();
                console.log(reservationData.reservationData);
                setReservations(reservationData.reservationData);
            });
    },[]);

    return (
        <Layout>
            <h1> Reservation History </h1>
            <Container>
                <ListGroup>
                    {reservations.length !== 0 && reservations.map((reservation, i) => (
                    <ListGroup.Item key={i}

                        className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold"><strong> Date and Time </strong>{reservation.dateTime}</div>
                            <strong> Number of guests: </strong>{reservation.numGuests}
                        </div>

                    </ListGroup.Item>

                    ))}
                </ListGroup>
            </Container>
        </Layout>
    );

}


export default ReservationHistory;
