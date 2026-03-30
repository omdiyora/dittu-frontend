"use client";
import { useInView } from 'react-intersection-observer';
import AnimatedCounter from './AnimatedCounter';
import Link from "next/link";
import { FiFacebook, FiMapPin } from "react-icons/fi";
import { SiInstagram } from "react-icons/si";
import { BsTelephone } from "react-icons/bs";
import { VscMail } from "react-icons/vsc";
import { LuClock4 } from "react-icons/lu";
import { IoStar, IoStarOutline } from "react-icons/io5";
// import LeadershipTeamSection from '@/modules/Home/screens/LeadershipTeamSection/LeadershipTeamSection';
import SectionHeading from '@/components/SectionHeading';


const About = () => {
    const { ref: heroRef, inView: heroInView } = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    return (
        <>
            <section className="bg-[#faf6f2] py-24">
                <div className="max-w-5xl mx-auto px-4 text-center mt-16">
                    {/* Title */}
                    <h1 className="font-nunito text-4xl md:text-5xl font-semibold text-[#54221c] mb-6">
                        About Us
                    </h1>
                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-black max-w-3xl mx-auto leading-relaxed">
                        Dedicated to guiding you with transparent, reliable, and personalized financial solutions.
                    </p>
                </div>
            </section>

            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                        {/* LEFT CONTENT */}
                        <div className="max-w-xl">
                            <h2 className="text-4xl font-semibold text-[#54221c] mb-6">
                                Our Mission
                            </h2>

                            <p className="text-secondary-dark mb-6 leading-relaxed">
                                Our mission is to simplify and transform the loan acquisition journey for our clients by making it clear, accessible, and stress-free. We understand that securing a loan can often feel overwhelming due to complex procedures, unfamiliar terminology, and numerous financial options. Our goal is to remove this uncertainty by guiding our clients through every step of the process with clarity, confidence, and transparency.
                            </p>
                        </div>

                        {/* RIGHT IMAGE */}
                        <div className="flex justify-end items-center pr-10">
                            <img
                                src="/assets/images/mission.png"
                                alt="Diyora Consultancy Mission"
                                className="w-[420px] h-auto"
                            />
                        </div>

                    </div>
                </div>
            </section>
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                        {/* LEFT CONTENT */}
                        <div className="flex justify-end items-center pr-10">
                            <img
                                src="/assets/images/vision.png"
                                alt="Diyora Consultancy Mission"
                                className="w-[420px] h-auto"
                            />
                        </div>

                        {/* RIGHT IMAGE */}
                        <div className="max-w-xl">
                            <h2 className="text-4xl font-semibold text-[#54221c] mb-6">
                                Our Vision
                            </h2>

                            <p className="text-secondary-dark mb-6 leading-relaxed">
                                Our vision is to become the most trusted and respected loan consultancy firm, recognized for our unwavering integrity, deep expertise, and genuine commitment to the success of every client we serve. We aspire to set new standards in the financial consulting industry by building a reputation rooted in honesty, transparency, and consistent value delivery. Trust is the foundation of all meaningful financial relationships, and our ultimate goal is to earn and maintain that trust through ethical practices and client-first decision-making.
                            </p>
                        </div>


                    </div>
                </div>
            </section>


            <section className="py-20 text-black bg-white">
                <div className="container mx-auto px-4">
                    <SectionHeading
                        title="Milestones That Define Our Success"
                        subtitle="Years of expertise, thousands of clients, and strong partnerships built on results."
                    // isDark={true}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <AnimatedCounter end={15} suffix="+" title="Years Experience" />
                        <AnimatedCounter end={8500} suffix="+" title="Happy Clients" />
                        <AnimatedCounter end={40} suffix="+" title="Partnered Banks" />
                        <AnimatedCounter end={12500} suffix="+" title="Loans Processed" />
                    </div>
                </div>
            </section>

            {/* <LeadershipTeamSection /> */}


            {/* <footer className="bg-[#3b1a16] text-white"> */}
            <footer className="bg-[#4a1f19] text-white border-t border-white/10">
                <div className="container mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        <div>
                            <div className="flex items-center mb-4">
                                {/* <Briefcase className="mr-2" size={24} /> */}
                                <span className="font-nunito text-2xl font-semibold">Diyora Consultancy</span>
                            </div>
                            <p className="text-secondary-dark mb-6">
                                Providing expert consultation for all your loan needs. We connect you with the best financial solutions tailored to your requirements.
                            </p>
                            <div className="flex space-x-4">
                                <a href="https://www.facebook.com/nodiyora/" className="text-white hover:text-accent-light transition-colors" aria-label="Facebook">
                                    <FiFacebook size={20} />
                                </a>
                                <a href="#" className="text-white hover:text-accent-light transition-colors" aria-label="Instagram">
                                    <SiInstagram size={20} />
                                </a>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-nunito text-xl font-semibold mb-6">Quick Links</h3>
                            <ul className="space-y-3">
                                {['Home', 'Services', 'Reviews', 'About', 'Contact'].map((item) => (
                                    <li key={item}>
                                        <Link
                                            href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                            className="text-white hover:text-white/80 transition-colors"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-nunito text-xl font-semibold mb-6 ">Our Services</h3>
                            <ul className="space-y-3">
                                <li><a href="/services" className="text-white hover:text-white/80 transition-colors">Education Loan</a></li>
                                <li><a href="/services" className="text-white hover:text-white/80 transition-colors">Mortgage Loan</a></li>
                                <li><a href="/services" className="text-white hover:text-white/80 transition-colors">Home Loan</a></li>
                                <li><a href="/services" className="text-white hover:text-white/80 transition-colors">Business Loan</a></li>
                                <li><a href="/services" className="text-white hover:text-white/80 transition-colors">Loan Refinancing</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-nunito text-xl font-semibold mb-6">Contact Info</h3>
                            <ul className="space-y-4">
                                <li className="flex items-star cursor-pointert">
                                    <FiMapPin className="mr-3 mt-1 text-accent-light" size={60} />
                                    <span className="text-white hover:text-white/80 transition-colors cursor-pointer">112, Anupam Arcade BRTS Canal Road, Parvat Patiya, Opp Amazia Amusment Park, Surat, Gujarat 395010, India</span>
                                </li>
                                <li className="flex items-center cursor-pointer">
                                    <BsTelephone className="mr-3 text-accent-light" size={18} />
                                    <a href="tel:+11234567890" className="text-white hover:text-white/80 transition-colors">+91 - 95744 93000</a>
                                </li>
                                <li className="flex items-center cursor-pointer">
                                    <VscMail className="mr-3 text-accent-light" size={18} />
                                    <a href="mailto:info@diyoraconsultancy.com" className="text-white hover:text-white/80 transition-colors">diyoraconsultancy@gmail.com</a>
                                </li>
                                <li className="flex items-start cursor-pointer">
                                    <LuClock4 className="mr-3 mt-1 text-accent-light" size={18} />
                                    <span className="text-white hover:text-white/80 transition-colors">Mon - Fri: 9:00 AM - 6:00 PM<br />Sat: 10:00 AM - 2:00 PM</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="cursor-pointer border-t border-secondary-dark/30 mt-12 pt-8 text-center text-white hover:text-white/80 transition-colors">
                        <p>&copy; {new Date().getFullYear()} Diyora Consultancy. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    );
};

// Testimonial Preview Component (used only in Home page)
const TestimonialPreview = ({ name, testimonial, rating }: { name: string; testimonial: string; rating: number }) => {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    return (
        <div
            ref={ref}
            className={`
    bg-white rounded-lg p-6
    shadow-lg hover:shadow-xl
    transform transition-all duration-500 ease-out
    ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
  `}
        >

            <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                    <span key={i}>
                        {i < rating ? (
                            <IoStar className="text-yellow-400" />
                        ) : (
                            <IoStarOutline className="text-gray-300" />
                        )}
                    </span>
                ))}
            </div>
            <p className="text-gray-600 mb-4 italic">"{testimonial}"</p>
            <p className="font-medium text-[#54221c]">{name}</p>
        </div>
    );
};


export default About;