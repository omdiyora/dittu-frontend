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

    useEffect(() => {
        const fetchOrders = async () => {
            const res = await fetch(`/api/order`);
            const data = await res.json();

            setOrderLists(data || []);
        };

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

    const analyticsCards = [
        {
            title: "Total sales",
            value: `$${totalSales.toLocaleString()}`,
            percentage: "12.04%",
            increase: true,
            icon: <FaWallet />,
        },
        {
            title: "Total orders",
            value: totalOrders.toLocaleString(),
            percentage: "16.00%",
            increase: true,
            icon: <FaBoxOpen />,
        },
        {
            title: "Total revenue",
            value: `$${totalRevenue.toLocaleString()}`,
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



    const paidOrders = ordersLists.filter(
        (item) => item.payment_status === "Paid"
    ).length;

    const pendingOrders = ordersLists.filter(
        (item) => item.payment_status === "Pending"
    ).length;

    const failedOrders = ordersLists.filter(
        (item) => item.payment_status === "Failed"
    ).length;

    // ================= CHART OPTIONS =================

    const donutOptions: Highcharts.Options = {
        chart: {
            type: "pie",
            backgroundColor: "transparent",
            height: 400,
        },

        title: {
            text: "",
        },

        credits: {
            enabled: false,
        },

        tooltip: {
            pointFormat: "<b>{point.percentage:.0f}%</b>",
        },

        plotOptions: {
            pie: {
                innerSize: "72%",
                borderWidth: 0,
                borderRadius: 10,

                dataLabels: {
                    enabled: true,
                    distance: 15,
                    format: "{point.name}<br/><b>{point.percentage:.0f}%</b>",
                    style: {
                        fontSize: "13px",
                        fontWeight: "600",
                        textOutline: "none",
                    },
                },
            },
        },

        series: [
            {
                type: "pie",
                name: "Orders",

                data: [
                    {
                        name: "Paid",
                        y: paidOrders,
                        color: "#22c55e",
                    },
                    {
                        name: "Pending",
                        y: pendingOrders,
                        color: "#f59e0b",
                    },
                    {
                        name: "Failed",
                        y: failedOrders,
                        color: "#ef4444",
                    },
                ],
            },
        ],
    };

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
            </div>

            {/* ================= ROW 2 ================= */}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">

                {/* ===== REVENUE LINE CHART ===== */}

                <div className="bg-white rounded-3xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">
                                Revenue Analytics
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Monthly revenue overview
                            </p>
                        </div>
                        <Select
                            className="w-[220px]"
                            selectedKeys={["30days"]}
                            variant="bordered"
                            classNames={{
                                trigger:
                                    "bg-white border border-gray-200 shadow-sm rounded-xl h-12 px-3 justify-between",

                                value:
                                    "text-sm font-medium text-gray-700 text-left",

                                selectorIcon:
                                    "text-gray-500",

                                popoverContent:
                                    "rounded-2xl",
                            }}
                        >
                            <SelectItem key="today">Today</SelectItem>
                            <SelectItem key="yesterday">Yesterday</SelectItem>
                            <SelectItem key="30days">Last 30 Days</SelectItem>
                            <SelectItem key="90days">Last 90 Days</SelectItem>
                        </Select>

                    </div>

                    <HighchartsReact
                        highcharts={Highcharts}
                        options={{
                            chart: {
                                type: "line",
                                backgroundColor: "transparent",
                                height: 350,
                            },

                            title: {
                                text: "",
                            },

                            credits: {
                                enabled: false,
                            },

                            xAxis: {
                                categories: [
                                    "Jan",
                                    "Feb",
                                    "Mar",
                                    "Apr",
                                    "May",
                                    "Jun",
                                ],
                            },

                            yAxis: {
                                title: {
                                    text: "Revenue",
                                },
                            },

                            series: [
                                {
                                    type: "line",
                                    name: "Revenue",
                                    data: [12000, 18000, 15000, 22000, 28000, 35000],
                                    color: "#4f46e5",
                                },
                            ],
                        }}
                    />
                </div>

                {/* ===== DONUT CHART ===== */}

                <div className="bg-white rounded-3xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">
                                Orders Analytics
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Payment status overview
                            </p>

                        </div>
                        <Select
                            className="w-[220px]"
                            selectedKeys={["30days"]}
                            variant="bordered"
                            classNames={{
                                trigger:
                                    "bg-white border border-gray-200 shadow-sm rounded-xl h-12 px-3 justify-between",

                                value:
                                    "text-sm font-medium text-gray-700 text-left",

                                selectorIcon:
                                    "text-gray-500",

                                popoverContent:
                                    "rounded-2xl",
                            }}
                        >
                            <SelectItem key="today">Today</SelectItem>
                            <SelectItem key="yesterday">Yesterday</SelectItem>
                            <SelectItem key="30days">Last 30 Days</SelectItem>
                            <SelectItem key="90days">Last 90 Days</SelectItem>
                        </Select>
                    </div>

                    <div className="relative">
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={donutOptions}
                        />

                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-gray-500 text-lg">
                                Total
                            </span>

                            <h2 className="text-4xl font-bold text-gray-900">
                                {totalOrders}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= ROW 3 ================= */}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">

                {/* ===== TOP PRODUCTS ===== */}

                <div className="bg-white rounded-3xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">
                                Customer Analytics
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Customer growth overview
                            </p>
                        </div>
                    </div>

                    <HighchartsReact
                        highcharts={Highcharts}
                        options={{
                            chart: {
                                type: "column",
                                backgroundColor: "transparent",
                                height: 350,
                            },

                            title: {
                                text: "",
                            },

                            credits: {
                                enabled: false,
                            },

                            xAxis: {
                                categories: [
                                    "Jan",
                                    "Feb",
                                    "Mar",
                                    "Apr",
                                    "May",
                                    "Jun",
                                ],
                            },

                            yAxis: {
                                title: {
                                    text: "Customers",
                                },
                            },

                            series: [
                                {
                                    type: "column",
                                    name: "Customers",
                                    data: [20, 35, 50, 65, 80, 95],
                                    color: "#14b8a6",
                                },
                            ],
                        }}
                    />
                </div>

                {/* ===== RECENT ORDERS ===== */}

                <div className="bg-white rounded-3xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">
                                Recent Orders
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Latest customer purchases
                            </p>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left border-b border-gray-100">
                                    <th className="pb-3 text-sm text-gray-500">
                                        Order ID
                                    </th>

                                    <th className="pb-3 text-sm text-gray-500">
                                        Amount
                                    </th>

                                    <th className="pb-3 text-sm text-gray-500">
                                        Status
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {ordersLists.slice(0, 5).map((order, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-gray-50"
                                    >
                                        <td className="py-4 font-medium text-gray-800">
                                            {order.order_id}
                                        </td>

                                        <td className="py-4 text-gray-600">
                                            ₹{order.total}
                                        </td>

                                        <td className="py-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${order.payment_status === "Paid"
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-yellow-100 text-yellow-600"
                                                    }`}
                                            >
                                                {order.payment_status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>



        </div>
    );
};

export default Analytics;