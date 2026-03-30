"use client";
import { notFound } from "next/navigation";
import { IoHomeOutline } from "react-icons/io5";
import { MdCreditCard } from "react-icons/md";
import { FiBriefcase } from "react-icons/fi";
import { FaUniversity } from "react-icons/fa";
import { Home, Briefcase, Car, GraduationCap, CreditCard, Building2 } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

type Props = {
    params: {
        slug: string;
    };
};

const services = [
    {
        id: 1,
        icon: IoHomeOutline,
        title: "Home Loans",
        slug: "home-loans",
        description: "Make your dream home a reality with our competitive mortgage rates and flexible repayment options.",
        features: [
            "Fixed & adjustable rates",
            "Up to 30-year terms",
            "First-time buyer programs",
            "Refinancing options",
        ],
        rate: "5.99% APR",
        maxAmount: "$2,000,000",
    },
    {
        id: 2,
        icon: MdCreditCard,
        title: "Personal Loans",
        slug: "personal-loans",
        description: "Get the funds you need for life's important moments with quick approval and competitive rates.",
        features: [
            "No collateral required",
            "Fixed monthly payments",
            "Flexible loan amounts",
            "Quick disbursement",
        ],
        rate: "7.49% APR",
        maxAmount: "$100,000",
    },
    {
        id: 3,
        icon: FiBriefcase,
        title: "Business Loans",
        slug: "business-loans",
        description: "Fuel your business growth with tailored financing solutions designed for entrepreneurs.",
        features: [
            "Working capital loans",
            "Equipment financing",
            "Line of credit",
            "SBA loan programs",
        ],
        rate: "6.99% APR",
        maxAmount: "$5,000,000",
    },
    {
        id: 4,
        icon: FaUniversity,
        title: "Auto Loans",
        slug: "auto-loans",
        description: "Drive away in your dream car with our affordable auto financing options.",
        features: [
            "New & used vehicles",
            "No down payment options",
            "Competitive rates",
            "Fast pre-approval",
        ],
        rate: "4.99% APR",
        maxAmount: "$150,000",
    },
    {
        id: 5,
        icon: GraduationCap,
        title: "Education Loans",
        slug: "education-loans",
        description: "Invest in your future with education financing for tuition, books, and living expenses.",
        features: [
            "Undergraduate & graduate",
            "Deferred payments",
            "No origination fees",
            "Parent loan options",
        ],
        rate: "5.49% APR",
        maxAmount: "$200,000",
    },
    {
        id: 6,
        icon: Building2,
        title: "Commercial Real Estate",
        slug: "commercial-real-estate",
        description: "Expand your portfolio with commercial property financing for investors and businesses.",
        features: [
            "Office & retail spaces",
            "Investment properties",
            "Construction loans",
            "Bridge financing",
        ],
        rate: "6.49% APR",
        maxAmount: "$10,000,000",
    },
];

const ServiceSinglePage = () => {

    const params = useParams<any>();
    const service = services.find(
        (item) => item.slug === params.slug
    );

    if (!service) return notFound();

    const Icon = service.icon;

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <Icon className="mx-auto text-5xl text-[#54221c]" />
                    <h1 className="mt-4 text-4xl font-bold text-[#54221c]">
                        {service.title}
                    </h1>
                    {/* <p className="mt-4 text-gray-600">
                        {service.longDescription}
                    </p> */}
                </div>

                {/* Details */}
                <div className="bg-white rounded-xl shadow p-8">
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <h4 className="font-semibold text-lg">Interest Rate</h4>
                            <p className="text-gray-600">{service.rate}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg">Maximum Amount</h4>
                            <p className="text-gray-600">{service.maxAmount}</p>
                        </div>
                    </div>

                    {/* Features */}
                    <h4 className="font-semibold text-lg mb-4">Key Features</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                        {service.features.map((feature: any, i: any) => (
                            <li key={i}>{feature}</li>
                        ))}
                    </ul>

                    {/* CTA */}
                    <div className="mt-10 text-center">
                        <a
                            href="/contact"
                            className="inline-block bg-[#54221c] text-white px-8 py-3 rounded-lg hover:bg-[#3e1814] transition"
                        >
                            Apply for {service.title}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceSinglePage;