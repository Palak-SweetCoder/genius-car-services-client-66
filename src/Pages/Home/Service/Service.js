import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Service.css'

const Service = ({service}) => {
    const {id, name, img, description, price} = service;
    const navigate = useNavigate();
    const navigateToServiceDetails = id => {
        navigate(`/service/${id}`);
    }

    return (
        <div className='service mt-4 mb-4'>
            <img className='img-fluid mb-2' src={img} alt="" />
            <h2>{name}</h2>
            <p>Price: ${price}</p>
            <p>{description}</p>
            <button onClick={()=>navigateToServiceDetails(id)} className='btn btn-primary'>Book: {name}</button>
        </div>
    );
};

export default Service;