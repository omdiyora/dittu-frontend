"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import ProductListss from "./ProductList";

type Product = {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    images: string[];
    is_active: boolean;
};

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState("");

    // 🔹 Fetch products (replace with your API)
    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch(`/api/products`);
            const data = await res.json();
            setProducts(data || []);
        };
        fetchProducts();
    }, []);

    // 🔹 Filter products
    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    // 🔹 Status logic
    const getStatus = (stock: number) => {
        if (stock === 0) return "Out of stock";
        if (stock < 50) return "Low stock";
        return "In Stock";
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "In Stock":
                return "bg-green-100 text-green-600";
            case "Low stock":
                return "bg-yellow-100 text-yellow-600";
            case "Out of stock":
                return "bg-red-100 text-red-600";
            default:
                return "";
        }
    };

    return (
        <ProductListss />
    );
}