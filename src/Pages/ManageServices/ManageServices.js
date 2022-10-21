import React from 'react';
import useServices from '../hooks/useServices';

const ManageServices = () => {
    const [services, setServices] = useServices();
    const handleDelete = id => {
        const proceed = window.confirm('Are you sure you want to delete this user?');
        if(proceed){
            const url =`http://localhost:5000/service/${id}`;
            fetch(url, {
                method: 'DELETE',
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                const remaining = services.filter(s=>s._id !== id);
                setServices(remaining);
            })
        }
    }
    return (
        <div className='w-50 mx-auto'>
            <h1>Manage your services</h1>
            {
                services.map(service => <div key={service._id}>
                    <h3>{service.name} <button onClick={()=> handleDelete(service._id)} className='btn btn-danger '>DELETE</button></h3>
                </div>)
            }
        </div>
    );
};

export default ManageServices;