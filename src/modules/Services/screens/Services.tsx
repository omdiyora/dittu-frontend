"use client";

import { useInView } from 'react-intersection-observer';
import SectionHeading from '@/components/SectionHeading';
import { IoStar, IoStarOutline } from "react-icons/io5";
import ServicesSection from './ServicesSection';
// import Footer from '@/modules/Home/screens/Footer/Footer';


const Services = () => {
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
                        Our Service
                    </h1>
                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-black max-w-3xl mx-auto leading-relaxed">
                        A clear, seamless, and transparent journey to securing the right loan for you.
                    </p>
                </div>
            </section>
            <div className='bg-gray-50'>
                <ServicesSection />
            </div>
            <section className="max-w-7xl mx-auto px-6 py-20">
                {/* Heading */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <SectionHeading
                        title="Our Consultation Process"
                        subtitle="A clear, seamless, and transparent journey to securing the right loan for you."
                    />
                </div>

                {/* Timeline Wrapper */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-1/2 top-0 h-full w-1 bg-[#54221c]/20 -translate-x-1/2 hidden lg:block" />

                    {/* Step 1 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
                        <div className="lg:text-right lg:pr-16">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#54221c] text-white text-xl font-bold mb-4">
                                1
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-[#54221c]">
                                Initial Consultation
                            </h3>
                            <p className="text-black">
                                We start with an in-depth discussion to understand your financial goals,
                                requirements, and current situation, allowing us to tailor the best possible solution for you.
                            </p>
                        </div>
                        <div />
                    </div>

                    {/* Step 2 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
                        <div />
                        <div className="lg:pl-16">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#54221c] text-white text-xl font-bold mb-4">
                                2
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-[#54221c]">
                                Loan Options Evaluation
                            </h3>
                            <p className="text-black">
                                Our experts carefully review and compare loan products from multiple lenders
                                to identify the most suitable options based on your needs and eligibility.
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
                        <div className="lg:text-right lg:pr-16">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#54221c] text-white text-xl font-bold mb-4">
                                3
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-[#54221c]">
                                Documentation Support
                            </h3>
                            <p className="text-black">
                                We provide step-by-step guidance on documentation, helping you prepare,
                                verify, and organize all required paperwork for a smooth application process.
                            </p>
                        </div>
                        <div />
                    </div>

                    {/* Step 4 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
                        <div />
                        <div className="lg:pl-16">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#54221c] text-white text-xl font-bold mb-4">
                                4
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-[#54221c]">
                                Application &amp; Submission
                            </h3>
                            <p className="text-black">
                                Our team assists you in accurately completing and submitting your loan
                                application, while coordinating with financial institutions for timely follow-ups.
                            </p>
                        </div>
                    </div>

                    {/* Step 5 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div className="lg:text-right lg:pr-16">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#54221c] text-white text-xl font-bold mb-4">
                                5
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-[#54221c]">
                                Approval &amp; Disbursement
                            </h3>
                            <p className="text-black">
                                We work closely with lenders to fast-track approvals and ensure prompt
                                disbursement of your loan amount—keeping you informed at every stage.
                            </p>
                        </div>
                        <div />
                    </div>
                </div>
            </section>


            {/* <Footer /> */}
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


export default Services;