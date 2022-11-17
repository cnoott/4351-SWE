import React from 'react'; 
import App from './App';
import Login from './user/Login';
import Signup from './user/Signup';
import GuestReserve from './user/GuestReserve';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const RootElement = () => {
    return (
    <BrowserRouter>
        <Routes>
            <Route path='/' exact element={<Login/>}/>
            <Route path='/signup' exact element={<Signup/>}/>
            <Route path='/guestReserve' exact element={<GuestReserve/>}/>
        </Routes>
    </BrowserRouter>
    );
};
export default RootElement;

