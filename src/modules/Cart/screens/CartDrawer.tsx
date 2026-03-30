'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export default function CartDrawer({ isOpen, onClose }: Props) {
    const [qty, setQty] = useState(3);

    const [openSection, setOpenSection] = useState<string | null>(null);

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <>
            {/* OVERLAY */}
            <div
                className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                onClick={onClose}
            />

            {/* DRAWER */}
            <div
                className={`fixed top-0 right-0 h-full w-[400px] bg-white z-50 shadow-xl transform transition-transform duration-300 flex flex-col
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* HEADER */}
                <div className="flex items-center justify-between px-5 py-4 border-b">
                    <h2 className="text-lg font-medium">Your cart (3)</h2>
                    <button onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* CONTENT */}
                <div className="flex-1 overflow-y-auto px-5 py-4">
                    {/* PRODUCT */}
                    <div className="flex gap-4 items-start">

                        {/* IMAGE */}
                        <img
                            src="https://via.placeholder.com/60"
                            className="w-16 h-16 object-cover rounded-md bg-[#f5f3f0]"
                            alt="product"
                        />

                        {/* CONTENT */}
                        <div className="flex-1">

                            {/* TITLE + PRICE */}
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 leading-tight">
                                        Intense Repair Body Cream
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-1">Size: 45ml</p>
                                </div>

                                <p className="text-sm text-gray-900">$150.00</p>
                            </div>

                            {/* QUANTITY + REMOVE */}
                            <div className="flex items-center justify-between mt-3">

                                {/* QUANTITY BOX (ROUNDED PILL) */}
                                <div className="flex items-center border rounded-full px-3 py-1 gap-3">
                                    <button
                                        onClick={() => setQty(Math.max(1, qty - 1))}
                                        className="text-sm text-gray-600 hover:text-black"
                                    >
                                        −
                                    </button>

                                    <span className="text-sm">{qty}</span>

                                    <button
                                        onClick={() => setQty(qty + 1)}
                                        className="text-sm text-gray-600 hover:text-black"
                                    >
                                        +
                                    </button>
                                </div>

                                {/* REMOVE */}
                                <button className="text-xs text-gray-500 underline hover:text-black">
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t px-5 py-4 space-y-4">

                    {/* ACCORDION: ORDER NOTE */}
                    <div className="border-b pb-3">
                        <button
                            onClick={() => toggleSection('note')}
                            className="w-full flex justify-between items-center text-sm font-medium"
                        >
                            Add order note
                            <span>{openSection === 'note' ? '-' : '+'}</span>
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 ${openSection === 'note' ? 'max-h-40 mt-3' : 'max-h-0'
                                }`}
                        >
                            <textarea
                                className="w-full border rounded p-2 text-sm"
                                placeholder="Add a note to your order"
                            />
                        </div>
                    </div>

                    {/* ACCORDION: DISCOUNT */}
                    <div className="border-b pb-3">
                        <button
                            onClick={() => toggleSection('discount')}
                            className="w-full flex justify-between items-center text-sm font-medium"
                        >
                            Add discount code
                            <span>{openSection === 'discount' ? '-' : '+'}</span>
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 ${openSection === 'discount' ? 'max-h-40 mt-3' : 'max-h-0'
                                }`}
                        >
                            <input
                                type="text"
                                placeholder="Enter discount code here"
                                className="w-full border rounded px-3 py-2 text-sm"
                            />
                            <button className="w-full mt-3 bg-black text-white py-2 rounded-full">
                                APPLY
                            </button>
                        </div>
                    </div>

                    {/* SUBTOTAL */}
                    <div className="flex justify-between text-sm">
                        <span>Subtotal:</span>
                        <span>$90.00</span>
                    </div>

                    <p className="text-xs text-gray-500">
                        Taxes and shipping calculated at checkout
                    </p>

                    {/* BUTTONS */}
                    <div className="flex gap-3">
                        <Link href="/cart" className="flex-1">
                            <button className="w-full border py-3 rounded-full hover:bg-gray-100 transition">
                                VIEW CART
                            </button>
                        </Link>
                        <button className="flex-1 bg-black text-white py-3 rounded-full hover:opacity-90 transition">
                            CHECK OUT
                        </button>
                    </div>
                </div>

                {/* FOOTER */}
                {/* <div className="border-t px-5 py-4 space-y-4">
                    <div className="flex justify-between text-sm">
                        <span>Subtotal:</span>
                        <span>$90.00</span>
                    </div>

                    <p className="text-xs text-gray-500">
                        Taxes and shipping calculated at checkout
                    </p>

                    <div className="flex gap-3">
                        <button className="flex-1 border py-3 rounded-lg hover:bg-gray-100 transition">
                            VIEW CART
                        </button>
                        <button className="flex-1 bg-black text-white py-3 rounded-lg hover:opacity-90 transition">
                            CHECK OUT
                        </button>
                    </div>
                </div> */}
            </div>
        </>
    );
}