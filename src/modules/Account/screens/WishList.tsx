"use client";

import { useState } from "react";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";

const WishList = () => {
    const [wishlist, setWishlist] = useState([
        {
            id: 1,
            name: "L'Oréal Xtenso Shampoo",
            price: "₹499",
            image: "https://via.placeholder.com/150",
        },
        {
            id: 2,
            name: "Hair Serum Professional",
            price: "₹799",
            image: "https://via.placeholder.com/150",
        },
    ]);

    const removeItem = (id: number) => {
        setWishlist(wishlist.filter((item) => item.id !== id));
    };

    return (
        <div className="min-h-screen bg-[#fcfaf7] py-10">
            <div className="max-w-6xl mx-auto px-4">

                {/* HEADER */}
                <div className="flex items-center gap-2 mb-6">
                    <Heart className="text-red-500" />
                    <h1 className="text-2xl font-semibold">
                        Your Wishlist ({wishlist.length})
                    </h1>
                </div>

                {/* EMPTY STATE */}
                {wishlist.length === 0 && (
                    <div className="bg-white p-10 text-center rounded-lg border">
                        <p className="text-gray-500 mb-3">
                            Your wishlist is empty 💔
                        </p>
                        <button className="bg-black text-white px-5 py-2 rounded">
                            Continue Shopping
                        </button>
                    </div>
                )}

                {/* LIST */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-lg border p-4 hover:shadow-md transition"
                        >
                            {/* IMAGE */}
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-40 object-cover rounded"
                            />

                            {/* INFO */}
                            <div className="mt-3">
                                <h2 className="font-medium text-gray-900 text-sm line-clamp-2">
                                    {item.name}
                                </h2>

                                <p className="text-lg font-semibold mt-1">
                                    {item.price}
                                </p>
                            </div>

                            {/* ACTIONS */}
                            <div className="flex flex-col gap-2 mt-4">

                                {/* MOVE TO CART */}
                                <button className="flex items-center justify-center gap-2 bg-black text-white py-2 rounded text-sm hover:opacity-90">
                                    <ShoppingCart size={16} />
                                    Add to Cart
                                </button>

                                {/* REMOVE */}
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="flex items-center justify-center gap-2 border py-2 rounded text-sm hover:bg-gray-100"
                                >
                                    <Trash2 size={16} />
                                    Remove
                                </button>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default WishList;