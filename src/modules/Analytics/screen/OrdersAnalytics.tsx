"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";

import { FaBoxOpen } from "react-icons/fa6";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const OrdersAnalytics = ({
    ordersLists,
}: any) => {
    const { data: session } =
        useSession();



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

    /* ================= MONTH WISE ORDER DATA ================= */

    const orderChartData =
        useMemo(() => {
            const monthData =
                new Array(12).fill(0);

            ordersLists.forEach(
                (order: any) => {
                    const orderDate =
                        new Date(
                            order.order_date
                        );

                    const month =
                        orderDate.getMonth();

                    monthData[
                        month
                    ] += 1;
                }
            );

            return monthData;
        }, [ordersLists]);

    /* ================= TOTAL ORDERS ================= */

    const totalOrders =
        useMemo(() => {
            return ordersLists.length;
        }, [ordersLists]);

    return (
        <div className="bg-[#f8f8fb] mt-6">
            <div className="bg-white rounded-3xl shadow-sm p-6">

                {/* Header */}
                <div className="flex items-center justify-between mb-5">

                    <div>
                        <h2 className="text-xl font-bold text-gray-800">
                            Orders Analytics
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Month wise
                            order growth
                            overview
                        </p>
                    </div>
                </div>

                {/* Chart */}
                {orderChartData.every(
                    (item) => item === 0
                ) ? (

                    <div className="min-h-[350px] flex flex-col items-center justify-center text-center">

                        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                            <FaBoxOpen className="text-3xl text-gray-400" />
                        </div>

                        <h3 className="text-xl font-semibold text-gray-700">
                            No Record
                            Found
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            No order
                            analytics
                            available
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
                                    text: "Orders",
                                },
                            },

                            tooltip: {
                                pointFormat:
                                    "<b>{point.y} Orders</b>",
                            },

                            series: [
                                {
                                    type: "column",
                                    name: "Orders",
                                    data: orderChartData,
                                    color: "#6366f1",
                                },
                            ],
                        }}
                    />

                )}
            </div>
        </div>
    );
};

export default OrdersAnalytics;