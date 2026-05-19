"use client";

import React, { useMemo } from "react";
import { useSession } from "next-auth/react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const RevenueAnalytics = ({ ordersLists }: any) => {
    const { data: session } = useSession();

    // Month Wise Revenue
    const monthlyRevenue = useMemo(() => {
        const months = [
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

        const revenueData = new Array(12).fill(0);

        ordersLists.forEach((order: any) => {
            const date = new Date(order.order_date);

            const monthIndex = date.getMonth();

            revenueData[monthIndex] += Number(
                order.total
            );
        });

        return {
            categories: months,
            revenue: revenueData,
        };
    }, [ordersLists]);

    // Total Revenue
    const totalRevenue = ordersLists.reduce(
        (sum: number, order: any) =>
            sum + Number(order.total),
        0
    );

    // Total Orders
    const totalOrders = ordersLists.length;

    return (
        <div className="bg-[#f8f8fb] mt-6">
            <div className="bg-white rounded-3xl shadow-sm p-6">

                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-800">
                        Revenue Analytics
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Month wise revenue overview
                    </p>
                </div>

                {/* Chart */}
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
                            categories:
                                monthlyRevenue.categories,
                        },

                        yAxis: {
                            title: {
                                text: "Revenue",
                            },
                        },

                        tooltip: {
                            pointFormat:
                                "Revenue: <b>₹{point.y}</b>",
                        },

                        series: [
                            {
                                type: "line",
                                name: "Revenue",
                                data:
                                    monthlyRevenue.revenue,
                                color: "#4f46e5",
                            },
                        ],
                    }}
                />
            </div>
        </div>
    );
};

export default RevenueAnalytics;