import React from 'react';
import { useParams } from 'react-router-dom';
import useServiceDetail from '../../hooks/useServiceDetail';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import axios from 'axios';
import { toast } from 'react-toastify';

const Checkout = () => {
    const { serviceId } = useParams();
    const [service] = useServiceDetail(serviceId);
    const [user] = useAuthState(auth);
    // console.log(user)

    // // this state declared to set default value of the usr
    // const [user, setUser] = useState({
    //     name: 'akbar the great',
    //     email: 'akbar@momo.taj',
    //     address: 'tajmohol road',
    //     phone: '01234567899'
    // });

    // //this function for edit the default value and set the new value to the state
    // const handleAddressChange = e => {
    //     console.log(e.target.value);
    //     const { address, ...rest } = user;
    //     const newAddress = e.target.value;
    //     const newUser = { address: newAddress, ...rest };
    //     console.log(newUser);
    //     setUser(newUser)
    // }

    //function to place order
    const handlePlaceOrder = e => {
        e.preventDefault();
        const order = {
            serviceId: serviceId,
            name: user.displayName,
            email: user.email,
            service: service.name,
            address: e.target.address.value,
            phone: e.target.number.value
        }
        //nothing critical
        //just used axios instead of fetch
        axios.post('https://immense-retreat-62779.herokuapp.com/order', order)
            .then(res => {
                const { data } = res;
                if (data.insertedId) {
                    toast('Your order is booked!!!');
                    e.target.reset()
                }
            })
    }

    return (
        <div className='w-50 mx-auto p-4 text-center'>
            <h2>Please order: {service.name}</h2>
            <p>ORDER ID: <small className='text-warning'>{serviceId}</small></p>
            <form onSubmit={handlePlaceOrder}>
                <input className='w-50 mb-2' type="text" name="name" defaultValue={user.displayName} id="name" placeholder='Your Name' required readOnly disabled />
                <br />
                <input className='w-50 mb-2' type="email" name="email" defaultValue={user.email} id="email" placeholder='Your Email' required readOnly disabled />
                <br />
                <input className='w-50 mb-2' type="text" name="service" defaultValue={service.name} id="service" placeholder='Your Service' />
                <br />
                <input className='w-50 mb-2' type="text" name="address" id="address" placeholder='Your Address' autoComplete='off' required />
                <br />
                <input className='w-50 mb-2' type="number" name="number" id="number" placeholder='Your Phone' required />
                <br />
                <input className='btn btn-primary' type="submit" value="Place Order" />
            </form>
        </div>
    );
};

export default Checkout;