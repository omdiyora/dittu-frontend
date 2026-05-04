'use client';

import { useState } from 'react';
import { useRouter } from "next/navigation";
import { useCart } from '@/context/CartContext';

export default function Cart() {
    const router = useRouter();
    const [open, setOpen] = useState<string | null>(null);

    const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();

    const subtotal = cart.reduce(
        (acc: number, item: any) => acc + item.price * item.quantity,
        0
    );

    return (
        <div className="bg-[#f5f3f0] min-h-screen px-4 md:px-12 py-10">

            {/* HEADER */}
            <div className="max-w-6xl mx-auto flex justify-between items-center mb-8">
                <h1 className="text-xl md:text-2xl font-medium">Your cart</h1>

                <button
                    onClick={() => router.push("/collections")}
                    className="text-xs md:text-sm underline underline-offset-4"
                >
                    CONTINUE SHOPPING
                </button>
            </div>

            {/* TABLE HEADER (Desktop only) */}
            <div className="hidden md:grid max-w-6xl mx-auto grid-cols-[1.5fr_1fr_1fr] text-xs pb-4 border-b border-gray-200">
                <span>PRODUCT</span>
                <span className="text-center">QUANTITY</span>
                <span className="text-right pr-2">TOTAL</span>
            </div>

            <div className="md:hidden md:grid max-w-6xl mx-auto grid-cols-[1.5fr_1fr_1fr] text-xs pb-4 border-b border-gray-200">
                <span>PRODUCT DETAILS</span>
            </div>

            {/* CART ITEMS */}
            {cart.map((item: any) => (
                <div
                    key={item.id}
                    className="max-w-6xl mx-auto border-t border-gray-200 py-6"
                >
                    <div className="flex flex-col md:grid md:grid-cols-[1.5fr_1fr_1fr] gap-4 md:items-center">

                        {/* PRODUCT */}
                        <div className="flex items-start gap-4">
                            <img
                                src={item.image}
                                className="w-20 h-20 object-cover rounded-md bg-[#f5f3f0]"
                                alt="product"
                            />

                            <div className="flex-1">
                                <h3 className="text-sm font-medium">{item.name}</h3>

                                <p className="text-sm mt-1">₹{item.price}</p>

                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-xs underline mt-2"
                                >
                                    REMOVE
                                </button>
                            </div>
                        </div>

                        {/* QUANTITY */}
                        <div className="flex justify-between md:justify-center items-center">
                            <span className="text-xs md:hidden">Qty</span>

                            <div className="flex items-center border border-gray-300 rounded-full px-5 py-1 gap-5">
                                <button onClick={() => decreaseQty(item.id)}>−</button>
                                <span className="text-sm">{item.quantity}</span>
                                <button onClick={() => increaseQty(item.id)}>+</button>
                            </div>
                        </div>

                        {/* TOTAL */}
                        <div className="flex justify-between md:block text-sm text-gray-900">
                            <span className="md:hidden">Total</span>
                            <span className="md:text-right block">
                                ₹{item.price * item.quantity}
                            </span>
                        </div>
                    </div>
                </div>
            ))}

            {/* BOTTOM SECTION */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">

                {/* LEFT SIDE */}
                <div>
                    <div className="border-t border-gray-200">

                        {/* ORDER NOTE */}
                        <div className="border-b border-gray-200 py-5">
                            <button
                                onClick={() => setOpen(open === 'note' ? null : 'note')}
                                className="w-full flex items-center justify-between text-xs tracking-wide"
                            >
                                <span className="uppercase">Add order note</span>
                                <span className="text-lg">
                                    {open === 'note' ? '−' : '+'}
                                </span>
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ${open === 'note' ? 'max-h-40 mt-4' : 'max-h-0'
                                    }`}
                            >
                                <textarea
                                    className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none"
                                    placeholder="Add your note here..."
                                />
                            </div>
                        </div>

                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex flex-col md:items-end">

                    {/* SUBTOTAL */}
                    <div className="text-left md:text-right mb-4">
                        <p className="text-sm text-gray-600">
                            Subtotal:
                            <span className="text-gray-900 ml-2">₹{subtotal}</span>
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                            Taxes and shipping calculated at checkout
                        </p>
                    </div>

                    {/* CHECKOUT BUTTON */}
                    <button
                        onClick={() => router.push("/checkout")}
                        className="w-full md:w-[320px] bg-black text-white py-3 rounded-full mb-3 hover:opacity-90 transition"
                    >
                        CHECK OUT
                    </button>
                </div>
            </div>
        </div>
    );
}