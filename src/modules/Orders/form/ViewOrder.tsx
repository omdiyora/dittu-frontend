"use client";

import React, { useEffect, useState } from "react";
import {
    Button,
    Chip,
    Card,
    CardBody,
    Divider,
    Avatar,
} from "@heroui/react";
import { Input, Select, SelectItem } from "@nextui-org/react";

const DELIVERY_STATUS = [
    { key: "pending", label: "Pending" },
    { key: "processing", label: "Processing" },
    { key: "shipped", label: "Shipped" },
    { key: "out_for_delivery", label: "Out for Delivery" },
    { key: "delivered", label: "Delivered" },
];

export default function ViewOrders() {
    const [order, setOrder] = useState<any>(null);
    const [status, setStatus] = useState("pending");
    const [expectedDate, setExpectedDate] = useState("");



    useEffect(() => {
        const fetchOrder = async () => {
            const res = await fetch(`/api/order`);
            const data = await res.json();
            setOrder(data[0]); // assuming single for now
        };
        fetchOrder();
    }, []);

    if (!order) return <div>Loading...</div>;

    return (
        <div className="p-6 grid grid-cols-12 gap-6 bg-gray-100 min-h-screen">

            {/* LEFT SIDE */}
            <div className="col-span-8 space-y-6">

                {/* ORDER STATUS */}
                <Card>
                    <CardBody className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Chip color="success" variant="flat">
                                {order.fulfillment_status}
                            </Chip>
                            <span className="text-gray-500 text-sm">
                                {order.order_id}
                            </span>
                        </div>

                        <p className="text-sm text-gray-500">
                            {new Date(order.order_date).toDateString()}
                        </p>

                        {/* PRODUCT */}
                        {order.items.map((item: any) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between border rounded-xl p-3"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={item.image}
                                        className="w-14 h-14 rounded-md object-cover"
                                    />
                                    <div>
                                        <p className="font-medium">{item.name}</p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p>₹{item.price}.00 × {item.quantity} </p>
                                    <p className="font-semibold">
                                        ₹{item.price * item.quantity}.00
                                    </p>
                                </div>
                            </div>
                        ))}

                        {/* ACTION BUTTONS */}
                        <div className="flex gap-3">
                            <Button color="primary" variant="flat">
                                Mark as delivered
                            </Button>
                            <Button color="default" variant="solid">
                                + Add tracking
                            </Button>
                        </div>
                    </CardBody>
                </Card>

                {/* PAYMENT SUMMARY */}
                <Card>
                    <CardBody className="space-y-3">

                        <Chip variant="flat" color="danger">
                            Refunded
                        </Chip>

                        <div className="flex justify-between text-sm">
                            <span>Original order</span>
                            <span>{new Date(order.order_date).toDateString()}</span>
                            <span>₹{order.total}</span>
                        </div>

                        <Divider />

                        <div className="flex justify-between text-sm">
                            <span>Subtotal</span>
                            <span>1 item</span>
                            <span>₹{order.total}</span>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span>Taxes</span>
                            <span>IGST 18%</span>
                            <span>₹{Math.round(order.total * 0.18)}</span>
                        </div>

                        <Divider />

                        <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>₹{Math.round(order.total * 1.18)}</span>
                        </div>

                        <Divider />

                        <div className="flex justify-between text-sm">
                            <span>Paid</span>
                            <span>₹{Math.round(order.total * 1.18)}</span>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span>Refunded</span>
                            <span>-₹{Math.round(order.total * 1.18)}</span>
                        </div>

                        <div className="flex justify-between font-semibold">
                            <span>Net payment</span>
                            <span>₹0.00</span>
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* RIGHT SIDE */}
            <div className="col-span-4 space-y-6">

                {/* NOTES */}
                <Card>
                    <CardBody className="space-y-4">
                        {/* Notes */}
                        <div>
                            <p className="font-semibold mb-2">Notes</p>
                            <p className="text-sm text-gray-500">
                                {order.notes || "No notes from customer"}
                            </p>
                        </div>

                        {/* Delivery Status Select */}
                        <Select
                            label="Delivery Status"
                            selectedKeys={[status]}
                            onSelectionChange={(keys: any) => {
                                const value = Array.from(keys)[0];
                                setStatus(value as string);
                            }}
                        >
                            {DELIVERY_STATUS.map((item) => (
                                <SelectItem key={item.key}>{item.label}</SelectItem>
                            ))}
                        </Select>

                        {/* Expected Delivery Date */}
                        <Input
                            type="date"
                            label="Expected Delivery Date"
                            value={expectedDate}
                            onChange={(e: any) => setExpectedDate(e.target.value)}
                        />
                    </CardBody>
                </Card>

                {/* CUSTOMER */}
                <Card>
                    <CardBody className="space-y-3">
                        <p className="font-semibold">Customer</p>

                        <div className="flex items-center gap-3">
                            <Avatar name={order.customer.first_name} />
                            <div>
                                <p className="font-medium">
                                    {order.customer.first_name} {order.customer.last_name}
                                </p>
                                <p className="text-sm text-blue-500 cursor-pointer">
                                    2 orders
                                </p>
                            </div>
                        </div>

                        <Divider />

                        <div>
                            <p className="text-sm font-medium">Contact information</p>
                            <p className="text-sm text-gray-500">
                                {order.customer.email || "No email provided"}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm font-medium">Shipping address</p>
                            <p className="text-sm text-gray-500">
                                No shipping address provided
                            </p>
                        </div>

                        <div>
                            <p className="text-sm font-medium">Billing address</p>
                            <p className="text-sm text-gray-500">
                                No billing address provided
                            </p>
                        </div>
                    </CardBody>
                </Card>

                {/* CONVERSION SUMMARY */}
                <Card>
                    <CardBody>
                        <p className="font-semibold mb-2">Conversion summary</p>
                        <p className="text-sm text-gray-500">
                            There aren't any conversion details available for this order
                        </p>
                    </CardBody>
                </Card>

            </div>
        </div>

    );
}