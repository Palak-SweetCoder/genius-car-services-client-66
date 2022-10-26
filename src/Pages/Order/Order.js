import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const Order = () => {
    const [user] = useAuthState(auth);
    const [orders, setOrders] = useState([]);

    //Don't be afraid :) every time we used fetch and general arrow function to fetch url
    //Here is a little different and its interesting also short code.
    //Here I used an async await function instead of regular arrow function. And use axios instead regular fetch. Here {data} is the response (we will write it as res and then take data by res.data) but its interesting so I use it.
    useEffect(() => {
        const getOrders = async () => {
            const email = user.email;
            const url = `http://localhost:5000/order?email=${email}`;
            const { data } = await axios.get(url);
            setOrders(data)
        }
        //Mind it... it's a function we declared so we have to call this function otherwise it will not work
        getOrders();

    }, [user])
    return (
        <div>
            <h1>Your Total Orders: {orders.length}</h1>
        </div>
    );
};

export default Order;