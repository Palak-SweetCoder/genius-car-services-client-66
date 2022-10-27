import { signOut } from 'firebase/auth';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import axiosPrivate from '../../api/axiosPrivate';
import auth from '../../firebase.init';

const Order = () => {
    const [user] = useAuthState(auth);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    //Don't be afraid :) every time we used fetch and general arrow function to fetch url
    //Here is a little different and its interesting also short code.
    //Here I used an async await function instead of regular arrow function. And use axios instead regular fetch. Here {data} is the response (we will write it as res and then take data by res.data) but its interesting so I use it.
    useEffect(() => {
        const getOrders = async () => {
            const email = user.email;
            const url = `https://immense-retreat-62779.herokuapp.com/order?email=${email}`;
            try {
                const { data } = await axiosPrivate.get(url);
                setOrders(data)
            }
            catch (error) {
                console.log(error.message)
                if (error.response.status === 401 || error.response.status === 403) {
                    signOut(auth);
                    navigate('/login')
                }
            }
        }
        //Mind it... it's a function we declared so we have to call this function otherwise it will not work
        getOrders();
    }, [user, navigate])

    return (
        <div className='container'>
            <h1>Your Total Orders: {orders.length}</h1>
            {
                orders.map(order => <div key={order._id}>
                    <p><small className='text-warning'>{order.email}</small></p>
                    <p>Service Name: {order.service}</p>
                </div>)
            }
        </div>
    );
};

export default Order;