"use client";

import { useState } from "react";
import { MapPin, Plus, Pencil, Trash } from "lucide-react";

const UserAddress = () => {
    const [addresses, setAddresses] = useState([
        {
            id: 1,
            name: "Om Diyora",
            phone: "9876543210",
            address: "123 Street, Surat, Gujarat",
            city: "Surat",
            state: "Gujarat",
            pincode: "395006",
            isDefault: true,
        },
    ]);

    const [showForm, setShowForm] = useState(false);

    const [form, setForm] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
    });

    // Handle Change
    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Add Address
    const handleAdd = () => {
        const newAddress = {
            ...form,
            id: Date.now(),
            isDefault: addresses.length === 0,
        };

        setAddresses([...addresses, newAddress]);
        setShowForm(false);

        setForm({
            name: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            pincode: "",
        });
    };

    // Delete
    const handleDelete = (id: number) => {
        setAddresses(addresses.filter((a) => a.id !== id));
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-5xl mx-auto px-4">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Your Addresses</h1>

                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg"
                    >
                        <Plus size={16} /> Add Address
                    </button>
                </div>

                {/* FORM */}
                {showForm && (
                    <div className="bg-white p-6 rounded-lg border mb-6">
                        <h2 className="font-semibold mb-4">Add New Address</h2>

                        <div className="grid grid-cols-2 gap-4">
                            <input name="name" placeholder="Full Name" onChange={handleChange} className="input" />
                            <input name="phone" placeholder="Phone Number" onChange={handleChange} className="input" />
                            <input name="pincode" placeholder="Pincode" onChange={handleChange} className="input" />
                            <input name="city" placeholder="City" onChange={handleChange} className="input" />
                            <input name="state" placeholder="State" onChange={handleChange} className="input" />
                            <input name="address" placeholder="Full Address" onChange={handleChange} className="input col-span-2" />
                        </div>

                        <button
                            onClick={handleAdd}
                            className="mt-4 bg-black text-white px-5 py-2 rounded"
                        >
                            Save Address
                        </button>
                    </div>
                )}

                {/* ADDRESS LIST */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {addresses.map((addr) => (
                        <div
                            key={addr.id}
                            className="bg-white p-5 rounded-lg border relative hover:shadow-md"
                        >
                            {/* DEFAULT BADGE */}
                            {addr.isDefault && (
                                <span className="absolute top-2 right-2 text-xs bg-black text-white px-2 py-0.5 rounded">
                                    Default
                                </span>
                            )}

                            <div className="flex items-start gap-3">
                                <MapPin className="text-gray-500 mt-1" />
                                <div>
                                    <p className="font-semibold">{addr.name}</p>
                                    <p className="text-sm text-gray-600">{addr.phone}</p>

                                    <p className="text-sm mt-2 text-gray-700">
                                        {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
                                    </p>
                                </div>
                            </div>

                            {/* ACTIONS */}
                            <div className="flex gap-3 mt-4 text-sm">
                                <button className="flex items-center gap-1 text-blue-600">
                                    <Pencil size={14} /> Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(addr.id)}
                                    className="flex items-center gap-1 text-red-500"
                                >
                                    <Trash size={14} /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* Tailwind helper */}
            <style jsx>{`
        .input {
          @apply border rounded px-3 py-2 w-full text-sm;
        }
      `}</style>
        </div>
    );
};

export default UserAddress;