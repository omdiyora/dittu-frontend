"use client";

import React, { useMemo } from "react";

import Image from "next/image";

import {
    FaBoxOpen,
} from "react-icons/fa6";

const RecentOrders = ({
    ordersLists,
}: any) => {

    /* ================= RECENT ORDERS ================= */

    const recentOrders = useMemo(() => {

        return [...ordersLists]
            .sort(
                (
                    a: any,
                    b: any
                ) =>
                    new Date(
                        b.order_date
                    ).getTime() -
                    new Date(
                        a.order_date
                    ).getTime()
            )
            .slice(0, 5);

    }, [ordersLists]);

    /* ================= STATUS COLORS ================= */

    const getStatusColor = (
        status: string
    ) => {

        switch (status) {

            case "Delivered":
                return "bg-green-100 text-green-600";

            case "Processing":
                return "bg-yellow-100 text-yellow-600";

            case "Cancelled":
                return "bg-red-100 text-red-600";

            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    return (
        <div className="bg-white rounded-3xl shadow-sm p-6 mt-4">

            {/* Header */}
            <div className="flex items-center justify-between mb-5">

                <div>
                    <h2 className="text-xl font-bold text-gray-800">
                        Recent Orders
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Latest customer
                        orders overview
                    </p>
                </div>
            </div>

            {/* Empty State */}
            {recentOrders.length ===
                0 ? (

                <div className="min-h-[300px] flex flex-col items-center justify-center text-center">

                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">

                        <FaBoxOpen className="text-3xl text-gray-400" />

                    </div>

                    <h3 className="text-xl font-semibold text-gray-700">
                        No Record Found
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                        No recent orders
                        available
                    </p>

                </div>

            ) : (

                <div className="space-y-4">

                    {recentOrders.map(
                        (
                            order: any
                        ) => (

                            <div
                                key={order.id}
                                className="flex items-center justify-between border border-gray-100 rounded-2xl p-4 hover:bg-gray-50 transition"
                            >

                                {/* LEFT */}
                                <div className="flex items-center gap-4">

                                    {/* Product Image */}
                                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gray-100">

                                        <Image
                                            src={
                                                order
                                                    .items?.[0]
                                                    ?.image
                                            }
                                            alt={
                                                order
                                                    .items?.[0]
                                                    ?.name
                                            }
                                            fill
                                            className="object-cover"
                                        />

                                    </div>

                                    {/* Info */}
                                    <div>

                                        <h3 className="font-semibold text-gray-800">
                                            {
                                                order.order_id
                                            }
                                        </h3>

                                        <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                                            {
                                                order
                                                    .customer
                                                    ?.first_name
                                            }{" "}
                                            {
                                                order
                                                    .customer
                                                    ?.last_name
                                            }
                                        </p>

                                        <p className="text-xs text-gray-400 mt-1">
                                            {new Date(
                                                order.order_date
                                            ).toLocaleDateString(
                                                "en-IN",
                                                {
                                                    day: "numeric",
                                                    month:
                                                        "short",
                                                    year: "numeric",
                                                }
                                            )}
                                        </p>

                                    </div>
                                </div>

                                {/* RIGHT */}
                                <div className="text-right">

                                    <h4 className="font-bold text-gray-800">
                                        ₹
                                        {Number(
                                            order.total
                                        ).toLocaleString()}
                                    </h4>

                                    <div
                                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium mt-2 ${getStatusColor(
                                            order.delivery_status
                                        )}`}
                                    >
                                        {
                                            order.delivery_status
                                        }
                                    </div>

                                </div>

                            </div>
                        )
                    )}

                </div>

            )}
        </div>
    );
};

export default RecentOrders;