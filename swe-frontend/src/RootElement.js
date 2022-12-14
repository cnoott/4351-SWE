import React from 'react'; 
import App from './App';
import Login from './user/Login';
import Signup from './user/Signup';
import Home from './Home';
import CreateTable from './admin/CreateTable';
import GuestReserve from './user/GuestReserve';
import TableRes from './user/TableRes';
import UserProfile from './user/UserProfile';
import Checkout from './Checkout';
import ReservationHistory from './user/ReservationHistory';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const RootElement = () => {
    return (
    <BrowserRouter>
        <Routes>
            <Route path='/' exact element={<Home/>}/>
            <Route path='/login' exact element={<Login/>}/>
            <Route path='/signup' exact element={<Signup/>}/>
            <Route path='/user-profile/:userId' exact element={<UserProfile/>}/>
            <Route path='/checkout/:reservationId' exact element={<Checkout/>}/>

            <Route path='/create-table' exact element={<CreateTable/>}/>

            <Route path='/guestReserve' exact element={<GuestReserve/>}/>
            <Route path='/reservationHistory' exact element={<ReservationHistory/>}/>

            <Route path='/reserve' exact element={<TableRes/>}/>

        </Routes>
    </BrowserRouter>
    );
};
export default RootElement;

