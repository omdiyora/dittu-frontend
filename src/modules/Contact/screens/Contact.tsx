"use client";

import { useInView } from 'react-intersection-observer';
import { Formik } from "formik";
import { FiMapPin } from "react-icons/fi";
import { BsTelephone } from "react-icons/bs";
import { VscMail } from "react-icons/vsc";
import { LuClock4 } from "react-icons/lu";
import {
    Input,
    Textarea,
    Button,
} from "@heroui/react";
import { Select, SelectItem } from "@nextui-org/react";
import { IoStar, IoStarOutline } from "react-icons/io5";
import * as Yup from "yup";
import { useStore } from "@/lib/zustand/store";

// import Footer from '@/modules/Home/screens/Footer/Footer';

const ContactSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone_number: Yup.string()
        .matches(/^[0-9]{10}$/, "Enter valid 10-digit number")
        .required("Phone number is required"),
    loan_type: Yup.string().required("Loan type is required"),
    message: Yup.string(),
});

const Contact = () => {
    const { ref: heroRef, inView: heroInView } = useInView({
        threshold: 0.1,
        triggerOnce: true
    });
    const createContact = useStore((m) => m.createContact);

    return (
        <>
            <section className="bg-[#faf6f2] py-24">
                <div className="max-w-5xl mx-auto px-4 text-center mt-16">
                    {/* Title */}
                    <h1 className="font-nunito text-4xl md:text-5xl font-semibold text-[#54221c] mb-6">
                        Contact Us
                    </h1>
                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-black max-w-3xl mx-auto leading-relaxed">
                        We’re here to answer your questions and guide you every step of the way.
                    </p>
                </div>
            </section>
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

                        {/* LEFT – Contact Info */}
                        <div className="bg-[#F9F5F0] rounded-2xl p-10 text-[#54221c] shadow-lg">
                            <h3 className="font-nunito text-2xl font-semibold mb-8">
                                Contact Information
                            </h3>

                            <ul className="space-y-6">
                                <li className="flex items-start gap-4">
                                    <FiMapPin className="text-accent-light mt-1" size={26} />
                                    <a href='https://maps.app.goo.gl/rQHzurv67eUzF4dt5' target='_blank' className="leading-relaxed text-[#54221c]/90">
                                        112, Anupam Arcade BRTS Canal Road,<br />
                                        Parvat Patiya, Opp Amazia Amusement Park,<br />
                                        Surat, Gujarat 395010, India
                                    </a>
                                </li>

                                <li className="flex items-center gap-4">
                                    <BsTelephone className="text-accent-light" size={20} />
                                    <a
                                        href="tel:+919574493000"
                                        className="hover:text-white transition"
                                    >
                                        +91 95744 93000
                                    </a>
                                </li>

                                <li className="flex items-center gap-4">
                                    <VscMail className="text-accent-light" size={20} />
                                    <a
                                        href="mailto:diyoraconsultancy@gmail.com"
                                        className="hover:text-white transition"
                                    >
                                        diyoraconsultancy@gmail.com
                                    </a>
                                </li>

                                <li className="flex items-start gap-4">
                                    <LuClock4 className="text-accent-light mt-1" size={20} />
                                    <span className="text-[#54221c]/90">
                                        Mon – Fri: 9:00 AM – 6:00 PM <br />
                                        Sat: 10:00 AM – 2:00 PM <br />
                                        Sunday: Closed
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* RIGHT – Contact Form */}
                        <div className="bg-white rounded-2xl p-10 shadow-lg">
                            <h2 className="text-3xl font-semibold text-[#54221c] mb-2">
                                Get in Touch
                            </h2>
                            <p className="text-gray-500 mb-8">
                                Fill out the form and our team will contact you shortly.
                            </p>

                            <Formik
                                initialValues={{
                                    name: "",
                                    email: "",
                                    phone_number: "",
                                    loan_type: "",
                                    message: "",
                                }}
                                validationSchema={ContactSchema}
                                onSubmit={async (values, { resetForm }) => {
                                    await createContact(values);
                                    resetForm();
                                }}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    setFieldValue,
                                }) => (
                                    <form onSubmit={handleSubmit} className="space-y-6">

                                        {/* Row 1 */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Input
                                                name="name"
                                                label="Your Name"
                                                labelPlacement="outside"
                                                placeholder="Enter full name"
                                                variant="bordered"
                                                radius="lg"
                                                value={values.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={!!(touched.name && errors.name)}
                                                errorMessage={errors.name}
                                            />

                                            <Input
                                                name="email"
                                                type="email"
                                                label="Email Address"
                                                labelPlacement="outside"
                                                placeholder="Enter email"
                                                variant="bordered"
                                                radius="lg"
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={!!(touched.email && errors.email)}
                                                errorMessage={errors.email}
                                            />
                                        </div>

                                        {/* Row 2 */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Input
                                                name="phone_number"
                                                type="tel"
                                                label="Phone Number"
                                                labelPlacement="outside"
                                                placeholder="Enter phone number"
                                                variant="bordered"
                                                radius="lg"
                                                value={values.phone_number}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={!!(touched.phone_number && errors.phone_number)}
                                                errorMessage={errors.phone_number}
                                            />

                                            <Select
                                                label="Loan Type"
                                                labelPlacement="outside"
                                                placeholder="Select loan type"
                                                selectedKeys={values.loan_type ? [values.loan_type] : []}
                                                onSelectionChange={(keys) =>
                                                    setFieldValue("loan_type", Array.from(keys)[0])
                                                }
                                                variant="bordered"
                                                radius="lg"
                                                isInvalid={!!(touched.loan_type && errors.loan_type)}
                                                errorMessage={errors.loan_type}
                                            >
                                                <SelectItem key="home">Home Loan</SelectItem>
                                                <SelectItem key="personal">Personal Loan</SelectItem>
                                                <SelectItem key="business">Business Loan</SelectItem>
                                                <SelectItem key="education">Education Loan</SelectItem>
                                                <SelectItem key="vehicle">Vehicle Loan</SelectItem>
                                            </Select>
                                        </div>

                                        {/* Message */}
                                        <Textarea
                                            name="message"
                                            label="Message (Optional)"
                                            labelPlacement="outside"
                                            placeholder="Write your message..."
                                            variant="bordered"
                                            radius="lg"
                                            minRows={4}
                                            value={values.message}
                                            onChange={handleChange}
                                        />

                                        {/* Submit */}
                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="bg-[#54221c] hover:bg-[#6b2c25] text-white font-medium px-8"
                                        >
                                            Submit Enquiry
                                        </Button>
                                    </form>
                                )}
                            </Formik>
                        </div>

                    </div>
                </div>
            </section>

            <div className="mt-10 overflow-hidden">
                <iframe
                    className="w-full h-[450px]"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4412.613592709945!2d72.86594287584444!3d21.193587482095836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04fa4a2b9bdd9%3A0x6602f4011b50709b!2sDiyora%20Consultancy!5e1!3m2!1sen!2sin!4v1766603029051!5m2!1sen!2sin"
                    loading="lazy"
                />
            </div>


            {/* <Footer /> */}
        </>
    );
};

export default Contact;