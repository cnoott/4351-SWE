import React from 'react'; 
import App from './App';
import Login from './user/Login';
import Signup from './user/Signup';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const RootElement = () => {
    return (
    <BrowserRouter>
        <Routes>
            <Route path='/' exact element={<App/>}/>
            <Route path='/login' exact element={<Login/>}/>
            <Route path='/signup' exact element={<Signup/>}/>
        </Routes>
    </BrowserRouter>
    );
};
export default RootElement;

