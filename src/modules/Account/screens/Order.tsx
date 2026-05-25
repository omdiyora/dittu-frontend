"use client";

import Image from "next/image";
import { Search, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const tabs = [
    "All Orders",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
];

const Order = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [ordersLists, setOrderLists] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [selectedTab, setSelectedTab] =
        useState("All Orders");

    const [selectedOrder, setSelectedOrder] =
        useState<any>(null);

    const [selectedReviewOrder, setSelectedReviewOrder] =
        useState<any>(null);

    const [rating, setRating] = useState(0);

    const [hoveredRating, setHoveredRating] =
        useState(0);

    const [reviewMessage, setReviewMessage] =
        useState("");

    const {
        isOpen: isDetailsOpen,
        onOpen: onDetailsOpen,
        onOpenChange: onDetailsOpenChange,
    } = useDisclosure();

    const {
        isOpen: isReviewOpen,
        onOpen: onReviewOpen,
        onOpenChange: onReviewOpenChange,
    } = useDisclosure();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch(`/api/order`);
                const data = await res.json();

                setOrderLists(data || []);
            } catch (error) {
                console.log(error);
            }
        };

        fetchOrders();
    }, []);

    const filteredOrders = useMemo(() => {
        return ordersLists.filter((order) => {
            const matchesTab =
                selectedTab === "All Orders"
                    ? true
                    : order.delivery_status?.toLowerCase() ===
                    selectedTab.toLowerCase();

            const searchValue = search.toLowerCase();

            const matchesSearch =
                order.order_id
                    ?.toLowerCase()
                    .includes(searchValue) ||
                order.customer?.first_name
                    ?.toLowerCase()
                    .includes(searchValue) ||
                order.customer?.last_name
                    ?.toLowerCase()
                    .includes(searchValue) ||
                order.items?.some((item: any) =>
                    item.name
                        ?.toLowerCase()
                        .includes(searchValue)
                );

            return matchesTab && matchesSearch;
        });
    }, [ordersLists, search, selectedTab]);

    const getStatusStep = (status: string) => {
        switch (status?.toLowerCase()) {
            case "processing":
                return 1;

            case "shipped":
                return 2;

            case "delivered":
                return 3;

            default:
                return 0;
        }
    };

    const handleReview = async () => {
        try {
            const productId = selectedReviewOrder?.items?.[0]?.id;

            const res = await fetch(`/api/ratings`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: `${session?.user?.first_name} ${session?.user?.last_name}`,
                    customer_id: session?.user?.id,
                    product_id: productId,
                    rating: rating,
                    message: reviewMessage
                }),
            });

            const data = await res.json();
        } catch (error) {
            console.log(error);
        }
    };

    const downloadInvoice = (selectedOrder: any) => {
        const doc = new jsPDF("p", "mm", "a4");

        // ================================
        // COLORS
        // ================================
        const black = "#111111";
        const gray = "#666666";
        const lightGray = "#f5f5f5";

        // ================================
        // PAGE SIZE
        // ================================
        const pageWidth = doc.internal.pageSize.getWidth();

        // ================================
        // BACKGROUND HEADER
        // ================================
        doc.setFillColor(17, 17, 17);
        doc.rect(0, 0, pageWidth, 45, "F");

        // ================================
        // BRAND
        // ================================
        doc.setTextColor(255, 255, 255);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(28);
        doc.text("DITTU", 14, 20);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.text("Luxury Skincare & Beauty", 14, 28);

        // ================================
        // INVOICE TITLE
        // ================================
        doc.setFontSize(24);
        doc.text("INVOICE", 150, 22);

        doc.setFontSize(10);
        doc.text(`Invoice #: ${selectedOrder.order_id}`, 150, 30);

        // ================================
        // RESET TEXT COLOR
        // ================================
        doc.setTextColor(0, 0, 0);

        // ================================
        // ORDER DETAILS CARD
        // ================================
        doc.setFillColor(245, 245, 245);
        doc.roundedRect(14, 55, 182, 35, 4, 4, "F");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text("Order Details", 20, 65);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);

        doc.text(
            `Order Date: ${new Date(
                selectedOrder.order_date
            ).toLocaleDateString()}`,
            20,
            75
        );

        doc.text(
            `Payment Mode: ${selectedOrder.payment_mode.toUpperCase()}`,
            20,
            82
        );

        doc.text(
            `Payment Status: ${selectedOrder.payment_status}`,
            110,
            75
        );

        doc.text(
            `Delivery Status: ${selectedOrder.delivery_status}`,
            110,
            82
        );

        // ================================
        // BILL TO
        // ================================
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);

        doc.text("Bill To", 14, 110);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);

        doc.text(
            `${selectedOrder.customer.first_name} ${selectedOrder.customer.last_name}`,
            14,
            120
        );

        doc.text(selectedOrder.customer.email, 14, 127);

        doc.text(selectedOrder.customer.phone, 14, 134);

        doc.text(selectedOrder.state || "India", 14, 141);

        // ================================
        // PRODUCTS TABLE
        // ================================
        autoTable(doc, {
            startY: 155,

            head: [["Product", "Price", "Qty", "Total"]],

            body: selectedOrder.items.map((item: any) => [
                item.name,
                `₹${item.price}`,
                item.quantity,
                `₹${item.price * item.quantity}`,
            ]),

            theme: "plain",

            headStyles: {
                fillColor: [17, 17, 17],
                textColor: [255, 255, 255],
                fontSize: 11,
                fontStyle: "bold",
                cellPadding: 5,
            },

            bodyStyles: {
                fontSize: 10,
                textColor: [50, 50, 50],
                cellPadding: 5,
            },

            alternateRowStyles: {
                fillColor: [248, 248, 248],
            },

            styles: {
                overflow: "linebreak",
            },
        });

        // ================================
        // TOTAL SECTION
        // ================================
        const finalY = (doc as any).lastAutoTable.finalY;

        doc.setFillColor(17, 17, 17);

        doc.roundedRect(120, finalY + 12, 76, 25, 4, 4, "F");

        doc.setTextColor(255, 255, 255);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);

        doc.text("Grand Total", 128, finalY + 24);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);

        doc.text(`₹${selectedOrder.total}`, 128, finalY + 33);

        // ================================
        // FOOTER
        // ================================
        doc.setTextColor(100, 100, 100);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);

        doc.text(
            "Thank you for shopping with DITTU.",
            14,
            finalY + 55
        );

        doc.text(
            "This is a computer generated invoice.",
            14,
            finalY + 62
        );

        // ================================
        // SAVE PDF
        // ================================
        doc.save(`invoice-${selectedOrder.order_id}.pdf`);
    };

    return (
        <div className="min-h-screen bg-[#f7f3ee] text-black">
            <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
                {/* Header */}
                <div className="mb-10 text-center sm:mb-12">
                    <h2 className="text-3xl font-serif sm:text-4xl md:text-5xl">
                        My Orders
                    </h2>

                    <p className="mt-2 text-sm text-black/60 sm:text-base">
                        Total Orders:{" "}
                        {filteredOrders.length}
                    </p>

                    {/* Search */}
                    <div className="mx-auto mt-6 flex w-full max-w-2xl items-center rounded-2xl border border-black/10 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-xl sm:rounded-full sm:px-5 sm:py-4">
                        <input
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            placeholder="Search By Order ID..."
                            className="flex-1 bg-transparent text-sm outline-none"
                        />

                        <Search size={18} />
                    </div>

                    {/* Tabs */}
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                        {tabs.map((tab, index) => (
                            <button
                                key={index}
                                onClick={() =>
                                    setSelectedTab(tab)
                                }
                                className={`rounded-full px-4 py-2 text-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:px-6 sm:py-3 sm:text-sm ${selectedTab === tab
                                    ? "bg-black text-white"
                                    : "bg-white/70 text-black backdrop-blur-xl"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Empty State */}
                {filteredOrders.length === 0 && (
                    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-[30px] border border-black/5 bg-white/70 p-6 text-center shadow-sm">
                        <h3 className="text-xl font-semibold sm:text-2xl">
                            No Orders Found
                        </h3>

                        <p className="mt-2 text-sm text-black/50 sm:text-base">
                            Try searching with another
                            keyword.
                        </p>
                    </div>
                )}

                {/* Orders Grid */}
                <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {filteredOrders.map((order, index) => {
                        const item = order.items?.[0];

                        const currentStep =
                            getStatusStep(
                                order.delivery_status
                            );

                        return (
                            <div
                                key={index}
                                className="group overflow-hidden rounded-[30px] border border-black/5 bg-white/80 shadow-sm backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                            >
                                <div className="p-4 sm:p-5">
                                    {/* Product */}
                                    <div className="flex flex-col gap-4 sm:flex-row">
                                        <div className="relative h-56 w-full overflow-hidden rounded-2xl bg-[#f5f5f5] sm:h-28 sm:w-24">
                                            <Image
                                                src={
                                                    item?.image
                                                }
                                                alt={
                                                    item?.name
                                                }
                                                fill
                                                className="object-cover transition duration-500 group-hover:scale-105"
                                            />
                                        </div>

                                        <div className="flex flex-1 flex-col">
                                            <h3 className="line-clamp-2 text-base font-semibold leading-snug sm:text-lg">
                                                {
                                                    item?.name
                                                }
                                            </h3>

                                            <p className="mt-1 text-sm text-black/60">
                                                Qty :{" "}
                                                {
                                                    item?.quantity
                                                }
                                            </p>

                                            <span
                                                className={`mt-3 w-fit rounded-full px-3 py-1 text-xs font-medium ${order.delivery_status ===
                                                    "Delivered"
                                                    ? "bg-green-100 text-green-700"
                                                    : order.delivery_status ===
                                                        "Processing"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : order.delivery_status ===
                                                            "Cancelled"
                                                            ? "bg-red-100 text-red-700"
                                                            : "bg-blue-100 text-blue-700"
                                                    }`}
                                            >
                                                {
                                                    order.delivery_status
                                                }
                                            </span>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="my-5 border-t border-black/5" />

                                    {/* Details */}
                                    <div className="space-y-3 text-sm">
                                        <InfoRow
                                            label="Order Date"
                                            value={new Date(
                                                order.order_date
                                            ).toLocaleDateString()}
                                        />

                                        <InfoRow
                                            label="Order ID"
                                            value={
                                                order.order_id
                                            }
                                        />

                                        <InfoRow
                                            label="Payment"
                                            value={
                                                order.payment_status
                                            }
                                        />

                                        <InfoRow
                                            label="Total Price"
                                            value={`₹${Number(
                                                order.total
                                            ).toLocaleString()}`}
                                        />

                                        <InfoRow
                                            label="Customer"
                                            value={`${order.customer?.first_name} ${order.customer?.last_name}`}
                                        />

                                        {order.expected_delivery_date && (
                                            <InfoRow
                                                label="Expected Delivery"
                                                value={new Date(
                                                    order.expected_delivery_date
                                                ).toLocaleDateString()}
                                            />
                                        )}
                                    </div>

                                    {/* Progress */}
                                    <div className="mt-8">
                                        <div className="relative flex items-center justify-between">
                                            <div className="absolute top-2 left-0 h-[2px] w-full bg-black/10" />

                                            {[0, 1, 2, 3].map(
                                                (step) => (
                                                    <div
                                                        key={
                                                            step
                                                        }
                                                        className={`relative z-10 h-4 w-4 rounded-full ${currentStep >=
                                                            step
                                                            ? "bg-black"
                                                            : "bg-black/20"
                                                            }`}
                                                    />
                                                )
                                            )}
                                        </div>

                                        <div className="mt-3 grid grid-cols-4 text-center text-[10px] text-black/60 sm:flex sm:justify-between sm:text-xs">
                                            <span>
                                                Placed
                                            </span>

                                            <span>
                                                Processing
                                            </span>

                                            <span>
                                                Shipped
                                            </span>

                                            <span>
                                                Delivered
                                            </span>
                                        </div>
                                    </div>

                                    {/* Buttons */}
                                    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                        <Button className="rounded-2xl bg-black px-4 py-2.5 text-sm text-white transition hover:opacity-90 sm:py-3">
                                            Track Order
                                        </Button>

                                        <button
                                            onClick={() =>
                                                router.push(
                                                    `/products/${item?.id}`
                                                )
                                            }
                                            className="rounded-2xl border border-black/10 bg-[#f7f7f7] px-4 py-2.5 text-sm transition hover:bg-black hover:text-white sm:py-3"
                                        >
                                            Buy Again
                                        </button>

                                        <button
                                            onClick={() => {
                                                setSelectedOrder(
                                                    order
                                                );

                                                onDetailsOpen();
                                            }}
                                            className="rounded-2xl border border-black/10 bg-white px-4 py-2.5 text-sm transition hover:bg-black hover:text-white sm:py-3"
                                        >
                                            View Details
                                        </button>

                                        <button
                                            onClick={() => {
                                                setSelectedReviewOrder(
                                                    order
                                                );

                                                onReviewOpen();
                                            }}
                                            className="rounded-2xl border border-black/10 bg-white px-4 py-2.5 text-sm transition hover:bg-black hover:text-white sm:py-3"
                                        >
                                            Write Review
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>

            {/* Order Details Modal */}
            <Modal
                isOpen={isDetailsOpen}
                onOpenChange={
                    onDetailsOpenChange
                }
                size="5xl"
                placement="top-center"
                scrollBehavior="inside"
                classNames={{
                    base: "mx-2 rounded-[24px] sm:rounded-[30px]",
                    wrapper:
                        "items-start overflow-y-auto pt-[70px] sm:pt-10 md:pt-14",
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="border-b border-black/5 pb-4">
                                <div>
                                    <h2 className="text-xl font-semibold sm:text-2xl">
                                        Order Details
                                    </h2>

                                    <p className="mt-1 text-sm text-black/50">
                                        {
                                            selectedOrder?.order_id
                                        }
                                    </p>
                                </div>
                            </ModalHeader>

                            <ModalBody className="py-6">
                                {/* Product */}
                                <div className="flex flex-col gap-5 rounded-3xl bg-[#f8f8f8] p-4 sm:flex-row sm:p-5">
                                    <div className="relative h-64 w-full overflow-hidden rounded-2xl sm:h-28 sm:w-24">
                                        <Image
                                            src={
                                                selectedOrder
                                                    ?.items?.[0]
                                                    ?.image
                                            }
                                            alt={
                                                selectedOrder
                                                    ?.items?.[0]
                                                    ?.name
                                            }
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold">
                                            {
                                                selectedOrder
                                                    ?.items?.[0]
                                                    ?.name
                                            }
                                        </h3>

                                        <p className="mt-2 text-sm text-black/60">
                                            Quantity :{" "}
                                            {
                                                selectedOrder
                                                    ?.items?.[0]
                                                    ?.quantity
                                            }
                                        </p>

                                        <p className="mt-2 text-lg font-semibold">
                                            ₹
                                            {Number(
                                                selectedOrder
                                                    ?.items?.[0]
                                                    ?.price
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
                                    <Card title="Order Information">
                                        <Row
                                            label="Order ID"
                                            value={
                                                selectedOrder?.order_id
                                            }
                                        />

                                        <Row
                                            label="Order Date"
                                            value={new Date(
                                                selectedOrder?.order_date
                                            ).toLocaleDateString()}
                                        />

                                        <Row
                                            label="State"
                                            value={
                                                selectedOrder?.state
                                            }
                                        />
                                    </Card>

                                    <Card title="Payment Details">
                                        <Row
                                            label="Payment Status"
                                            value={
                                                selectedOrder?.payment_status
                                            }
                                        />

                                        <Row
                                            label="Payment Mode"
                                            value={
                                                selectedOrder?.payment_mode
                                            }
                                        />

                                        <Row
                                            label="Total Amount"
                                            value={`₹${Number(
                                                selectedOrder?.total
                                            ).toLocaleString()}`}
                                        />
                                    </Card>
                                </div>
                            </ModalBody>

                            <ModalFooter className="flex flex-col gap-3 sm:flex-row">
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                    className="w-full sm:w-auto"
                                >
                                    Close
                                </Button>

                                <Button onClick={() => downloadInvoice(selectedOrder)} className="w-full rounded-2xl bg-black text-white sm:w-auto">
                                    Download Invoice
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            {/* Review Modal */}
            <Modal
                isOpen={isReviewOpen}
                onOpenChange={
                    onReviewOpenChange
                }
                placement="top-center"
                size="2xl"
                scrollBehavior="inside"
                classNames={{
                    base: "mx-2 rounded-[24px] sm:rounded-[30px]",
                    wrapper:
                        "items-start overflow-y-auto pt-[70px] sm:pt-10 md:pt-14",
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="border-b border-black/5">
                                <div>
                                    <h2 className="text-xl font-semibold sm:text-2xl">
                                        Write Review
                                    </h2>

                                    <p className="mt-1 text-sm text-black/50">
                                        Share your
                                        experience
                                    </p>
                                </div>
                            </ModalHeader>

                            <ModalBody className="py-6">
                                <div className="flex flex-col gap-4 rounded-3xl bg-[#f8f8f8] p-4 sm:flex-row">
                                    <div className="relative h-56 w-full overflow-hidden rounded-2xl sm:h-24 sm:w-20">
                                        <Image
                                            src={
                                                selectedReviewOrder
                                                    ?.items?.[0]
                                                    ?.image
                                            }
                                            alt={
                                                selectedReviewOrder
                                                    ?.items?.[0]
                                                    ?.name
                                            }
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold">
                                            {
                                                selectedReviewOrder
                                                    ?.items?.[0]
                                                    ?.name
                                            }
                                        </h3>

                                        <p className="mt-2 text-sm text-black/50">
                                            Order ID :{" "}
                                            {
                                                selectedReviewOrder?.order_id
                                            }
                                        </p>
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="mt-6">
                                    <label className="text-sm font-medium">
                                        Overall Rating
                                    </label>

                                    <div className="mt-3 flex items-center gap-2">
                                        {[1, 2, 3, 4, 5].map(
                                            (star) => (
                                                <button
                                                    key={
                                                        star
                                                    }
                                                    type="button"
                                                    onClick={() =>
                                                        setRating(
                                                            star
                                                        )
                                                    }
                                                    onMouseEnter={() =>
                                                        setHoveredRating(
                                                            star
                                                        )
                                                    }
                                                    onMouseLeave={() =>
                                                        setHoveredRating(
                                                            0
                                                        )
                                                    }
                                                    className="transition hover:scale-110 active:scale-95"
                                                >
                                                    <Star
                                                        size={
                                                            24
                                                        }
                                                        className={`${(
                                                            hoveredRating ||
                                                            rating
                                                        ) >=
                                                            star
                                                            ? "fill-yellow-400 text-yellow-400"
                                                            : "text-gray-300"
                                                            }`}
                                                    />
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>

                                {/* Review */}
                                <div className="mt-6">
                                    <label className="text-sm font-medium">
                                        Your Review
                                    </label>

                                    <textarea
                                        rows={4}
                                        value={
                                            reviewMessage
                                        }
                                        onChange={(e) =>
                                            setReviewMessage(
                                                e.target
                                                    .value
                                            )
                                        }
                                        placeholder="Write your experience..."
                                        className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8f8f8] p-4 text-sm outline-none transition focus:border-black"
                                    />
                                </div>
                            </ModalBody>

                            <ModalFooter className="flex flex-col gap-3 sm:flex-row">
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                    className="w-full sm:w-auto"
                                >
                                    Close
                                </Button>

                                <Button onClick={handleReview} className="w-full rounded-2xl bg-black px-8 text-white sm:w-auto">
                                    Submit Review
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default Order;


const Card = ({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) => (
    <div className="rounded-3xl border border-black/5 p-5">
        <h4 className="text-lg font-semibold">
            {title}
        </h4>

        <div className="mt-4 space-y-3 text-sm">
            {children}
        </div>
    </div>
);

const InfoRow = ({
    label,
    value,
}: {
    label: string;
    value: any;
}) => (
    <div className="flex items-start justify-between gap-4 text-sm">
        <span className="text-black/50">
            {label}
        </span>

        <span className="text-right font-medium">
            {value}
        </span>
    </div>
);

const Row = ({
    label,
    value,
}: {
    label: string;
    value: any;
}) => (
    <div className="flex items-start justify-between gap-4 text-sm">
        <span className="text-black/50">
            {label}
        </span>

        <span className="text-right font-medium">
            {value}
        </span>
    </div>
);