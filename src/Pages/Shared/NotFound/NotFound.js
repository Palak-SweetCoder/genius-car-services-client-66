import React from 'react';
import sleep from '../../../img/sleep.jpg';

const NotFound = () => {
    return (
        <div>
            <h2 className='text-primary text-center'>Mechanic is sleeping</h2>
            <img className='img-fluid' src={sleep} alt="" />
        </div>
    );
};

export default NotFound;