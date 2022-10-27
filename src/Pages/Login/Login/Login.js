import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import SocialLogin from '../SocialLogin/SocialLogin';
import './Login.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useToken from '../../hooks/useToken';

const Login = () => {
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const navigate = useNavigate();
    const location = useLocation();

    let from = location.state?.from?.pathname || "/";

    const navigateToRegister = event => {
        navigate('/register')
    }

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    let errorElement;

    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

    // jwt
    const [token] = useToken(user);

    if (token) {
        navigate(from, { replace: true });
    }

    if (loading || sending) {
        return (
            <div className='text-center m-4 p-4'>
                <Loading></Loading>
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        errorElement = <p className='text-danger'>Error: {error?.message}</p>
    }

    const handleSubmit = async event => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        await signInWithEmailAndPassword(email, password);
    }

    const resetPassword = async () => {
        const email = emailRef.current.value;
        if (email) {
            await sendPasswordResetEmail(email);
            toast('Email Sent')
        }
        else {
            toast('Please enter a valid email address')
        }
    }

    return (
        <div className='container w-50 p-4'>
            <h2 className='text-primary text-center mb-2'>Please Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control ref={emailRef} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control ref={passwordRef} type="password" placeholder="Password" />
                </Form.Group>
                {errorElement}
                <Button className='mb-2 d-block mx-auto w-50' variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            <p>New to Genius Car? <span className='text-primary register-toggler' onClick={navigateToRegister}>Please Register.</span></p>
            <p>Forget your password? <span className='text-primary register-toggler' onClick={resetPassword}>Reset password.</span></p>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Login;