import React from 'react';
import './Footer.css'

const Footer = () => {
    return (
        <footer className='text-center bg-primary text-white p-4'>
            <p>Copyright by &copy; genius car {(new Date().getFullYear())}.</p>
            <br />
        </footer>
    );
};

export default Footer;