import React, { useEffect, useState } from 'react';
import Service from '../Service/Service';
import './Serivces.css'

const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('https://immense-retreat-62779.herokuapp.com/service')
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])

    return (
        <div id='services' className='services mt-4 mb-4 container'>
            <h1 className='text-primary text-center'>Our Services</h1>
            <div className='text-center'>
                <hr className="border-primary border-5 opacity-100 mb-3" />
            </div>
            <div className='services-container'>
                {
                    services.map(service => <Service
                        key={service._id}
                        service={service}
                    ></Service>)
                }
            </div>
        </div>
    );
};

export default Services;