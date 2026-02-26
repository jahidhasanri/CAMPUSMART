import React from 'react';
import Banner from '../../components/Shared/Banner';
import WhoWeAre from '../../components/WhoWeAre';
import CounterSection from '../../components/CounterSection';

const AboutUs = () => {
    return (
        <div>
            <div className="bg-[#3b5d50]">
            <Banner
                title="ABOUT US"
                subtitle="Your trusted campus marketplace for buying, selling, and connecting — everything students need, all in one place."
            />
            </div>
            <WhoWeAre></WhoWeAre>
            <CounterSection></CounterSection>
        </div>
    );
};

export default AboutUs;