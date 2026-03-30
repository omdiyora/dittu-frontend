"use client";

import { useInView } from 'react-intersection-observer';
import HeroSection from './HeroSection';
import FeaturedProducts from './FeaturedProducts';
import MarqueeSection from './MarqueeSection';
import BannerSection from './BannerSection';
import HandpickedSection from './HandpickedSection';
import CollectionsSection from './CollectionsSection';
import LuxurySection from './LuxurySection';
import PressSection from './PressSection';
import BeforeAfterSection from './BeforeAfterSection';
import EleganceSection from './EleganceSection';
import SaleSection from './SaleSection';
import FAQSection from './FAQSection';
import InstagramSection from './InstagramSection';
import NewsletterSection from './NewsletterSection';

const Home = () => {
    const { ref: heroRef, inView: heroInView } = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    return (
        <>
            <HeroSection />
            <FeaturedProducts />
            <MarqueeSection />
            <BannerSection />
            <HandpickedSection />
            <CollectionsSection />
            <LuxurySection />
            <PressSection />
            <BeforeAfterSection />
            <hr className='container mx-auto px-6 md:px-8 lg:px-10 mt-4' />
            <EleganceSection />
            <SaleSection />
            {/* <BundleSection /> */}
            {/* <TestimonialsSection /> */}
            <FAQSection />
            <InstagramSection />
            <NewsletterSection />
        </>
    );
};

export default Home;