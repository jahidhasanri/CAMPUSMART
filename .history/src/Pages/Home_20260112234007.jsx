import React from 'react';
import Banner from '../components/Banner';
import Categories from '../components/Category';
import HowItWorks from '../components/HowItWorks';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Categories></Categories>
            <HowItWorks></HowItWorks>
        </div>
    );
};

export default Home;