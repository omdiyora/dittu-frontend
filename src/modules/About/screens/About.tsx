"use client";

import Image from "next/image";


const features = [
    {
        title: "Natural and organic Ingredients",
        description:
            "From nourishing botanical extracts to nutrient-rich plant oils, each ingredient is carefully chosen for its effectiveness and purity.",
        image:
            "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200&auto=format&fit=crop",
    },
    {
        title: "Eco-friendly packaging",
        description:
            "We are committed to minimizing our environmental footprint, which is why our packages are recyclable and biodegradable.",
        image:
            "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=1200&auto=format&fit=crop",
    },
    {
        title: "Cruelty-free and vegan formulas",
        description:
            "None of our products or ingredients are tested on animals, and they contain absolutely no animal-derived ingredients whatsoever.",
        image:
            "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
    },
];



const About = () => {
    return (
        <>
            <section className="relative w-full h-[500px] sm:h-[650px] lg:h-[780px] overflow-hidden">

                {/* Background Image */}
                <Image
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop"
                    alt="Nature Background"
                    fill
                    priority
                    className="object-cover"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40"></div>

                {/* Content */}
                <div className="absolute inset-0 flex items-center justify-center px-6">
                    <div className="text-center max-w-4xl">

                        <p className="uppercase tracking-[4px] text-white text-xs sm:text-sm mb-6">
                            Our Story
                        </p>

                        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight font-light">
                            We empower your
                            <br />
                            skin to thrive with the
                            <br />

                            <span className="italic font-serif">
                                goodness of nature.
                            </span>
                        </h1>

                    </div>
                </div>
            </section>

            <section className="bg-[#f5f4f1] py-14 md:py-20">
                <div className="max-w-7xl mx-auto px-5 md:px-8">

                    {/* Heading */}
                    <div className="max-w-4xl mx-auto text-center mb-14">
                        <h2 className="text-3xl sm:text-4xl lg:text-4xl font-medium text-black leading-tight">
                            Revitalize And Rejuvenate Your Skin Naturally
                        </h2>

                        <p className="mt-6 text-gray-700 text-sm sm:text-base leading-8">
                            Embracing the philosophy that nature knows best, our skincare
                            brand takes pride in treating your skin with the purest,
                            most natural ingredients available. We believe that the earth
                            provides everything we need to achieve healthy, radiant skin.
                        </p>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                        {features.map((item, index) => (
                            <div key={index}>

                                {/* Image */}
                                <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[430px] overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover hover:scale-105 transition duration-500"
                                    />
                                </div>

                                {/* Content */}
                                <div className="pt-6">
                                    <h3 className="text-2xl font-medium text-black mb-4 leading-snug">
                                        {item.title}
                                    </h3>

                                    <p className="text-gray-700 leading-8 text-sm sm:text-base">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
            {/* Our Vision */}
            <section className="bg-[#f5f4f1] py-12 md:pt-20">
                <div className="max-w-7xl mx-auto px-5 md:px-8">

                    {/* Heading */}
                    <div className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-medium text-black">
                            Our Vision
                        </h2>

                        <div className="w-20 h-[1px] bg-black mt-2"></div>
                    </div>

                    {/* Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden">

                        {/* Left Image */}
                        <div className="relative w-full h-[320px] sm:h-[450px] lg:h-[520px]">
                            <Image
                                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1600&auto=format&fit=crop"
                                alt="Our Vision"
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>

                        {/* Right Content */}
                        <div className="bg-[#e9e3d8] flex items-center">
                            <div className="px-6 py-10 sm:px-10 md:px-14 lg:px-16">
                                <p className="uppercase tracking-[3px] text-xs md:text-sm text-black mb-5">
                                    Our Vision
                                </p>

                                <h3 className="text-3xl sm:text-4xl lg:text-5xl leading-tight font-medium text-black mb-6">
                                    Harmonize between
                                    <br />
                                    nature and beauty
                                </h3>

                                <p className="text-gray-700 leading-8 text-sm sm:text-base max-w-xl">
                                    We strive to harness the power of nature to create skincare
                                    solutions that are both effective and environmentally friendly.
                                    We believe that beauty should not come at the expense of the
                                    planet, and we're committed to proving that natural skincare can
                                    deliver exceptional results.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Mission */}

            <section className="bg-[#f5f4f1] py-12 md:pt-20">
                <div className="max-w-7xl mx-auto px-5 md:px-8">

                    {/* Heading */}
                    <div className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-medium text-black">
                            Our Mission
                        </h2>

                        <div className="w-20 h-[1px] bg-black mt-2"></div>
                    </div>

                    {/* Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden">

                        {/* Left Text */}
                        <div className="bg-[#e9e3d8] flex items-center order-2 lg:order-1">
                            <div className="px-6 py-10 sm:px-10 md:px-14 lg:px-16">
                                <p className="uppercase tracking-[3px] text-xs md:text-sm text-black mb-5">
                                    Our Mission
                                </p>

                                <h3 className="text-3xl sm:text-4xl lg:text-5xl leading-tight font-medium text-black mb-6">
                                    Quality and
                                    <br />
                                    Sustainability
                                </h3>

                                <p className="text-gray-700 leading-8 text-sm sm:text-base max-w-xl">
                                    We are committed to delivering high-quality products while promoting sustainability, transparency, and innovation. Our goal is to create a positive impact on our customers, communities, and the environment.
                                </p>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="relative w-full h-[320px] sm:h-[450px] lg:h-[520px] order-1 lg:order-2">
                            <Image
                                src="https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1600&auto=format&fit=crop"
                                alt="Our Vision"
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>

                    </div>
                </div>
            </section>

            {/* Our Sciences */}
            <section className="bg-[#f5f4f1] py-12 md:pt-20">
                <div className="max-w-7xl mx-auto px-5 md:px-8">

                    {/* Heading */}
                    <div className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-medium text-black">
                            Our Sciences
                        </h2>

                        <div className="w-20 h-[1px] bg-black mt-2"></div>
                    </div>

                    {/* Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden">

                        {/* Left Image */}
                        <div className="relative w-full h-[320px] sm:h-[450px] lg:h-[520px]">
                            <Image
                                src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1600&auto=format&fit=crop"
                                alt="Our Vision"
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>

                        {/* Right Content */}
                        <div className="bg-[#e9e3d8] flex items-center">
                            <div className="px-6 py-10 sm:px-10 md:px-14 lg:px-16">
                                <p className="uppercase tracking-[3px] text-xs md:text-sm text-black mb-5">
                                    Our Sciences
                                </p>

                                <h3 className="text-3xl sm:text-4xl lg:text-5xl leading-tight font-medium text-black mb-6">
                                    Science and
                                    <br />
                                    Innovation
                                </h3>

                                <p className="text-gray-700 leading-8 text-sm sm:text-base max-w-xl">
                                    We leverage cutting-edge research and innovation to develop solutions that drive progress and sustainability. Our commitment to science ensures high-quality, effective, and environmentally responsible products.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;