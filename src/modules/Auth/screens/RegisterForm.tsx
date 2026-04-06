"use client"
import React from "react";

export const RegisterForm = () => {
    return (
        <form className="space-y-4">
            <input
                type="text"
                placeholder="Full Name"
                className="w-full border rounded-lg px-4 py-2"
            />

            <input
                type="email"
                placeholder="Email"
                className="w-full border rounded-lg px-4 py-2"
            />

            <input
                type="password"
                placeholder="Password"
                className="w-full border rounded-lg px-4 py-2"
            />

            <button className="w-full bg-black text-white py-2 rounded-lg">
                Create Account
            </button>
        </form>
    );
};