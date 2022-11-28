import React from 'react'; 
import App from './App';
import Login from './user/Login';
import Signup from './user/Signup';
import Home from './Home';
import CreateTable from './admin/CreateTable';
import GuestReserve from './user/GuestReserve';
import TableRes from './user/TableRes';


import { BrowserRouter, Routes, Route } from 'react-router-dom';

const RootElement = () => {
    return (
    <BrowserRouter>
        <Routes>
            <Route path='/' exact element={<Home/>}/>
            <Route path='/login' exact element={<Login/>}/>
            <Route path='/signup' exact element={<Signup/>}/>


            <Route path='/create-table' exact element={<CreateTable/>}/>

            <Route path='/guestReserve' exact element={<GuestReserve/>}/>

            <Route path='/reserve' exact element={<TableRes/>}/>

        </Routes>
    </BrowserRouter>
    );
};
export default RootElement;

