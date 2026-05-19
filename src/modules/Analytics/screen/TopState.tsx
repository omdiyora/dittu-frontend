"use client";

import React, { useMemo } from "react";

import {
    FaLocationDot,
} from "react-icons/fa6";

const TopStates = ({
    ordersLists,
}: any) => {

    /* ================= TOP STATES ================= */

    const topStates = useMemo(() => {

        const stateMap: Record<
            string,
            {
                orders: number;
                revenue: number;
            }
        > = {};

        ordersLists.forEach(
            (order: any) => {

                const state =
                    order.state ||
                    "Unknown";

                if (
                    !stateMap[state]
                ) {
                    stateMap[state] = {
                        orders: 0,
                        revenue: 0,
                    };
                }

                stateMap[state]
                    .orders += 1;

                stateMap[state]
                    .revenue += Number(
                        order.total || 0
                    );
            }
        );

        return Object.entries(
            stateMap
        )
            .map(
                ([
                    state,
                    data,
                ]) => ({
                    state,
                    ...data,
                })
            )
            .sort(
                (
                    a: any,
                    b: any
                ) =>
                    b.orders -
                    a.orders
            )
            .slice(0, 10);

    }, [ordersLists]);

    /* ================= TOTAL STATES ================= */

    const totalStates =
        useMemo(() => {

            return new Set(
                ordersLists.map(
                    (order: any) =>
                        order.state
                )
            ).size;

        }, [ordersLists]);

    return (
        <div className="bg-white rounded-3xl shadow-sm p-6 mt-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-5">

                <div>
                    <h2 className="text-xl font-bold text-gray-800">
                        Top States
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        State wise order
                        performance
                    </p>
                </div>
            </div>

            {/* Empty State */}
            {topStates.length ===
                0 ? (

                <div className="min-h-[300px] flex flex-col items-center justify-center text-center">

                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">

                        <FaLocationDot className="text-3xl text-gray-400" />

                    </div>

                    <h3 className="text-xl font-semibold text-gray-700">
                        No Record Found
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                        No state analytics
                        available
                    </p>

                </div>

            ) : (

                <div className="space-y-4">

                    {topStates.map(
                        (
                            state: any,
                            index: number
                        ) => (

                            <div
                                key={index}
                                className="flex items-center justify-between border border-gray-100 rounded-2xl p-4 hover:bg-gray-50 transition"
                            >

                                {/* Left */}
                                <div className="flex items-center gap-4">

                                    <div className="w-14 h-14 rounded-2xl bg-[#0ea5e9]/10 flex items-center justify-center">

                                        <FaLocationDot className="text-[#0ea5e9] text-xl" />

                                    </div>

                                    <div>

                                        <h3 className="font-semibold text-gray-800">
                                            {
                                                state.state
                                            }
                                        </h3>

                                        <p className="text-sm text-gray-500 mt-1">
                                            {
                                                state.orders
                                            }{" "}
                                            Orders
                                        </p>

                                    </div>
                                </div>

                                {/* Right */}
                                <div className="text-right">

                                    <h4 className="font-bold text-gray-800">
                                        ₹
                                        {state.revenue.toLocaleString()}
                                    </h4>

                                    <p className="text-sm  font-medium mt-1">
                                        Revenue
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

export default TopStates;