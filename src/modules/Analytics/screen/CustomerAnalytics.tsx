"use client";

import React, { useMemo } from "react";
import { useSession } from "next-auth/react";

import {
    FaUsers,
    FaBoxOpen,
} from "react-icons/fa6";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const CustomerAnalytics = ({
    ordersLists,
}: any) => {
    const { data: session } = useSession();

    console.log(
        ordersLists,
        "ordersLists"
    );

    /* ================= MONTH CATEGORIES ================= */

    const chartCategories = [
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

    /* ================= MONTH WISE CUSTOMER DATA ================= */

    const customerChartData =
        useMemo(() => {
            const monthData =
                new Array(12).fill(0);

            // Unique customer per month
            const uniqueCustomersByMonth: any =
                {};

            ordersLists.forEach(
                (order: any) => {
                    const orderDate =
                        new Date(
                            order.order_date
                        );

                    const month =
                        orderDate.getMonth();

                    if (
                        !uniqueCustomersByMonth[
                        month
                        ]
                    ) {
                        uniqueCustomersByMonth[
                            month
                        ] = new Set();
                    }

                    uniqueCustomersByMonth[
                        month
                    ].add(
                        order.customer_id
                    );
                }
            );

            // Count unique customers
            Object.keys(
                uniqueCustomersByMonth
            ).forEach((month) => {
                monthData[
                    Number(month)
                ] =
                    uniqueCustomersByMonth[
                        month
                    ].size;
            });

            return monthData;
        }, [ordersLists]);

    /* ================= TOTAL CUSTOMERS ================= */

    const totalCustomers =
        useMemo(() => {
            const users =
                new Set(
                    ordersLists.map(
                        (order: any) =>
                            order.customer_id
                    )
                );

            return users.size;
        }, [ordersLists]);

    return (
        <div className="bg-[#f8f8fb] mt-6">
            <div className="bg-white rounded-3xl shadow-sm p-6">

                {/* Header */}
                <div className="flex items-center justify-between mb-5">

                    <div>
                        <h2 className="text-xl font-bold text-gray-800">
                            Customer Analytics
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Month wise customer growth overview
                        </p>
                    </div>
                </div>

                {/* Chart */}
                {customerChartData.every(
                    (item) => item === 0
                ) ? (

                    <div className="min-h-[350px] flex flex-col items-center justify-center text-center">

                        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                            <FaBoxOpen className="text-3xl text-gray-400" />
                        </div>

                        <h3 className="text-xl font-semibold text-gray-700">
                            No Record Found
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            No customer
                            analytics available
                        </p>

                    </div>

                ) : (

                    <HighchartsReact
                        highcharts={
                            Highcharts
                        }
                        options={{
                            chart: {
                                type: "column",
                                backgroundColor:
                                    "transparent",
                                height: 350,
                            },

                            title: {
                                text: "",
                            },

                            credits: {
                                enabled: false,
                            },

                            xAxis: {
                                categories:
                                    chartCategories,
                            },

                            yAxis: {
                                title: {
                                    text: "Customers",
                                },
                            },

                            tooltip: {
                                pointFormat:
                                    "<b>{point.y} Customers</b>",
                            },

                            series: [
                                {
                                    type: "column",
                                    name: "Customers",
                                    data: customerChartData,
                                    color: "#14b8a6",
                                },
                            ],
                        }}
                    />

                )}
            </div>
        </div>
    );
};

export default CustomerAnalytics;