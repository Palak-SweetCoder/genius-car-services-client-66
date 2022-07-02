import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import './Register.css';
import SocialLogin from '../SocialLogin/SocialLogin';
import Loading from '../../Shared/Loading/Loading';

const Register = () => {

    const [agree, setAgree] = useState(false);

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

    const [updateProfile, updating] = useUpdateProfile(auth);

    const navigate = useNavigate();

    const navigateLogin = () => {
        navigate('/login');
    }

    if (user) {
        return (
            <div className='text-center p-4'>
                <h2 className='text-success'>Congratulation!!!</h2>
                <h2 className='text-success'>You're successfuly registered.</h2>
                <Link to="/home" className='text-dange text-decoration-none' onClick={navigateLogin}>----Go to home page----</Link>
            </div>
        );
    }

    if (loading || updating) {
        return (
            <div className='text-center m-4 p-4'>
                <Loading></Loading>
                <p>Loading...</p>
            </div>
        );
    }

    const handleRegister = async (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        // const agree = event.target.terms.checked;

        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName: name });
        alert('Updated profile');
    }

    return (
        <div className='register-form'>
            <h2 style={{ textAlign: 'center' }}>Please Register</h2>
            <form onSubmit={handleRegister}>
                <input className='reg-input' type="text" name="name" id="username" placeholder='Your Name' />

                <input className='reg-input' type="email" name="email" id="useremail" placeholder='Email Address' required />

                <input className='reg-input' type="password" name="password" id="userpassword" placeholder='Password' required />
                <input onClick={() => setAgree(!agree)} className='me-2' type="checkbox" name="terms" id="terms" />
                <label className={agree ? 'text-primary' : 'text-danger'} htmlFor="terms">Accept our terms and conditions.</label>
                <input disabled={!agree} className='btn btn-primary w-50 mx-auto mt-2' type="submit" value="Register" />
            </form>
            <p>Already have an account? <Link to="/login" className='text-primary pe-auto text-decoration-none' onClick={navigateLogin}>Please Login.</Link> </p>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;