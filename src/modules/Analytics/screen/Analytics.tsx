"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import {
    FaArrowTrendUp,
    FaArrowTrendDown,
    FaUsers,
    FaWallet,
    FaBoxOpen,
} from "react-icons/fa6";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import { Select, SelectItem } from "@heroui/react";
import RevenueAnalytics from "./RevenueAnalytics";
import OrdersAnalytics from "./OrdersAnalytics";
import CustomerAnalytics from "./CustomerAnalytics";
import OrdersPayment from "./OrdersPayment";
import SaleCategory from "./SaleCategory";
import DeliveryStatus from "./DeliveryStatus";
import TopProducts from "./TopProducts";
import TopStates from "./TopState";
import TopCustomers from "./TopCustomers";
import RecentOrders from "./RecentOrders";
interface OrderItem {
    price: number;
    quantity: number;
}

interface OrderType {
    id: number;
    total: string;
    items: OrderItem[];
}

const Analytics = () => {
    const { data: session } = useSession();

    const [ordersLists, setOrderLists] = useState<any[]>([]);

    const [products, setProducts] = useState<any[]>([]);



    useEffect(() => {

        const fetchProducts = async () => {
            const res = await fetch(`/api/products`);
            const data = await res.json();
            setProducts(data || []);
        };

        const fetchOrders = async () => {
            const res = await fetch(`/api/order`);
            const data = await res.json();

            setOrderLists(data || []);
        };

        fetchProducts();
        fetchOrders();
    }, []);

    console.log(ordersLists, "ordersLists");

    /* ================= CALCULATIONS ================= */

    const totalOrders = ordersLists.length;

    const totalSales = useMemo(() => {
        return ordersLists.reduce(
            (acc, order) => acc + Number(order.total || 0),
            0
        );
    }, [ordersLists]);

    const totalRevenue = useMemo(() => {
        // Example: 20% revenue/profit
        return Math.floor(totalSales * 0.2);
    }, [totalSales]);

    const totalUsers = useMemo(() => {
        const users = new Set(
            ordersLists.map((order: any) => order.customer_id)
        );

        return users.size;
    }, [ordersLists]);

    // ================= CURRENT MONTH =================

    const currentMonthOrders =
        ordersLists.filter(
            (order: any) => {
                const date = new Date(
                    order.order_date
                );

                const now = new Date();

                return (
                    date.getMonth() ===
                    now.getMonth() &&
                    date.getFullYear() ===
                    now.getFullYear()
                );
            }
        ).length;

    // ================= LAST MONTH =================

    const lastMonthOrders =
        ordersLists.filter(
            (order: any) => {
                const date = new Date(
                    order.order_date
                );

                const now = new Date();

                const lastMonth =
                    now.getMonth() === 0
                        ? 11
                        : now.getMonth() - 1;

                const lastMonthYear =
                    now.getMonth() === 0
                        ? now.getFullYear() -
                        1
                        : now.getFullYear();

                return (
                    date.getMonth() ===
                    lastMonth &&
                    date.getFullYear() ===
                    lastMonthYear
                );
            }
        ).length;

    // ================= PERCENTAGE =================

    const percentageChange =
        lastMonthOrders === 0
            ? 100
            : (
                ((currentMonthOrders -
                    lastMonthOrders) /
                    lastMonthOrders) *
                100
            ).toFixed(2);

    const isIncrease =
        currentMonthOrders >=
        lastMonthOrders;

    const analyticsCards = [
        {
            title: "Total sales",
            value: `₹${totalSales.toLocaleString()}`,
            percentage: "12.04%",
            increase: true,
            icon: <FaWallet />,
        },
        {
            title: "Total revenue",
            value: `₹${totalRevenue.toLocaleString()}`,
            percentage: "11.07%",
            increase: true,
            icon: <FaWallet />,
        },
        {
            title: "Total customers",
            value: totalUsers.toLocaleString(),
            percentage: "4.06%",
            increase: false,
            icon: <FaUsers />,
        },
    ];




    return (
        <div className="min-h-screen bg-[#f8f8fb] p-6">
            {/* ================= HEADER ================= */}



            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Welcome back, {session?.user?.first_name} 👋
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Here’s what’s happening with your store today.
                    </p>
                </div>
            </div>




            {/* ================= ANALYTICS CARDS ================= */}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {analyticsCards.map((card, index) => (
                    <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                        {/* TOP */}
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-[15px] text-gray-500 font-medium">
                                    {card.title}
                                </p>

                                <h2 className="text-4xl font-bold text-gray-900 mt-2">
                                    {card.value}
                                </h2>
                            </div>

                            <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700 text-lg">
                                {card.icon}
                            </div>
                        </div>

                        {/* BOTTOM */}
                        <div className="flex items-center gap-2 mt-5">
                            <span
                                className={`flex items-center gap-1 text-sm font-semibold ${card.increase ? "text-green-600" : "text-red-500"
                                    }`}
                            >
                                {card.increase ? (
                                    <FaArrowTrendUp />
                                ) : (
                                    <FaArrowTrendDown />
                                )}

                                {card.percentage}
                            </span>

                            <span className="text-sm text-gray-400">
                                vs last month
                            </span>
                        </div>
                    </div>
                ))}
                <div className="grid grid-cols-1">

                    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300">

                        {/* TOP */}
                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-[15px] text-gray-500 font-medium">
                                    Total Orders
                                </p>

                                <h2 className="text-4xl font-bold text-gray-900 mt-2">
                                    {ordersLists.length}
                                </h2>

                            </div>

                            <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700 text-lg">

                                <FaBoxOpen />

                            </div>
                        </div>

                        {/* BOTTOM */}
                        <div className="flex items-center gap-2 mt-5">

                            <span
                                className={`flex items-center gap-1 text-sm font-semibold ${isIncrease
                                    ? "text-green-600"
                                    : "text-red-500"
                                    }`}
                            >

                                {isIncrease ? (
                                    <FaArrowTrendUp />
                                ) : (
                                    <FaArrowTrendDown />
                                )}

                                {percentageChange}%

                            </span>

                            <span className="text-sm text-gray-400">
                                vs last month
                            </span>

                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ordersLists.length > 0 && <RevenueAnalytics ordersLists={ordersLists} />}
                {ordersLists.length > 0 && <OrdersPayment ordersLists={ordersLists} />}

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ordersLists.length > 0 && <CustomerAnalytics ordersLists={ordersLists} />}
                {ordersLists.length > 0 && <OrdersAnalytics ordersLists={ordersLists} />}

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ordersLists.length > 0 && <SaleCategory ordersLists={ordersLists} />}
                {ordersLists.length > 0 && <DeliveryStatus ordersLists={ordersLists} />}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {ordersLists.length > 0 && <TopProducts ordersLists={ordersLists} products={products} />}
                {ordersLists.length > 0 && <TopStates ordersLists={ordersLists} />}
                {ordersLists.length > 0 && <TopCustomers ordersLists={ordersLists} />}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-1 gap-6">
                {ordersLists.length > 0 && <RecentOrders ordersLists={ordersLists} />}
                {/* {ordersLists.length > 0 && <TopStates ordersLists={ordersLists} />}
                {ordersLists.length > 0 && <TopCustomers ordersLists={ordersLists} />} */}
            </div>

        </div>
    );
};

export default Analytics;