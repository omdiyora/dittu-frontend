"use client";

import React from "react";
import { useSession } from "next-auth/react";
import {
  FaArrowTrendUp,
  FaArrowTrendDown,
  FaUsers,
  FaWallet,
  FaBoxOpen,
} from "react-icons/fa6";
import {
  ShoppingBag,
  PackageCheck,
  Clock3,
  Star,
} from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "₹1,24,500",
    growth: "+12.5%",
    up: true,
    icon: <FaWallet />,
    bg: "bg-pink-100",
    iconColor: "text-pink-600",
  },
  {
    title: "Total Orders",
    value: "1,248",
    growth: "+8.2%",
    up: true,
    icon: <ShoppingBag size={20} />,
    bg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Customers",
    value: "842",
    growth: "+5.1%",
    up: true,
    icon: <FaUsers />,
    bg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    title: "Products",
    value: "126",
    growth: "-1.4%",
    up: false,
    icon: <FaBoxOpen />,
    bg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
];

const recentOrders = [
  {
    id: "#1001",
    customer: "Priya Sharma",
    amount: "₹1,499",
    status: "Delivered",
  },
  {
    id: "#1002",
    customer: "Rahul Patel",
    amount: "₹799",
    status: "Pending",
  },
  {
    id: "#1003",
    customer: "Anjali Mehta",
    amount: "₹2,199",
    status: "Shipped",
  },
  {
    id: "#1004",
    customer: "Karan Verma",
    amount: "₹599",
    status: "Cancelled",
  },
];

const topProducts = [
  {
    name: "Hydrating Moisturiser",
    sold: 120,
    revenue: "₹45,000",
  },
  {
    name: "Vitamin C Serum",
    sold: 98,
    revenue: "₹39,500",
  },
  {
    name: "Aloe Face Wash",
    sold: 85,
    revenue: "₹25,000",
  },
];

const AdminDashboard = () => {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-[#f8f8fb] p-4 md:p-6">
      {/* ================= HEADER ================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, {session?.user?.first_name} 👋
          </h1>

          <p className="text-gray-500 mt-1">
            Here’s what’s happening with your store today.
          </p>
        </div>

        <button className="bg-black text-white px-5 py-3 rounded-2xl text-sm font-medium hover:opacity-90 transition">
          Download Report
        </button>
      </div>

      {/* ================= STATS ================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{item.title}</p>

                <h2 className="text-3xl font-bold mt-2 text-gray-800">
                  {item.value}
                </h2>
              </div>

              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl ${item.bg} ${item.iconColor}`}
              >
                {item.icon}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              {item.up ? (
                <FaArrowTrendUp className="text-green-500" />
              ) : (
                <FaArrowTrendDown className="text-red-500" />
              )}

              <span
                className={`text-sm font-medium ${
                  item.up ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.growth}
              </span>

              <span className="text-gray-400 text-sm">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MAIN GRID ================= */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* ================= SALES CHART ================= */}

        <div className="xl:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Revenue Overview
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                Monthly revenue performance
              </p>
            </div>

            <div className="bg-pink-100 text-pink-600 px-4 py-2 rounded-xl text-sm font-medium">
              +18.4%
            </div>
          </div>

          {/* Fake Chart */}
          <div className="h-[320px] flex items-end gap-4">
            {[40, 70, 55, 90, 65, 120, 95].map((height, index) => (
              <div key={index} className="flex-1">
                <div
                  className="bg-gradient-to-t from-pink-500 to-pink-300 rounded-t-2xl w-full"
                  style={{ height: `${height * 2}px` }}
                />

                <p className="text-center text-xs text-gray-400 mt-2">
                  {
                    ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][
                      index
                    ]
                  }
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= ORDER STATUS ================= */}

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Order Status
          </h2>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center">
                  <Clock3 className="text-yellow-600" size={20} />
                </div>

                <div>
                  <p className="font-medium text-gray-700">Pending</p>
                  <p className="text-sm text-gray-400">24 Orders</p>
                </div>
              </div>

              <span className="text-yellow-600 font-semibold">24</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <PackageCheck className="text-blue-600" size={20} />
                </div>

                <div>
                  <p className="font-medium text-gray-700">Shipped</p>
                  <p className="text-sm text-gray-400">58 Orders</p>
                </div>
              </div>

              <span className="text-blue-600 font-semibold">58</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                  <ShoppingBag className="text-green-600" size={20} />
                </div>

                <div>
                  <p className="font-medium text-gray-700">Delivered</p>
                  <p className="text-sm text-gray-400">142 Orders</p>
                </div>
              </div>

              <span className="text-green-600 font-semibold">142</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM GRID ================= */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
        {/* ================= RECENT ORDERS ================= */}

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 overflow-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Recent Orders
            </h2>

            <button className="text-sm text-pink-600 font-medium">
              View All
            </button>
          </div>

          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm border-b">
                <th className="pb-3">Order</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((order, index) => (
                <tr
                  key={index}
                  className="border-b last:border-none text-sm"
                >
                  <td className="py-4 font-semibold text-gray-700">
                    {order.id}
                  </td>

                  <td className="py-4 text-gray-600">
                    {order.customer}
                  </td>

                  <td className="py-4 font-medium text-gray-700">
                    {order.amount}
                  </td>

                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-600"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : order.status === "Shipped"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ================= TOP PRODUCTS ================= */}

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Top Products
            </h2>

            <Star className="text-yellow-500" />
          </div>

          <div className="space-y-5">
            {topProducts.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-pink-100 flex items-center justify-center">
                    🌸
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700">
                      {product.name}
                    </h3>

                    <p className="text-sm text-gray-400">
                      {product.sold} Sold
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-gray-800">
                    {product.revenue}
                  </p>

                  <p className="text-sm text-green-600">
                    +12%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;