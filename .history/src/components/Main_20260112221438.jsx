import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Main = () => {
    return (
        <div className='max-w-[1300px]  mx-auto'>
            <Navbar></Navbar>
            <div className="min-h-[calc(100vh-422px)]">

            <Outlet></Outlet>
            </div>
            {/* <Footer></Footer> */}
        </div>
    );
};

export default Main;