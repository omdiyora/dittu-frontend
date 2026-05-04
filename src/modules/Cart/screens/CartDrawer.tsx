'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export default function CartDrawer({ isOpen, onClose }: Props) {
    const [qty, setQty] = useState(3);
    const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();
    const [openSection, setOpenSection] = useState<string | null>(null);

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

    const subtotal = cart.reduce(
        (acc: any, item: any) => acc + item.price * item.quantity,
        0
    );

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
                className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-xl transform transition-transform duration-300 flex flex-col
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* HEADER */}
                <div className="flex items-center justify-between px-5 py-4 border-b">
                    <h2 className="text-lg font-medium">Your cart ({cart?.length})</h2>
                    <button onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* CONTENT */}
                <div className="flex-1 overflow-y-auto px-5 py-4">
                    {cart.length === 0 && <p>Your cart is empty</p>}
                    {/* PRODUCT */}
                    {
                        cart.map((item: any) => (
                            <div key={item.id} className="flex gap-4 items-start">

                                {/* IMAGE */}
                                <img
                                    src={item.image}
                                    className="w-16 h-16 object-cover rounded-md bg-[#f5f3f0]"
                                    alt="product"
                                />

                                {/* CONTENT */}
                                <div className="flex-1">

                                    {/* TITLE + PRICE */}
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900 leading-tight">
                                                {item.name}
                                            </h3>
                                            {/* <p className="text-xs text-gray-500 mt-1">Size: 45ml</p> */}
                                        </div>

                                        <p className="text-sm text-gray-900">₹{item.price * item.quantity}</p>
                                    </div>

                                    {/* QUANTITY + REMOVE */}
                                    <div className="flex items-center justify-between mt-3">

                                        {/* QUANTITY BOX (ROUNDED PILL) */}
                                        <div className="flex items-center border rounded-full px-3 py-1 gap-3">
                                            <button
                                                onClick={() => decreaseQty(item.id)}
                                                className="text-sm text-gray-600 hover:text-black"
                                            >
                                                −
                                            </button>

                                            <span className="text-sm">{item.quantity}</span>

                                            <button
                                                onClick={() => increaseQty(item.id)}
                                                className="text-sm text-gray-600 hover:text-black"
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* REMOVE */}
                                        <button onClick={() => removeFromCart(item.id)} className="text-xs text-gray-500 underline hover:text-black">
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
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
                        <span>₹{subtotal}</span>
                    </div>

                    <p className="text-xs text-gray-500">
                        Taxes and shipping calculated at checkouts
                    </p>

                    {/* BUTTONS */}
                    <div className="flex gap-3">
                        {/* VIEW CART */}
                        <Link
                            href="/cart"
                            onClick={onClose}
                            className="flex-1"
                        >
                            <div className="w-full text-center border py-3 rounded-full hover:bg-gray-100 transition text-sm">
                                VIEW CART
                            </div>
                        </Link>

                        {/* CHECKOUT */}
                        <Link
                            href="/checkout"
                            onClick={onClose}
                            className="flex-1"
                        >
                            <div className="w-full text-center bg-black text-white py-3 rounded-full hover:opacity-90 transition text-sm">
                                CHECK OUT
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}