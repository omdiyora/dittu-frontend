"use client";

import {
    LayoutDashboard,
    BarChart3,
    Users,
    FileText,
    Calendar,
    Shield,
    Settings,
    LogOut,
    Tag
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const topMenu = [
    {
        title: "Insights",
        items: [
            // { name: "Dashboard", icon: LayoutDashboard, route: "/admin/dashboard" },
            { name: "Analytics", icon: BarChart3, route: "/admin/analytics" },
        ],
    },
    {
        title: "Manage Business",
        items: [
            { name: "Product", icon: Tag, route: "/admin/product" },
            { name: "Users", icon: Users, route: "/admin/users" },
            { name: "Order", icon: FileText, route: "/admin/orders" },
            { name: "Reviews", icon: Calendar, route: "/admin/review" },
            { name: "Coupons", icon: Shield, route: "/admin/coupons" },
        ],
    },
];

const bottomMenu = {
    title: "Account Settings",
    items: [
        { name: "Settings", icon: Settings, route: "/login/user-setting" },
    ],
};

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        // Add logout logic here
        router.push("/login");
    };

    return (
        <aside className="w-64 h-screen bg-white border-r flex flex-col">
            {/* Logo */}
            <div className="p-5 text-xl font-bold border-b">
                DITTU Store
            </div>

            {/* Top Menu */}
            <div className="flex-1 overflow-y-auto px-3 py-4">
                {topMenu.map((section, i) => (
                    <div key={i} className="mb-6">
                        <p className="text-xs text-gray-400 uppercase tracking-wider px-2 mb-3">
                            {section.title}
                        </p>

                        {section.items.map((item, idx) => {
                            const Icon = item.icon;

                            const isActive =
                                pathname === item.route ||
                                pathname.startsWith(item.route + "/");

                            return (
                                <div
                                    key={idx}
                                    onClick={() => router.push(item.route)}
                                    className={`flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition mb-2
                  ${isActive
                                            ? "bg-black text-white shadow-sm"
                                            : "text-gray-600 hover:bg-gray-100"
                                        }`}
                                >
                                    <Icon size={18} />
                                    <span className="text-sm font-medium">{item.name}</span>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            {/* Bottom Section */}
            <div className="border-t p-3">
                <p className="text-xs text-gray-400 uppercase tracking-wider px-2 mb-3">
                    {bottomMenu.title}
                </p>

                {bottomMenu.items.map((item, idx) => {
                    const Icon = item.icon;

                    const isActive =
                        pathname === item.route ||
                        pathname.startsWith(item.route + "/");

                    return (
                        <div
                            key={idx}
                            onClick={() => router.push(item.route)}
                            className={`flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition mb-2
              ${isActive
                                    ? "bg-black text-white"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            <Icon size={18} />
                            <span className="text-sm font-medium">{item.name}</span>
                        </div>
                    );
                })}

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-500 hover:bg-red-50 transition"
                >
                    <LogOut size={18} />
                    <span className="text-sm font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}