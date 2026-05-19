"use client";

import Image from "next/image";
import {
    Heart,
    ShoppingCart,
    Trash2,
    Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

const Wishlist = () => {
    const { data: session } = useSession();
    const [wishlist, setWishlist] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<any>();
    const { addToCart } = useCart();
    const router = useRouter();


    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch(`/api/users/${session?.user.id}`);
                const data = await res.json();

                setCurrentUser(data.data || []);
            } catch (error) {
                console.log(error);
            }
        };

        fetchOrders();
    }, [session]);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const res = await fetch("/api/products");
                const data = await res.json();

                const wishlistIds = currentUser?.wishlist || [];

                // filter only wishlist products
                const wishlistProducts = data.filter((product: any) =>
                    wishlistIds.includes(product.id)
                );

                console.log(wishlistIds, 'wishlistIds');



                setWishlist(wishlistProducts || []);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, [currentUser]);


    const handleAddToCart = (item: any) => {
        // @ts-ignore
        addToCart({
            id: item?.id,
            name: item?.name,
            price:
                typeof item?.price === "string"
                    ? Number(item?.price.replace(/[^\d]/g, ""))
                    : item?.price,
            image: item?.image || item?.images?.[0] || "",
        });

        // enqueueSnackbar("Added to cart", {
        //     variant: "success",
        //     anchorOrigin: {
        //         vertical: "bottom",
        //         horizontal: "right",
        //     },
        //     autoHideDuration: 1500,
        // });
    };

    const removeWishlist = async (productId: string) => {
        try {
            // remove product id from user wishlist
            const updatedWishlist = currentUser?.wishlist?.filter(
                (id: string) => id !== productId
            );

            // update user
            await fetch(`/api/users/${session?.user.id}`, {
                method: "PUT", // or PATCH
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...currentUser,
                    wishlist: updatedWishlist,
                }),
            });

            // update local state
            setCurrentUser((prev: any) => ({
                ...prev,
                wishlist: updatedWishlist,
            }));

            setWishlist((prev) =>
                prev.filter((item) => item.id !== productId)
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-[#f7f2eb] px-4 py-8 text-black">
            {/* Main Container */}
            <div className="mx-auto max-w-7xl rounded-[36px] bg-[#f8f4ee]/80 p-4 backdrop-blur-xl md:p-8">
                {/* Heading */}
                <section className="mt-12">
                    <h2 className="text-5xl font-serif tracking-tight md:text-6xl">
                        Your Wishlist
                    </h2>

                    <p className="mt-3 text-lg text-black/60">
                        Saved products for later (
                        {wishlist.length} items)
                    </p>
                </section>

                {/* Loading */}
                {loading && (
                    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[1, 2, 3, 4].map((_, index) => (
                            <div
                                key={index}
                                className="animate-pulse overflow-hidden rounded-[28px] border border-black/10 bg-white p-3"
                            >
                                <div className="h-[260px] rounded-[22px] bg-black/5" />

                                <div className="mt-4 h-6 rounded bg-black/5" />

                                <div className="mt-3 h-4 w-2/3 rounded bg-black/5" />

                                <div className="mt-5 h-10 rounded bg-black/5" />
                            </div>
                        ))}
                    </div>
                )}

                {/* Wishlist Grid */}
                {!loading && wishlist.length > 0 && (
                    <section className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {wishlist.map((item) => (
                            <div
                                key={item.id}
                                className="group overflow-hidden rounded-[28px] border border-black/10 bg-[#fcfaf7] p-3 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
                            >
                                {/* Product Image */}
                                <div className="relative overflow-hidden rounded-[22px] bg-[#ece4db]">
                                    <div className="relative h-[260px] w-full">
                                        <Image
                                            src={
                                                item.images?.[0]
                                            }
                                            alt={item.name}
                                            fill
                                            className="object-cover transition duration-700 group-hover:scale-105"
                                        />
                                    </div>

                                    {/* Badge */}
                                    {item.badge && (
                                        <div className="absolute left-3 top-3 rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
                                            {item.badge}
                                        </div>
                                    )}

                                    {/* Wishlist Icon */}
                                    {/* <button className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/90 shadow-sm backdrop-blur-xl transition hover:scale-110">
                                        <Heart
                                            size={18}
                                            className="fill-black stroke-[1.8]"
                                        />
                                    </button> */}
                                </div>

                                {/* Content */}
                                <div className="px-2 pb-2 pt-4">
                                    {/* Category */}
                                    <p className="text-xs uppercase tracking-[0.2em] text-black/40">
                                        {item.category}
                                    </p>

                                    {/* Name */}
                                    <h3 className="mt-2 line-clamp-2 text-xl font-semibold leading-snug">
                                        {item.name}
                                    </h3>

                                    {/* Description */}
                                    <p className="mt-2 line-clamp-2 text-sm text-black/50">
                                        {item.description}
                                    </p>

                                    {/* Rating */}
                                    <div className="mt-4 flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map(
                                            (star) => (
                                                <Star
                                                    key={star}
                                                    size={14}
                                                    className="fill-[#d4a84f] text-[#d4a84f]"
                                                />
                                            )
                                        )}

                                        <span className="ml-2 text-xs text-black/40">
                                            (5.0)
                                        </span>
                                    </div>

                                    {/* Price */}
                                    <div className="mt-4 flex items-end justify-between">
                                        <div className="flex items-end gap-2">
                                            <p className="text-3xl font-bold">
                                                ₹
                                                {Number(
                                                    item.price
                                                ).toLocaleString()}
                                            </p>

                                            <span className="pb-1 text-sm text-black/40 line-through">
                                                ₹
                                                {Number(
                                                    item.original_price
                                                ).toLocaleString()}
                                            </span>
                                        </div>

                                        {/* Stock */}
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${item.stock > 0
                                                ? "bg-[#dff2df] text-[#2f6b2f]"
                                                : "bg-red-100 text-red-600"
                                                }`}
                                        >
                                            {item.stock > 0
                                                ? "In Stock"
                                                : "Out of Stock"}
                                        </span>
                                    </div>

                                    {/* Buttons */}
                                    <div className="mt-5 flex gap-3">
                                        <button onClick={() => handleAddToCart(item)} className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-black px-4 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:opacity-90">
                                            <ShoppingCart
                                                size={16}
                                            />
                                            Add to Cart
                                        </button>

                                        <button
                                            onClick={() => removeWishlist(item.id)}
                                            className="flex items-center justify-center rounded-2xl border border-red-100 bg-white px-4 py-3  shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-white hover:shadow-lg"
                                        >
                                            <Heart
                                                size={18}
                                                className="fill-black stroke-[1.8]"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>
                )}

                {/* Empty State */}
                {!loading && wishlist.length === 0 && (
                    <div className="flex min-h-[500px] flex-col items-center justify-center">
                        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-sm">
                            <Heart
                                size={54}
                                className="stroke-[1.3] text-black/20"
                            />
                        </div>

                        <h3 className="mt-8 text-4xl font-serif">
                            Your wishlist is empty
                        </h3>

                        <p className="mt-3 max-w-md text-center text-black/50">
                            Save products you love and
                            revisit them anytime from your
                            wishlist.
                        </p>

                        <button onClick={() => router.push("/collections")} className="mt-8 rounded-full bg-black px-8 py-4 text-white transition-all duration-300 hover:scale-[1.02] hover:opacity-90">
                            Continue Shopping
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;