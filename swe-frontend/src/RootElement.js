import React from 'react'; 
import App from './App';
import Login from './user/Login';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const RootElement = () => {
    return (
    <BrowserRouter>
        <Routes>
            <Route path='/' exact element={<App/>}/>
            <Route path='/login' exact element={<Login/>}/>
        </Routes>
    </BrowserRouter>
    );
};
export default RootElement;

