"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Mail } from "lucide-react";
const Contact = () => {
    return (
        <>
            <section className="relative w-full h-[500px] sm:h-[650px] lg:h-[780px] overflow-hidden">

                {/* Background Image */}
                <Image
                    src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2000&auto=format&fit=crop"
                    alt="Contact Us"
                    fill
                    priority
                    className="object-cover"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/50"></div>

                {/* Content */}
                <div className="absolute inset-0 flex items-center justify-center px-6">
                    <div className="text-center max-w-4xl">

                        {/* Small Title */}
                        <p className="uppercase tracking-[4px] text-white text-xs sm:text-sm mb-6">
                            Contact Us
                        </p>

                        {/* Main Heading */}
                        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight font-light">
                            Let’s connect and
                            <br />
                            create something
                            <br />

                            <span className="italic font-serif">
                                beautiful together.
                            </span>
                        </h1>

                    </div>
                </div>
            </section>
            <section className="bg-[#f5f4f1] py-12 md:py-20">
                <div className="max-w-7xl mx-auto px-5 md:px-8">

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden">

                        {/* Left Image */}
                        <div className="relative w-full h-[350px] sm:h-[500px] lg:h-[560px]">
                            <Image
                                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop"
                                alt="Boutique"
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>

                        {/* Right Content */}
                        <div className="bg-[#e9e3d8] flex items-center">
                            <div className="px-6 py-10 sm:px-10 md:px-14 lg:px-20">

                                {/* City */}
                                <p className="uppercase tracking-[3px] text-xs sm:text-sm text-black mb-6">
                                    Mumbai
                                </p>

                                {/* Title */}
                                <h2 className="text-4xl sm:text-4xl lg:text-5xl leading-tight font-medium text-black mb-8">
                                    DITTU
                                </h2>

                                {/* Address */}
                                <div className="space-y-5 text-gray-800 text-base sm:text-lg">
                                    <p>4b/39 James St, Fortitude Valley QLD 4006</p>

                                    <p>+391 (0)35 2568</p>

                                    <p>Mon–Sat: 10am–8pm</p>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className="bg-[#f5f4f1] py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-5">

                    {/* Heading */}
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-medium text-black">
                            Get In Touch
                        </h2>
                    </div>

                    {/* Form */}
                    <form className="space-y-8">

                        {/* Name & Phone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full h-14 rounded-full border border-gray-300 bg-transparent px-6 text-black placeholder:text-gray-500 outline-none focus:border-black transition"
                            />

                            <input
                                type="text"
                                placeholder="Phone"
                                className="w-full h-14 rounded-full border border-gray-300 bg-transparent px-6 text-black placeholder:text-gray-500 outline-none focus:border-black transition"
                            />
                        </div>

                        {/* Email */}
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full h-14 rounded-full border border-gray-300 bg-transparent px-6 pr-14 text-black placeholder:text-gray-500 outline-none focus:border-black transition"
                            />

                            <Mail
                                size={18}
                                className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500"
                            />
                        </div>

                        {/* Message */}
                        <textarea
                            rows={5}
                            placeholder="Your message"
                            className="w-full rounded-3xl border border-gray-300 bg-transparent px-6 py-5 text-black placeholder:text-gray-500 outline-none focus:border-black transition resize-none"
                        ></textarea>

                        {/* Button */}
                        <div className="flex justify-center pt-4">
                            <button
                                type="submit"
                                className="bg-black text-white px-10 sm:px-14 py-4 rounded-full text-sm sm:text-base uppercase tracking-wide hover:bg-gray-800 transition"
                            >
                                Submit Now
                            </button>
                        </div>

                    </form>
                </div>
            </section>
        </>
    );
};

export default Contact;