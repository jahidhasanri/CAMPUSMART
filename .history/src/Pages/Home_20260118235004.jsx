import React from 'react';
import Banner from '../components/Banner';
import Categories from '../components/Category';
import HowItWorks from '../components/HowItWorks';
import Posts from '../components/Posts';
import WhyChooseUs from '../components/WhyChooseUs';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Categories></Categories>
            <Posts></Posts>
            <HowItWorks></HowItWorks>
            <WhyChooseUs></WhyChooseUs>
        </div>
    );
};

export default Home;