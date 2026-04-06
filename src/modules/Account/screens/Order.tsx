"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Select, SelectItem } from "@heroui/react";
import { ChevronDown } from "lucide-react";
const orders = [
    {
        id: "405-1701930-8757958",
        date: "2025-06-20",
        total: "₹2,163.00",
        customer: "Om Diyora",
        status: "delivered",
        products: [
            {
                name: "Ben Gay Ultra Strength Pain Relief Cream -113 g",
                image: "https://via.placeholder.com/80",
            },
        ],
    },
    {
        id: "402-0760933-8708301",
        date: "2025-04-30",
        total: "₹1,925.00",
        customer: "Rohini Borana",
        status: "pending",
        products: [
            {
                name: "L'Oréal Professionnel Xtenso Shampoo 250ml",
                image: "https://via.placeholder.com/80",
            },
            {
                name: "L'Oréal Xtenso Serum 50ml",
                image: "https://via.placeholder.com/80",
            },
            {
                name: "L'Oréal Xtenso Hair Masque 196g",
                image: "https://via.placeholder.com/80",
            },
        ],
    },
];

const Order = () => {
    const router = useRouter();

    const [activeTab, setActiveTab] = useState("orders");
    const [timeFilter, setTimeFilter] = useState("30");

    // 🔍 FILTER LOGIC
    const filteredOrders = orders.filter((order) => {
        const orderDate = new Date(order.date);
        const now = new Date();

        const diffDays =
            (now.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24);

        // ⏳ TIME FILTER
        if (timeFilter === "30" && diffDays > 30) return false;
        if (timeFilter === "90" && diffDays > 90) return false;
        if (timeFilter === "365" && diffDays > 365) return false;

        // 📦 TAB FILTER
        if (activeTab === "not_shipped" && order.status !== "pending")
            return false;

        if (activeTab === "buy_again" && order.status !== "delivered")
            return false;

        return true;
    });

    return (
        <div className="min-h-screen bg-[#fcfaf7] py-10">
            <div className="max-w-5xl mx-auto px-4">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Your Orders</h1>

                    {/* SEARCH */}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Search all orders"
                            className="border rounded px-3 py-2 text-sm w-64"
                        />
                        <button className="bg-black text-white px-4 py-2 rounded text-sm">
                            Search Orders
                        </button>
                    </div>
                </div>

                {/* TABS */}
                <div className="flex gap-6 border-b pb-2 mb-4 text-sm">
                    <button
                        onClick={() => setActiveTab("orders")}
                        className={`pb-1 ${activeTab === "orders"
                            ? "font-semibold border-b-2 border-black"
                            : "text-gray-500"
                            }`}
                    >
                        Orders
                    </button>

                    <button
                        onClick={() => setActiveTab("buy_again")}
                        className={`pb-1 ${activeTab === "buy_again"
                            ? "font-semibold border-b-2 border-black"
                            : "text-gray-500"
                            }`}
                    >
                        Buy Again
                    </button>

                    <button
                        onClick={() => setActiveTab("not_shipped")}
                        className={`pb-1 ${activeTab === "not_shipped"
                            ? "font-semibold border-b-2 border-black"
                            : "text-gray-500"
                            }`}
                    >
                        Not Yet Shipped
                    </button>
                </div>

                {/* FILTER */}
                <div className="flex items-center gap-3 mb-4 text-sm">
                    <span className="font-semibold">
                        {filteredOrders.length} orders placed in
                    </span>

                    <Select
                        selectedKeys={[timeFilter]}
                        onSelectionChange={(keys) => {
                            const value = Array.from(keys)[0] as string;
                            setTimeFilter(value);
                        }}
                        className="w-[180px]"
                        size="sm"
                        variant="bordered"

                        // ✅ ICON OVERRIDE
                        selectorIcon={<ChevronDown size={16} />}
                    >
                        <SelectItem key="30">last 30 days</SelectItem>
                        <SelectItem key="90">last 3 months</SelectItem>
                        <SelectItem key="365">last year</SelectItem>
                    </Select>
                </div>

                {/* ORDERS */}
                {filteredOrders.length === 0 && (
                    <div className="bg-white p-6 rounded border text-center text-gray-500">
                        No orders found
                    </div>
                )}

                {filteredOrders.map((order, index) => (
                    <div
                        key={index}
                        className="bg-white border rounded-lg mb-6 overflow-hidden"
                    >
                        {/* ORDER HEADER */}
                        <div className="bg-gray-50 p-4 flex justify-between text-sm">
                            <div className="flex gap-10">
                                <div>
                                    <p className="text-gray-500">ORDER PLACED</p>
                                    <p>{new Date(order.date).toDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">TOTAL</p>
                                    <p>{order.total}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">SHIP TO</p>
                                    <p className="text-blue-600 cursor-pointer">
                                        {order.customer}
                                    </p>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="text-gray-500">
                                    ORDER #{order.id}
                                </p>
                                <p className="text-blue-600 cursor-pointer text-sm">
                                    View order details
                                </p>
                            </div>
                        </div>

                        {/* PRODUCTS */}
                        <div className="p-4 space-y-4">
                            {order.products.map((product, i) => (
                                <div key={i} className="flex gap-4 items-center">

                                    {/* IMAGE */}
                                    <img
                                        src={product.image}
                                        alt="product"
                                        className="w-[70px] h-[70px] rounded border object-cover"
                                    />

                                    {/* INFO */}
                                    <div className="flex-1">
                                        <p className="text-blue-600 text-sm cursor-pointer">
                                            {product.name}
                                        </p>

                                        <p className="text-xs text-gray-500 mt-1">
                                            {order.status === "pending"
                                                ? "Not shipped yet"
                                                : "Delivered"}
                                        </p>

                                        {/* ACTIONS */}
                                        <div className="flex gap-3 mt-2">
                                            <button className="border px-3 py-1 rounded-full text-sm hover:bg-gray-100">
                                                Buy it again
                                            </button>
                                            <button className="border px-3 py-1 rounded-full text-sm hover:bg-gray-100">
                                                View your item
                                            </button>
                                        </div>
                                    </div>

                                    {/* REVIEW */}
                                    <button className="border px-4 py-2 rounded-full text-sm hover:bg-gray-100">
                                        Write a product review
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Order;