import React, { useState, useEffect } from 'react';
import Layout from './shared/Layout';
import { useParams } from 'react-router-dom';

const Checkout = () => {
    const { reservationId } = useParams();

    const [values, setValues] = useState({
        total: '',

    });

    return(
        <Layout>
            <h1> Checkout </h1>
        </Layout>
    );
};

export default Checkout;
