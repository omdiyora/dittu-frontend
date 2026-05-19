"use client";

import React, { useMemo } from "react";
import { useSession } from "next-auth/react";

import { FaTruck } from "react-icons/fa6";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const DeliveryStatus = ({
    ordersLists,
}: any) => {
    const { data: session } =
        useSession();

    /* ================= DELIVERY STATUS DATA ================= */

    const deliveryStatusData =
        useMemo(() => {

            const statusMap: Record<
                string,
                number
            > = {};

            ordersLists.forEach(
                (order: any) => {

                    const status =
                        order.delivery_status ||
                        "Unknown";

                    statusMap[status] =
                        (
                            statusMap[
                            status
                            ] || 0
                        ) + 1;
                }
            );

            return Object.entries(
                statusMap
            ).map(
                ([
                    status,
                    count,
                ]) => ({
                    name: status,
                    y: count,
                })
            );

        }, [ordersLists]);

    /* ================= TOTAL ORDERS ================= */

    const totalOrders =
        useMemo(() => {
            return ordersLists.length;
        }, [ordersLists]);

    /* ================= COLORS ================= */

    const chartColors = [
        "#6366f1",
        "#22c55e",
        "#f59e0b",
        "#ef4444",
        "#06b6d4",
        "#8b5cf6",
    ];

    const finalChartData =
        deliveryStatusData.map(
            (item, index) => ({
                ...item,
                color:
                    chartColors[
                    index %
                    chartColors.length
                    ],
            })
        );

    return (
        <div className="bg-[#f8f8fb] mt-6">

            <div className="bg-white rounded-3xl shadow-sm p-6">

                {/* Header */}
                <div className="flex items-center justify-between mb-5">

                    <div>
                        <h2 className="text-xl font-bold text-gray-800">
                            Delivery
                            Status
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Delivery
                            status
                            overview
                        </p>
                    </div>
                </div>

                {/* Empty State */}
                {finalChartData.length ===
                    0 ? (

                    <div className="min-h-[350px] flex flex-col items-center justify-center text-center">

                        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">

                            <FaTruck className="text-3xl text-gray-400" />

                        </div>

                        <h3 className="text-xl font-semibold text-gray-700">
                            No Record
                            Found
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            No delivery
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
                                type: "pie",
                                backgroundColor:
                                    "transparent",
                                height: 420,
                            },

                            title: {
                                text: "",
                            },

                            credits: {
                                enabled: false,
                            },

                            tooltip: {
                                pointFormat:
                                    "<b>{point.y} Orders</b>",
                            },

                            plotOptions: {
                                pie: {
                                    allowPointSelect: true,
                                    cursor: "pointer",

                                    borderRadius: 8,

                                    dataLabels:
                                    {
                                        enabled:
                                            true,

                                        format:
                                            "<b>{point.name}</b><br/>{point.percentage:.1f}%",

                                        style:
                                        {
                                            fontSize:
                                                "13px",

                                            textOutline:
                                                "none",
                                        },
                                    },

                                    showInLegend: true,
                                },
                            },

                            series: [
                                {
                                    type: "pie",

                                    name: "Orders",

                                    data: finalChartData,
                                },
                            ],
                        }}
                    />

                )}
            </div>
        </div>
    );
};

export default DeliveryStatus;