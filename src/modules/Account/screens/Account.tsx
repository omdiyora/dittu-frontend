"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import {
    Package,
    Shield,
    Settings,
    MapPin,
    Briefcase,
    Headphones,
    Heart,
    ShoppingCart,
    ArrowRight,
} from "lucide-react";

import { useCart } from "@/context/CartContext";

const accountItems = [
    {
        title: "Admin Dashboard",
        description:
            "Access admin analytics and store management.",
        icon: Briefcase,
        route: "/admin/product",
        adminOnly: true,
        badge: "Admin",
        gradient:
            "from-[#f3f3f3] via-[#f7f7f7] to-[#ebebeb]",
    },

    {
        title: "Orders",
        description:
            "Track, manage and review your recent purchases.",
        icon: Package,
        route: "/account/orders",
        badge: "Orders",
        gradient:
            "from-[#f7efe3] via-[#f8f5f0] to-[#efe7db]",
    },
    {
        title: "Wishlist",
        description:
            "Save your favorite products for later shopping.",
        icon: Heart,
        route: "/account/wishlist",
        badge: "Wishlist",
        gradient:
            "from-[#f7f2ec] via-[#faf8f4] to-[#f0ebe3]",
    },
    {
        title: "Profile & Security",
        description:
            "Manage addresses, password, login security and account settings.",
        icon: Shield,
        route: "/account/manage",
        gradient:
            "from-[#f8f6f3] via-[#ffffff] to-[#f1ede7]",
    },
    {
        title: "Cart",
        description:
            "Review products and continue checkout easily.",
        icon: ShoppingCart,
        route: "/cart",
        badge: "Cart",
        gradient:
            "from-[#f6f3ef] via-[#faf9f7] to-[#efeae3]",
    },

    {
        title: "Support Center",
        description:
            "Contact support and get help with your orders.",
        icon: Headphones,
        route: "/contact",
        gradient:
            "from-[#f7f3ee] via-[#faf8f5] to-[#eee7df]",
    },
];

const Account = () => {
    const { data: session, status } =
        useSession();

    const router = useRouter();

    const { cart } = useCart();

    // Loading
    if (status === "loading") {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f7f3ee]">
                <div className="h-12 w-12 animate-spin rounded-full border-2 border-black border-t-transparent" />
            </div>
        );
    }

    // Admin Check
    const isAdmin =
        session?.user?.role === "admin";

    // Filter
    const filteredItems = accountItems.filter(
        (item) =>
            !item.adminOnly || isAdmin
    );

    const getBadgeValue = (
        title: string
    ) => {
        switch (title) {
            case "Cart":
                return `Cart ${cart?.length || 0}`;

            case "Wishlist":
                return `Wishlist ${0}`;

            case "Orders":
                return "Orders";

            default:
                return "";
        }
    };

    return (
        <div className="min-h-screen bg-[#f7f3ee] px-4 py-6 text-black sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-4xl font-serif tracking-tight sm:text-5xl">
                        My Account
                    </h1>

                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-black/55 sm:text-base">
                        Manage your orders,
                        wishlist, cart, addresses,
                        and account settings in one
                        elegant place.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {filteredItems.map(
                        (item, index) => {
                            const Icon = item.icon;

                            return (
                                <button
                                    key={index}
                                    onClick={() =>
                                        router.push(
                                            item.route
                                        )
                                    }
                                    className={`group relative overflow-hidden rounded-[32px] border border-white/60 bg-gradient-to-br ${item.gradient} p-6 text-left shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]`}
                                >
                                    {/* Glow */}
                                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-3xl transition-all duration-500 group-hover:scale-125" />

                                    {/* Badge */}
                                    {(item.badge ||
                                        item.adminOnly) && (
                                            <div className="absolute right-5 top-5 rounded-full bg-black px-3 py-1 text-[11px] font-medium tracking-wide text-white shadow-lg">
                                                {item.adminOnly
                                                    ? "Admin"
                                                    : getBadgeValue(
                                                        item.title
                                                    )}
                                            </div>
                                        )}

                                    {/* Content */}
                                    <div className="relative z-10 flex h-full flex-col">
                                        {/* Icon */}
                                        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-black/5 bg-white/70 shadow-sm backdrop-blur-xl">
                                            <Icon
                                                size={
                                                    24
                                                }
                                                className="stroke-[1.8]"
                                            />
                                        </div>

                                        {/* Text */}
                                        <div className="mt-8">
                                            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                                {
                                                    item.title
                                                }
                                            </h2>

                                            <p className="mt-3 text-sm leading-relaxed text-black/55">
                                                {
                                                    item.description
                                                }
                                            </p>
                                        </div>

                                        {/* Arrow */}
                                        <div className="mt-10 flex justify-end">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/5 bg-white/70 shadow-sm backdrop-blur-xl transition-all duration-300 group-hover:translate-x-1 group-hover:bg-black group-hover:text-white">
                                                <ArrowRight
                                                    size={
                                                        18
                                                    }
                                                    className="stroke-[2]"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Border Glow */}
                                    <div className="absolute inset-0 rounded-[32px] border border-white/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                </button>
                            );
                        }
                    )}
                </div>
            </div>
        </div>
    );
};

export default Account;