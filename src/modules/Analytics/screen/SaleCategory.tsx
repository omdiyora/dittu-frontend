"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";

import { FaBoxOpen } from "react-icons/fa6";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const SaleCategory = ({
    ordersLists,
    // products,
}: any) => {
    const { data: session } =
        useSession();

    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch(`/api/products`);
            const data = await res.json();
            setProducts(data || []);
        };

        fetchProducts();
    }, []);


    /* ================= CATEGORY WISE ORDER DATA ================= */

    const categoryChartData =
        useMemo(() => {

            const categoryMap: Record<
                string,
                number
            > = {};

            ordersLists.forEach(
                (order: any) => {

                    order.items.forEach(
                        (item: any) => {

                            // Find Product
                            const product =
                                products?.find(
                                    (
                                        p: any
                                    ) =>
                                        p.id ===
                                        item.id
                                );

                            // Product Category
                            const category =
                                product?.category ||
                                "Unknown";

                            // Count Orders
                            categoryMap[
                                category
                            ] =
                                (
                                    categoryMap[
                                    category
                                    ] ||
                                    0
                                ) +
                                item.quantity;
                        }
                    );
                }
            );

            return categoryMap;

        }, [ordersLists, products]);

    /* ================= CHART DATA ================= */

    const categoryNames =
        Object.keys(
            categoryChartData
        );

    const categoryValues =
        Object.values(
            categoryChartData
        );
    const maxValue = Math.max(...categoryValues, 0);

    // Dynamic Tick Positions
    const tickPositions = Array.from(
        { length: 6 },
        (_, i) =>
            Math.ceil(
                (maxValue / 5) * i
            )
    ).filter(
        (value, index, self) =>
            self.indexOf(value) === index
    );

    return (
        <div className="bg-[#f8f8fb] mt-6">

            <div className="bg-white rounded-3xl shadow-sm p-6">

                {/* Header */}
                <div className="flex items-center justify-between mb-5">

                    <div>
                        <h2 className="text-xl font-bold text-gray-800">
                            Category Orders Analytics
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Category wise
                            order overview
                        </p>
                    </div>
                </div>

                {/* Empty State */}
                {categoryValues.length ===
                    0 ? (

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
                                    categoryNames,
                            },

                            yAxis: {
                                title: {
                                    text: "Orders",
                                },
                                tickPositions,
                                min: 0,
                            },

                            tooltip: {
                                pointFormat:
                                    "<b>{point.y} Orders</b>",
                            },

                            series: [
                                {
                                    type: "column",
                                    name: "Orders",
                                    data: categoryValues,
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

export default SaleCategory;