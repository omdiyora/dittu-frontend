"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
    Package,
    Shield,
    Crown,
    MapPin,
    Briefcase,
    CreditCard,
    Wallet,
    Headphones,
    Heart,
    ShoppingCart
} from "lucide-react";

const accountItems = [
    {
        title: "Admin Dashboard",
        desc: "Manage products, orders, users",
        icon: Briefcase,
        route: "/admin/product",
        adminOnly: true,
    },
    {
        title: "Your Orders",
        desc: "Track, return, or buy things again",
        icon: Package,
        route: "/account/orders",
    },
    {
        title: "Login & Security",
        desc: "Edit login, name, and mobile number",
        icon: Shield,
        route: "/account/manage",
    },
    {
        title: "Your Addresses",
        desc: "Edit addresses for orders and gifts",
        icon: MapPin,
        route: "/account/address",
    },
    {
        title: "Wishlist",
        desc: "View and manage your saved items",
        icon: Heart,
        route: "/account/wishlist",
    },
    {
        title: "Cart",
        desc: "View items in your cart and checkout",
        icon: ShoppingCart,
        route: "/cart",
    },
    {
        title: "Contact Us",
        desc: "Customer service via phone or chat",
        icon: Headphones,
        route: "/contact",
    },
];

const Account = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    // ⏳ Loading state
    if (status === "loading") {
        return <div className="p-10">Loading...</div>;
    }

    // 🔐 Check Admin
    const isAdmin = session?.user?.role === "admin";

    // ✅ Filter items
    const filteredItems = accountItems.filter(
        (item) => !item.adminOnly || isAdmin
    );


    return (
        <div className="min-h-screen bg-[#fcfaf7] py-10">

            {/* ✅ CONTAINER */}
            <div className="max-w-6xl mx-auto px-4">

                {/* HEADER */}
                <h1 className="text-2xl font-semibold mb-6">
                    Your Account
                </h1>

                {/* GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredItems.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={index}
                                onClick={() => router.push(item.route)}
                                className="flex items-center justify-between p-5 bg-white rounded-lg border hover:shadow-md transition cursor-pointer"
                            >
                                <div className="flex items-center gap-4">

                                    {/* ICON */}
                                    <div className="p-3 bg-gray-100 rounded-full">
                                        <Icon className="w-6 h-6 text-gray-700" />
                                    </div>

                                    {/* TEXT */}
                                    <div>
                                        <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                                            {item.title}

                                            {/* 👑 Admin Badge */}
                                            {item.adminOnly && (
                                                <span className="text-xs bg-black text-white px-2 py-0.5 rounded">
                                                    Admin
                                                </span>
                                            )}
                                        </h2>

                                        <p className="text-sm text-gray-500">
                                            {item.desc}
                                        </p>
                                    </div>

                                </div>

                                {/* ➡ Arrow */}
                                <span className="text-gray-400">›</span>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
};

export default Account;