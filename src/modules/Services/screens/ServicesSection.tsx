
import { Home, Briefcase, Car, GraduationCap, CreditCard, Building2 } from "lucide-react";
import ServiceCards from "./ServiceCards";
import { IoHomeOutline } from "react-icons/io5";
import { MdCreditCard } from "react-icons/md";
import { FiBriefcase } from "react-icons/fi";
import { FaUniversity } from "react-icons/fa";
import SectionHeading from "@/components/SectionHeading";
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

const ServicesSection = () => {
    return (
        <section id="services" className="py-20 md:py-28 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                {/* <div className="text-center max-w-3xl mx-auto mb-16">
                    <SectionHeading
                        title="Our Services"
                        subtitle="A clear, seamless, and transparent journey to securing the right loan for you."
                    />
                </div> */}

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        // @ts-ignore
                        <ServiceCards key={service.title} {...service} delay={index * 0.1} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
