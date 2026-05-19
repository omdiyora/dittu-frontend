"use client";

import React, { useMemo } from "react";
import Image from "next/image";

import { FaBoxOpen } from "react-icons/fa6";

const TopProducts = ({
    ordersLists,
    products,
}: any) => {

    /* ================= TOP PRODUCTS ================= */

    const topProducts = useMemo(() => {

        const productMap: Record<
            string,
            any
        > = {};

        ordersLists.forEach(
            (order: any) => {

                order.items.forEach(
                    (item: any) => {

                        const product =
                            products.find(
                                (p: any) =>
                                    p.id ===
                                    item.id
                            );

                        if (!product) return;

                        if (
                            !productMap[
                            item.id
                            ]
                        ) {
                            productMap[
                                item.id
                            ] = {
                                id: item.id,
                                name: item.name,
                                image:
                                    item.image,
                                category:
                                    product.category,
                                totalSold: 0,
                                revenue: 0,
                            };
                        }

                        productMap[
                            item.id
                        ].totalSold +=
                            item.quantity;

                        productMap[
                            item.id
                        ].revenue +=
                            item.price *
                            item.quantity;
                    }
                );
            }
        );

        return Object.values(
            productMap
        )
            .sort(
                (
                    a: any,
                    b: any
                ) =>
                    b.totalSold -
                    a.totalSold
            )
            .slice(0, 5);

    }, [ordersLists, products]);

    return (
        <div className="bg-white rounded-3xl shadow-sm p-6 mt-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-5">

                <div>
                    <h2 className="text-xl font-bold text-gray-800">
                        Top Products
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Best selling
                        product overview
                    </p>
                </div>
            </div>

            {/* Empty State */}
            {topProducts.length ===
                0 ? (

                <div className="min-h-[300px] flex flex-col items-center justify-center text-center">

                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">

                        <FaBoxOpen className="text-3xl text-gray-400" />

                    </div>

                    <h3 className="text-xl font-semibold text-gray-700">
                        No Record Found
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                        No product sales
                        available
                    </p>

                </div>

            ) : (

                <div className="space-y-4">

                    {topProducts.map(
                        (
                            product: any,
                            index: number
                        ) => (

                            <div
                                key={
                                    product.id
                                }
                                className="flex items-center justify-between border border-gray-100 rounded-2xl p-4 hover:bg-gray-50 transition"
                            >

                                {/* Left */}
                                <div className="flex items-center gap-4">

                                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gray-100">

                                        <Image
                                            src={
                                                product.image
                                            }
                                            alt={
                                                product.name
                                            }
                                            fill
                                            className="object-cover"
                                        />

                                    </div>

                                    <div>

                                        <h3 className="font-semibold text-gray-800 line-clamp-1">
                                            {
                                                product.name
                                            }
                                        </h3>

                                        <p className="text-sm text-gray-500 mt-1">
                                            {
                                                product.category
                                            }
                                        </p>

                                    </div>
                                </div>

                                {/* Right */}
                                <div className="text-right">

                                    <h4 className="font-bold text-gray-800">
                                        {
                                            product.totalSold
                                        }{" "}
                                        Sold
                                    </h4>
                                </div>

                            </div>
                        )
                    )}

                </div>

            )}
        </div>
    );
};

export default TopProducts;