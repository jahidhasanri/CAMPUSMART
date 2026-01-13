import React from 'react';
import Banner from '../components/Banner';
import Categories from '../components/Category';
import HowItWorks from '../components/HowItWorks';
import Posts from '../components/Posts';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Categories></Categories>
            <HowItWorks></HowItWorks>
            <Posts></Posts>
        </div>
    );
};

export default Home;