"use client";

import React, { useEffect, useState } from "react";

import {
    Button,
    Chip,
    Input,
    Textarea,
    Divider,
} from "@heroui/react";
import { Select, SelectItem } from "@nextui-org/react";
import {
    Package,
    User,
    CreditCard,
    Truck,
    Download,
    Printer,
    CheckCheck,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";



export default function OrderViewPage() {
    const [order, setOrder] = useState<any>(null);
    const [deliveryStatus, setDeliveryStatus] = useState("");
    const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");
    const [trackingId, setTrackingId] = useState("");
    const [courierPartnerName, setCourierPartnerName] = useState("");
    const [note, setNote] = useState("");

    const params = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/order");
                const data = await res.json();

                const singleOrder = data.find(
                    (e: any) => e.id.toString() === params.id
                );

                setOrder(singleOrder);

                setDeliveryStatus(
                    singleOrder?.delivery_status || "Pending"
                );

                setExpectedDeliveryDate(
                    singleOrder?.expected_delivery_date || ""
                );

                setTrackingId(
                    singleOrder?.tracking_id || ""
                );

                setCourierPartnerName(
                    singleOrder?.courier_partner_name || ""
                );

                setNote(
                    singleOrder?.notes || ""
                );

            } catch (error) {
                console.log(error);
            }
        };

        fetchProducts();
    }, [params.id]);


    const deliveryStatuses = [
        "Pending",
        "Confirmed",
        "Processing",
        "Packed",
        "Ready to Ship",
        "Shipped",
        "In Transit",
        "Out for Delivery",
        "Delivered",
        "Failed Delivery",
        "Returned",
        "Return Requested",
        "Refunded",
        "Cancelled",
    ]


    const handleUpdate = async () => {
        try {
            const res = await fetch(`/api/order/${order?.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    expected_delivery_date: expectedDeliveryDate,
                    delivery_status: deliveryStatus,
                    tracking_id: trackingId,
                    courier_partner_name: courierPartnerName,
                    notes: note,
                }),
            });

            const data = await res.json();

            if (data.success) {
                alert("Order updated successfully");
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="min-h-screen bg-[#f6f6f7] p-6">
            {/* HEADER */}

            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 mb-8">
                <div>
                    <div className="flex items-center gap-3 flex-wrap">
                        <h1 className="text-3xl font-bold tracking-tight text-[#111827]">
                            {order?.order_id}
                        </h1>

                        <Chip className="bg-green-100 text-green-700 border border-green-200">
                            {order?.payment_status}
                        </Chip>

                        <Chip className="bg-orange-100 text-orange-700 border border-orange-200">
                            {order?.fulfillment_status}
                        </Chip>
                    </div>

                    <p className="text-gray-500 mt-2">
                        Order placed on {order?.order_date}
                    </p>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                    <Button
                        variant="bordered"
                        startContent={<CheckCheck size={16} />}
                        className="rounded-2xl border-gray-300"
                    >
                        Mark to paid
                    </Button>
                    <Button
                        startContent={<Download size={16} />}
                        className="bg-black text-white rounded-2xl"
                    >
                        Download Invoice
                    </Button>

                    <Button
                        variant="bordered"
                        startContent={<Printer size={16} />}
                        className="rounded-2xl border-gray-300"
                    >
                        Print Label
                    </Button>
                </div>
            </div>

            {/* MAIN GRID */}

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* LEFT SIDE */}

                <div className="xl:col-span-2 space-y-6">
                    {/* PRODUCTS */}

                    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Package size={20} />

                            <h2 className="text-2xl font-semibold text-[#111827]">
                                Ordered Products
                            </h2>
                        </div>

                        <div className="space-y-5">
                            {order?.items.map((item: any, index: any) => (
                                <div
                                    key={index}
                                    className="
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    md:justify-between
                    gap-5
                    border
                    border-gray-100
                    rounded-3xl
                    p-5
                    hover:shadow-md
                    transition-all
                  "
                                >
                                    <div className="flex items-center gap-5">
                                        <img
                                            src={item?.image}
                                            alt={item?.name}
                                            className="
                        w-24
                        h-24
                        rounded-3xl
                        object-cover
                        border
                        shadow-sm
                      "
                                        />

                                        <div>
                                            <h3 className="font-semibold text-lg text-[#111827]">
                                                {item?.name}
                                            </h3>

                                            <p className="text-sm text-gray-500 mt-2">
                                                Quantity: {item?.quantity}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                SKU: DITTU-001
                                            </p>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-2xl font-bold">
                                            ₹{item?.quantity * item?.price}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ORDER + PAYMENT + DELIVERY */}

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        {/* LEFT COLUMN */}

                        <div className="space-y-6">
                            {/* ORDER SUMMARY */}

                            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-6">
                                <h2 className="text-2xl font-semibold text-[#111827] mb-6">
                                    Order Summary
                                </h2>

                                <div className="space-y-5">
                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-500">
                                            Subtotal
                                        </p>

                                        <p className="font-medium">
                                            ₹{order?.total}
                                        </p>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-500">
                                            Shipping
                                        </p>

                                        <p className="font-medium">
                                            ₹{order?.shipping}
                                        </p>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-500">
                                            Discount
                                        </p>

                                        <p className="font-medium text-green-600">
                                            - ₹0
                                        </p>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-500">
                                            Tax
                                        </p>

                                        <p className="font-medium">
                                            ₹0
                                        </p>
                                    </div>

                                    <Divider />

                                    <div className="flex justify-between items-center">
                                        <p className="text-xl font-bold">
                                            Total
                                        </p>

                                        <p className="text-3xl font-bold">
                                            ₹{order?.total}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN */}

                        <div>
                            {/* DELIVERY MANAGEMENT */}
                            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <CreditCard size={20} />

                                    <h2 className="text-2xl font-semibold text-[#111827]">
                                        Payment Details
                                    </h2>
                                </div>

                                <div className="space-y-5">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Payment Method
                                        </p>

                                        <p className="font-medium mt-1">
                                            {order?.payment_mode}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Transaction ID
                                        </p>

                                        <p className="font-medium mt-1 break-all">
                                            {order?.transaction_id}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500 mb-2">
                                            Payment Status
                                        </p>

                                        <Chip className="bg-green-100 text-green-700 border border-green-200">
                                            {order?.payment_status}
                                        </Chip>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* RIGHT SIDEBAR */}

                <div className="space-y-6">
                    {/* CUSTOMER DETAILS */}
                    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Truck size={20} />

                            <h2 className="text-2xl font-semibold text-[#111827]">
                                Delivery Management
                            </h2>
                        </div>

                        <div className="space-y-6">

                            {/* DELIVERY STATUS */}
                            <Field label="Delivery Status">
                                <Select
                                    // label="Delivery Status"
                                    selectedKeys={[deliveryStatus || order?.delivery_status]}
                                    onSelectionChange={(keys: any) =>
                                        setDeliveryStatus(Array.from(keys)[0] as string)
                                    }
                                >
                                    {deliveryStatuses.map((status) => (
                                        <SelectItem key={status}>
                                            {status}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </Field>

                            {/* DELIVERY DATE */}
                            <Field label="Expected Delivery Date">
                                <Input
                                    type="date"
                                    placeholder="Expected Delivery Date"
                                    value={expectedDeliveryDate}
                                    onChange={(e) =>
                                        setExpectedDeliveryDate(e.target.value)
                                    }
                                />
                            </Field>

                            {/* TRACKING ID */}
                            <Field label="Tracking ID">
                                <Input
                                    placeholder="Tracking ID"
                                    value={trackingId}
                                    onChange={(e) =>
                                        setTrackingId(e.target.value)
                                    }
                                />
                            </Field>

                            {/* COURIER */}
                            <Field label="Courier Partner Name">
                                <Input
                                    placeholder="Courier Partner Name"
                                    value={courierPartnerName}
                                    onChange={(e) =>
                                        setCourierPartnerName(e.target.value)
                                    }
                                />
                            </Field>

                            {/* NOTES */}
                            <Field label="Notes">
                                <Textarea
                                    placeholder="Notes"
                                    minRows={6}
                                    value={note}
                                    onChange={(e) =>
                                        setNote(e.target.value)
                                    }
                                />
                            </Field>

                            {/* ACTIONS */}

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <Button
                                    variant="bordered"
                                    className="rounded-2xl border-gray-300"
                                >
                                    Cancel
                                </Button>

                                <Button className="bg-black text-white rounded-2xl px-8" onPress={handleUpdate}>
                                    Update Order
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-6 sticky top-6">
                        <div className="flex items-center gap-3 mb-6">
                            <User size={20} />

                            <h2 className="text-2xl font-semibold text-[#111827]">
                                Customer Details
                            </h2>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Customer
                                </p>

                                <p className="font-medium mt-1">
                                    {order?.customer.first_name}{" "}
                                    {order?.customer.last_name}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Email
                                </p>

                                <p className="font-medium mt-1 break-all">
                                    {order?.customer.email}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Phone
                                </p>

                                <p className="font-medium mt-1">
                                    {order?.customer.phone}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Address
                                </p>

                                <p className="font-medium mt-1 leading-7">
                                    {order?.customer.address}
                                </p>
                            </div>

                            <Chip className="bg-blue-100 text-blue-700 border border-blue-200">
                                Returning Customer
                            </Chip>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Field = ({ label, children }: any) => (
    <div>
        <label className="text-sm font-medium pl-2">{label}</label>
        <div className="mt-2">{children}</div>
    </div>
);