"use client";
import React, { useEffect, useMemo } from "react";
import { Progress, Button } from "@nextui-org/react";
// import {
//     FaChartBar,
//     FaTimesCircle,
//     FaCheckCircle,
//     FaSearch,
// } from "react-icons/fa";
import { useStore } from "@/lib/zustand/store";
import { useSession } from "next-auth/react";
import { HiOutlineDocumentCheck } from "react-icons/hi2";
import { PiWarningOctagonFill } from "react-icons/pi";
import { useRouter } from "next/navigation";
import {
    FaChartBar,
    FaHome,
    FaUserTie,
    FaBriefcase,
    FaGraduationCap,
    FaCar
} from "react-icons/fa";
import StatCards from "./StatCard";
import { STAT_CONFIG } from "./statConfig";
const AdminDashboard: React.FC<any> = ({ params }) => {
    const { data: session } = useSession();
    const router = useRouter();

    const reportData = useStore((m) => m.reportData);
    const getReport = useStore((m) => m.getReport);


    // ---------------- FETCH ----------------
    useEffect(() => {
        getReport();
    }, [getReport]);



    const counts = useMemo(() => ({
        total: reportData?.length || 0,
        home: reportData?.filter((e: any) => e.type_loan?.includes("HOME")).length || 0,
        personal: reportData?.filter((e: any) => e.type_loan?.includes("PERSONAL")).length || 0,
        business: reportData?.filter((e: any) => e.type_loan?.includes("BUSINESS")).length || 0,
        education: reportData?.filter((e: any) => e.type_loan?.includes("EDUCATION")).length || 0,
        vehicle: reportData?.filter((e: any) => e.type_loan?.includes("VEHICLE")).length || 0,
    }), [reportData]);


    return (
        <div className="p-6 ">
            <header className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold nunito-bold">
                        Welcome {session?.user.first_name} 👋
                    </h1>
                </div>
            </header>

            {/* <div className="grid grid-cols-6 gap-4 mb-6">
                <StatCard
                    icon={<FaChartBar className="text-[#FF641C] text-[22px]" />}
                    value={1}
                    label="Total Report"
                    bgColor="bg-[#FFC4AA]"
                />

                <StatCard
                    icon={<FaHome className="text-orange-400 text-[22px]" />}
                    value={1}
                    label="Home Loan"
                    bgColor="bg-[#FFF1DD]"
                />

                <StatCard
                    icon={<FaUserTie className="text-[#FFB18D] text-[22px]" />}
                    value={1}
                    label="Personal Loan"
                    bgColor="bg-[#FFEBE2]"
                />

                <StatCard
                    icon={<FaBriefcase className="text-orange-400 text-[22px]" />}
                    value={1}
                    label="Business Loan"
                    bgColor="bg-[#FFF1DD]"
                />

                <StatCard
                    icon={<FaGraduationCap className="text-green-600 text-[22px]" />}
                    value={1}
                    label="Education Loan"
                    bgColor="bg-[#dcfce7]"
                />

                <StatCard
                    icon={<FaCar className="text-red-500 text-[22px]" />}
                    value={1}
                    label="Vehicle Loan"
                    bgColor="bg-[#FFDDDD]"
                />
            </div> */}



            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
                {Object.entries(STAT_CONFIG).map(([key, config]) => (
                    <StatCards
                        key={key}
                        icon={config.icon}
                        value={counts[key as keyof typeof counts] || 0}
                        label={config.label}
                        bgColor={config.bg}
                        iconColor={config.iconColor}
                        glow={config.glow}
                    />
                ))}
            </div>


        </div>
    );
};

const StatCard: React.FC<{
    icon: React.ReactNode;
    value: number | string;
    label: string;
    bgColor?: string;
}> = ({ icon, value, label, bgColor }) => (
    <div className="bg-white p-4 rounded-lg shadow ">
        <div className="flex justify-center">
            <div className={`text-2xl rounded-full mr-2 p-2 ${bgColor}`}>{icon}</div>
            <div className="text-2xl font-bold nunito-bold my-auto">{value}</div>
        </div>
        <div className="flex justify-center	mt-2">
            <div className="text-sm nunito-bold">{label}</div>
        </div>
    </div>
);

export default AdminDashboard;
