import React from 'react';
import google from '../../../img/social/google.png';
import facebook from '../../../img/social/facebook.png';
import github from '../../../img/social/github.png';
import auth from '../../../firebase.init';
import { useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';


const SocialLogin = () => {

    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [signInWithGithub, user1, loading1, error1] = useSignInWithGithub(auth);
    const navigate = useNavigate();
    let errorElement;

    if(loading || loading1) {
        return (
            <div className='text-center m-4 p-4'>
                <Loading></Loading>
                <p>Loading...</p>
            </div>
        );
    }

    if (error || error1) {
        errorElement = <p className='text-danger'>Error: {error?.message} {error1?.message}</p>
    }

    if (user || user1) {
        navigate('/home');
    }

    return (
        <div>
            <div className='d-flex align-items-center'>
                <div style={{ height: '1px' }} className='bg-primary w-50'></div>
                <p className='mt-2 mx-2'>or</p>
                <div style={{ height: '1px' }} className='bg-primary w-50'></div>
            </div>
            {errorElement}
            <div className='text-center'>
                <button onClick={() => signInWithGoogle()} className='btn btn-info rounded-pill w-50'><img width={30} className='me-2' src={google} alt="" />Google Sign In</button>
            </div>
            <div className='text-center mt-2'>
                <button className='btn btn-info rounded-pill w-50'><img width={30} className='me-2' src={facebook} alt="" />Facebook Sign In</button>
            </div>
            <div className='text-center mt-2 mb-4'>
                <button onClick={() => signInWithGithub()} className='btn btn-info rounded-pill w-50'><img width={30} className='me-2' src={github} alt="" />Github Sign In</button>
            </div>
        </div>
    );
};

export default SocialLogin;