"use client";

import React, { useMemo, useState } from "react";
import { useSession } from "next-auth/react";

import {
    FaUsers,
    FaWallet,
    FaBoxOpen,
} from "react-icons/fa6";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { Select, SelectItem } from "@nextui-org/react";

const OrdersPayment = ({ ordersLists }: any) => {
    const { data: session } = useSession();

    const [selectedFilter, setSelectedFilter] =
        useState("7days");

    /* ================= FILTER ORDERS ================= */

    const filteredOrders = useMemo(() => {
        const now = new Date();

        return ordersLists.filter((order: any) => {
            const orderDate = new Date(
                order.order_date
            );

            const diffTime =
                now.getTime() - orderDate.getTime();

            const diffDays =
                diffTime / (1000 * 60 * 60 * 24);

            switch (selectedFilter) {
                case "today":
                    return (
                        orderDate.toDateString() ===
                        now.toDateString()
                    );

                case "yesterday":
                    const yesterday = new Date();

                    yesterday.setDate(
                        now.getDate() - 1
                    );

                    return (
                        orderDate.toDateString() ===
                        yesterday.toDateString()
                    );

                case "7days":
                    return diffDays <= 7;

                case "30days":
                    return diffDays <= 30;

                case "60days":
                    return diffDays <= 60;

                case "90days":
                    return diffDays <= 90;

                case "thisyear":
                    return (
                        orderDate.getFullYear() ===
                        now.getFullYear()
                    );

                case "lastyear":
                    return (
                        orderDate.getFullYear() ===
                        now.getFullYear() - 1
                    );

                default:
                    return true;
            }
        });
    }, [ordersLists, selectedFilter]);

    /* ================= TOTALS ================= */

    const totalOrders = filteredOrders.length;

    const totalSales = useMemo(() => {
        return filteredOrders.reduce(
            (acc: number, order: any) =>
                acc + Number(order.total || 0),
            0
        );
    }, [filteredOrders]);

    const totalRevenue = useMemo(() => {
        return Math.floor(totalSales * 0.2);
    }, [totalSales]);

    const totalUsers = useMemo(() => {
        const users = new Set(
            filteredOrders.map(
                (order: any) =>
                    order.customer_id
            )
        );

        return users.size;
    }, [filteredOrders]);

    /* ================= PAYMENT STATUS ================= */

    const paidOrders = filteredOrders.filter(
        (item: any) =>
            item.payment_status === "Paid"
    ).length;

    const pendingOrders = filteredOrders.filter(
        (item: any) =>
            item.payment_status === "Pending"
    ).length;

    const failedOrders = filteredOrders.filter(
        (item: any) =>
            item.payment_status === "Failed"
    ).length;

    // Remove 0 values from donut chart
    const donutData = [
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
    ].filter((item) => item.y > 0);

    /* ================= CHART CATEGORIES ================= */

    const chartCategories = useMemo(() => {
        const now = new Date();

        // Today & Yesterday => 24hr
        if (
            selectedFilter === "today" ||
            selectedFilter === "yesterday"
        ) {
            return Array.from(
                { length: 24 },
                (_, i) => `${i}:00`
            );
        }

        // Last 7 Days => Monday to Sunday
        if (selectedFilter === "7days") {
            return [
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sun",
            ];
        }

        // This Year & Last Year => Jan to Dec
        if (
            selectedFilter === "thisyear" ||
            selectedFilter === "lastyear"
        ) {
            return [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ];
        }

        // Last 30 / 60 / 90 Days
        const days =
            selectedFilter === "30days"
                ? 30
                : selectedFilter === "60days"
                    ? 60
                    : 90;

        return Array.from(
            { length: days },
            (_, i) => {
                const date = new Date();

                date.setDate(
                    now.getDate() - (days - i - 1)
                );

                return date.toLocaleDateString(
                    "en-IN",
                    {
                        day: "numeric",
                        month: "short",
                    }
                );
            }
        );
    }, [selectedFilter]);

    /* ================= ANALYTICS CARDS ================= */

    const analyticsCards = [
        {
            title: "Total sales",
            value: `₹${totalSales.toLocaleString()}`,
            icon: <FaWallet />,
        },
        {
            title: "Total orders",
            value: totalOrders.toLocaleString(),
            icon: <FaBoxOpen />,
        },
        {
            title: "Total revenue",
            value: `₹${totalRevenue.toLocaleString()}`,
            icon: <FaWallet />,
        },
        {
            title: "Total customers",
            value: totalUsers.toLocaleString(),
            icon: <FaUsers />,
        },
    ];

    /* ================= DONUT OPTIONS ================= */

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
            pointFormat:
                "<b>{point.percentage:.0f}%</b>",
        },

        plotOptions: {
            pie: {
                innerSize: "72%",
                borderWidth: 0,
                borderRadius: 10,

                dataLabels: {
                    enabled: true,
                    distance: 15,

                    format:
                        "{point.name}<br/><b>{point.percentage:.0f}%</b>",

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
                data: donutData,
            },
        ],
    };

    return (
        <div className="bg-[#f8f8fb] mt-6">
            <div className="bg-white rounded-3xl shadow-sm p-6">

                {/* Header */}
                <div className="flex items-center justify-between mb-5">

                    <div>
                        <h2 className="text-xl font-bold text-gray-800">
                            Payment Status Analytics
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Payment status overview
                        </p>
                    </div>

                    <Select
                        className="w-[220px]"
                        selectedKeys={[
                            selectedFilter,
                        ]}
                        onSelectionChange={(
                            keys: any
                        ) => {
                            const value =
                                Array.from(keys)[0];

                            setSelectedFilter(
                                value as string
                            );
                        }}
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
                        <SelectItem key="today">
                            Today
                        </SelectItem>

                        <SelectItem key="yesterday">
                            Yesterday
                        </SelectItem>

                        <SelectItem key="7days">
                            Last 7 Days
                        </SelectItem>

                        <SelectItem key="30days">
                            Last 30 Days
                        </SelectItem>

                        <SelectItem key="60days">
                            Last 60 Days
                        </SelectItem>

                        <SelectItem key="90days">
                            Last 90 Days
                        </SelectItem>
                        <SelectItem key="thisyear">
                            This Year
                        </SelectItem>
                        <SelectItem key="lastyear">
                            Last Year
                        </SelectItem>
                    </Select>
                </div>



                {/* Donut Chart */}
                {/* Donut Chart */}
                <div className="relative min-h-[400px] flex items-center justify-center">

                    {donutData.length === 0 ? (

                        <div className="flex flex-col items-center justify-center text-center">

                            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                <FaBoxOpen className="text-3xl text-gray-400" />
                            </div>

                            <h3 className="text-xl font-semibold text-gray-700">
                                No Record Found
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                                No payment status available for this filter
                            </p>

                        </div>

                    ) : (

                        <>
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
                        </>

                    )}

                </div>
            </div>
        </div>
    );
};

export default OrdersPayment;