"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Chip,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
    Input,
} from "@heroui/react";

import {
    Search,
    MoreVertical,
    Plus,
    Upload,
    Download,
    Filter,
} from "lucide-react";
import { Select, SelectItem } from "@heroui/react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductTable() {
    const router = useRouter();
    const [products, setProducts] = useState<any[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch(`/api/products`);
            const data = await res.json();
            setProducts(data || []);
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter((item) =>
        item.name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6 bg-white rounded-xl shadow-sm h-full overflow-auto">
            <div className="max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-5">
                    <h1 className="text-2xl font-semibold text-black">Products</h1>

                    <div className="flex items-center gap-2">
                        {/* <Button
                            variant="flat"
                            className="bg-white border border-gray-300 text-black"
                        >
                            <Download size={16} />
                            Export
                        </Button>

                        <Button
                            variant="flat"
                            className="bg-white border border-gray-300 text-black"
                        >
                            <Upload size={16} />
                            Import
                        </Button>

                        <Button
                            variant="flat"
                            className="bg-white border border-gray-300 text-black"
                        >
                            More actions
                        </Button> */}

                        <Button className="bg-black text-white" onClick={() => router.push('/admin/product/create')}>
                            <Plus size={16} />
                            Add product
                        </Button>
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    {/* Search + Filter */}
                    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                        <div className="flex items-center gap-3 w-full">
                            {/* <Button
                                variant="flat"
                                className="bg-gray-100 text-black min-w-[70px]"
                            >
                                All
                            </Button> */}
                            <Select
                                placeholder=""
                                className="w-[140px]"
                                size="sm"
                                variant="bordered"
                                defaultSelectedKeys={["all"]}
                                selectorIcon={<ChevronDown size={16} />}
                            >
                                <SelectItem key="all">All</SelectItem>
                                <SelectItem key="active">Active</SelectItem>
                                <SelectItem key="inactive">Inactive</SelectItem>
                                <SelectItem key="draft">Draft</SelectItem>
                            </Select>

                            <Input
                                placeholder="Search and filter"
                                startContent={<Search size={16} />}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="max-w-md"
                                classNames={{
                                    inputWrapper:
                                        "bg-[#f6f6f7] border border-gray-200 shadow-none",
                                }}
                            />
                        </div>

                        {/* <Button
                            isIconOnly
                            variant="light"
                            className="border border-gray-200"
                        >
                            <Filter size={18} />
                        </Button> */}
                    </div>

                    {/* Table */}
                    <Table
                        removeWrapper
                        aria-label="Products Table"
                        classNames={{
                            th: "bg-[#fafafa] text-gray-600 text-xs font-semibold border-b",
                            td: "py-4 border-b border-gray-100",
                        }}
                    >
                        <TableHeader>
                            <TableColumn>Product</TableColumn>
                            <TableColumn>Status</TableColumn>
                            <TableColumn>Inventory</TableColumn>
                            <TableColumn>Category</TableColumn>
                            <TableColumn>Price</TableColumn>
                            <TableColumn>Badge Type</TableColumn>
                            <TableColumn align="center">Actions</TableColumn>
                        </TableHeader>

                        <TableBody emptyContent="No products found">
                            {filteredProducts.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-md overflow-hidden border bg-gray-100">
                                                <Image
                                                    src={product.images?.[0] || "/placeholder.png"}
                                                    alt={product.name}
                                                    width={50}
                                                    height={50}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>

                                            <div>
                                                <p className="font-medium text-sm text-black">
                                                    {product.name}
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <Chip
                                            size="sm"
                                            className="bg-green-100 text-green-700 font-medium"
                                        >
                                            Active
                                        </Chip>
                                    </TableCell>

                                    <TableCell>
                                        <span className="text-sm text-gray-700">
                                            {product.stock || 0} in stock
                                        </span>
                                    </TableCell>

                                    <TableCell>
                                        <span className="text-sm text-gray-700">
                                            {product.category || "-"}
                                        </span>
                                    </TableCell>

                                    <TableCell>
                                        <span className="text-sm text-gray-700">{product.price || "-"}</span>
                                    </TableCell>

                                    <TableCell>
                                        <span className="text-sm text-gray-700">
                                            {product.badge_type || ""}
                                        </span>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex justify-center">
                                            <Dropdown>
                                                <DropdownTrigger>
                                                    <Button
                                                        isIconOnly
                                                        size="sm"
                                                        variant="light"
                                                    >
                                                        <MoreVertical size={18} />
                                                    </Button>
                                                </DropdownTrigger>

                                                <DropdownMenu aria-label="Actions">
                                                    <DropdownItem key="edit" onClick={() => router.push(`/admin/product/edit/${product.id}`)}>
                                                        Edit
                                                    </DropdownItem>
                                                    <DropdownItem key="view">
                                                        View
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        key="delete"
                                                        className="text-danger"
                                                        color="danger"
                                                    >
                                                        Delete
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}