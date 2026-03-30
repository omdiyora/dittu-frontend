'use client';

import { useState } from 'react';

export default function Cart() {
    const [qty, setQty] = useState(5);
    const [open, setOpen] = useState<string | null>(null);

    return (
        <div className="bg-[#f5f3f0] min-h-screen px-6 md:px-12 py-12">


            {/* HEADER */}
            <div className="max-w-6xl mx-auto flex justify-between items-center mb-10">
                <h1 className="text-2xl font-medium tracking-tight">
                    Your cart
                </h1>
                <button className="text-sm underline underline-offset-4 hover:opacity-70">
                    CONTINUE SHOPPING
                </button>
            </div>
            <div className="max-w-6xl mx-auto grid grid-cols-[1.5fr_1fr_1fr] text-xs text-black pb-4 border-b border-gray-200">
                <span>PRODUCT</span>
                <span className="text-center">QUANTITY</span>
                <span className="text-right pr-2">TOTAL</span>
            </div>
            {/* MAIN GRID */}
            <div className="max-w-6xl mx-auto grid grid-cols-[1.5fr_1fr_1fr] items-center py-6 border-t border-gray-200">

                {/* PRODUCT */}
                <div className="flex items-center gap-5">
                    <img
                        src="https://via.placeholder.com/80"
                        className="w-20 h-20 bg-[#ebe8e4] rounded"
                    />

                    <div>
                        <h3 className="text-sm font-medium text-black">
                            Intense Repair Body Cream
                        </h3>

                        <p className="text-sm mt-1 text-black">$30.00</p>


                        <button className="text-xs underline mt-2 text-black hover:text-black">
                            REMOVE
                        </button>
                    </div>
                </div>

                {/* QUANTITY */}
                <div className="flex justify-center">
                    <div className="flex items-center border border-gray-300 rounded-full px-6 py-1.5 gap-6">
                        <button
                            onClick={() => setQty(Math.max(1, qty - 1))}
                            className="text-lg text-gray-600 hover:text-black"
                        >
                            −
                        </button>

                        <span className="text-sm">{qty}</span>

                        <button
                            onClick={() => setQty(qty + 1)}
                            className="text-lg text-gray-600 hover:text-black"
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* TOTAL */}
                <div className="text-right text-sm text-gray-900 pr-2">
                    $150.00
                </div>
            </div>
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 mt-10">

                {/* LEFT SIDE */}
                <div>
                    {/* ACCORDION */}
                    <div className="border-t border-gray-200">

                        {/* ORDER NOTE */}
                        <div className="border-b border-gray-200 py-5">

                            <button
                                onClick={() => setOpen(open === 'note' ? null : 'note')}
                                className="w-full flex items-center justify-between text-[13px] tracking-wide text-gray-900"
                            >
                                <span className="uppercase">Add order note</span>

                                <span className="text-xl leading-none">
                                    {open === 'note' ? '−' : '+'}
                                </span>
                            </button>

                            {/* CONTENT */}
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
                <div className="flex flex-col items-end">

                    {/* SUBTOTAL */}
                    <div className="text-right mb-4">
                        <p className="text-sm text-gray-600">
                            Subtotal: <span className="text-gray-900 ml-2">$150.00</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            Taxes and shipping calculated at checkout
                        </p>
                    </div>

                    {/* CHECKOUT BUTTON */}
                    <button className="w-[320px] bg-black text-white py-3 rounded-full mb-3 hover:opacity-90 transition">
                        CHECK OUT
                    </button>
                </div>
            </div>
        </div>
    );
}