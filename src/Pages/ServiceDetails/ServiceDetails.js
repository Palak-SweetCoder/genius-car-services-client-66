import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useServiceDetail from '../hooks/useServiceDetail';

const ServiceDetails = () => {
    const { serviceId } = useParams();
    const [service] = useServiceDetail(serviceId);

    return (
        <div>
            <h2>You're booking this service: {service.name}</h2>
            <div className="text-center p-4">
                <Link to={`/checkout/${serviceId}`}>
                    <button className='btn btn-primary'>Proceed checkout</button>
                </Link>
            </div>
        </div>
    );
};

export default ServiceDetails;