"use client";

import React, { useMemo } from "react";

import {
    FaUsers,
    FaUser,
} from "react-icons/fa6";

const TopCustomers = ({
    ordersLists,
}: any) => {

    /* ================= TOP CUSTOMERS ================= */

    const topCustomers = useMemo(() => {

        const customerMap: Record<
            string,
            any
        > = {};

        ordersLists.forEach(
            (order: any) => {

                const customer =
                    order.customer;

                if (!customer) return;

                const customerId =
                    customer.id;

                if (
                    !customerMap[
                    customerId
                    ]
                ) {
                    customerMap[
                        customerId
                    ] = {
                        id: customer.id,
                        name: `${customer.first_name || ""} ${customer.last_name || ""}`.trim(),
                        email:
                            customer.email,
                        avatar:
                            customer.avatar_url,
                        totalOrders: 0,
                        totalSpent: 0,
                    };
                }

                customerMap[
                    customerId
                ].totalOrders += 1;

                customerMap[
                    customerId
                ].totalSpent +=
                    Number(
                        order.total || 0
                    );
            }
        );

        return Object.values(
            customerMap
        )
            .sort(
                (
                    a: any,
                    b: any
                ) =>
                    b.totalSpent -
                    a.totalSpent
            )
            .slice(0, 10);

    }, [ordersLists]);

    /* ================= TOTAL CUSTOMERS ================= */

    const totalCustomers =
        useMemo(() => {

            return new Set(
                ordersLists.map(
                    (order: any) =>
                        order.customer_id
                )
            ).size;

        }, [ordersLists]);

    return (
        <div className="bg-white rounded-3xl shadow-sm p-6 mt-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-5">

                <div>
                    <h2 className="text-xl font-bold text-gray-800">
                        Top Customers
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Highest spending
                        customers
                    </p>
                </div>
            </div>

            {/* Empty State */}
            {topCustomers.length ===
                0 ? (

                <div className="min-h-[300px] flex flex-col items-center justify-center text-center">

                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">

                        <FaUsers className="text-3xl text-gray-400" />

                    </div>

                    <h3 className="text-xl font-semibold text-gray-700">
                        No Record Found
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                        No customer data
                        available
                    </p>

                </div>

            ) : (

                <div className="space-y-4">

                    {topCustomers.map(
                        (
                            customer: any,
                            index: number
                        ) => (

                            <div
                                key={
                                    customer.id
                                }
                                className="flex items-center justify-between border border-gray-100 rounded-2xl p-4 hover:bg-gray-50 transition"
                            >

                                {/* Left */}
                                <div className="flex items-center gap-4">

                                    {/* Avatar */}
                                    <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center overflow-hidden">

                                        {customer.avatar ? (

                                            <img
                                                src={
                                                    customer.avatar
                                                }
                                                alt={
                                                    customer.name
                                                }
                                                className="w-full h-full object-cover"
                                            />

                                        ) : (

                                            <FaUser className="text-violet-600 text-xl" />

                                        )}

                                    </div>

                                    {/* Info */}
                                    <div>

                                        <h3 className="font-semibold text-gray-800">
                                            {
                                                customer.name
                                            }
                                        </h3>

                                        <p className="text-sm text-gray-500 mt-1">
                                            {
                                                customer.email
                                            }
                                        </p>

                                    </div>
                                </div>

                                {/* Right */}
                                <div className="text-right">

                                    <h4 className="font-bold text-gray-800">
                                        ₹
                                        {customer.totalSpent.toLocaleString()}
                                    </h4>

                                    <p className="text-sm text-violet-600 font-medium mt-1">
                                        {
                                            customer.totalOrders
                                        }{" "}
                                        Orders
                                    </p>

                                </div>

                            </div>
                        )
                    )}

                </div>

            )}
        </div>
    );
};

export default TopCustomers;