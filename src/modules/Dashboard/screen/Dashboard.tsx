"use client";
import React from "react";
import { useSession } from "next-auth/react";
import AdminDashboard from "./AdminDashboard";



const Dashboard: React.FC = () => {
    const { data: session } = useSession();

    return (
        <div>
            <AdminDashboard />
        </div>
    );
};

export default Dashboard;
