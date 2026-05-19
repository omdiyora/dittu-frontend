"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Input,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";

import { Select, SelectItem } from "@nextui-org/react";
import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import {
  Search,
  ChevronDown,
  MoreVertical,
  Plus,
  Download,
  Package,
} from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@heroui/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import ViewOrders from "../form/ViewOrder";
import OrderViewPage from "../form/ViewOrder";
import { useRouter } from "next/navigation";


const deliveryStatusColors: Record<string, string> = {
  Pending: "bg-gray-100 text-gray-700",

  Confirmed: "bg-blue-100 text-blue-700",

  Processing: "bg-yellow-100 text-yellow-700",

  Packed: "bg-orange-100 text-orange-700",

  "Ready to Ship": "bg-cyan-100 text-cyan-700",

  Shipped: "bg-indigo-100 text-indigo-700",

  "In Transit": "bg-purple-100 text-purple-700",

  "Out for Delivery": "bg-pink-100 text-pink-700",

  Delivered: "bg-green-100 text-green-700",

  "Failed Delivery": "bg-red-100 text-red-700",

  Returned: "bg-red-100 text-red-700",

  "Return Requested": "bg-amber-100 text-amber-700",

  Refunded: "bg-emerald-100 text-emerald-700",

  Cancelled: "bg-zinc-200 text-zinc-700",
};

const tabs = [
  { key: "all", label: "All" },
  { key: "Confirmed", label: "Confirmed" },
  { key: "Packed", label: "Packed" },
  { key: "Ready to Ship", label: "Ready to Ship" },
  { key: "Out for Delivery", label: "Out for Delivery" },
  { key: "Delivered", label: "Delivered" },
  { key: "Cancelled", label: "Cancelled" },
];

export default function AdminOrders() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [ordersLists, setOrderLists] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`/api/order`);
      const data = await res.json();
      setOrderLists(data || []);
    };

    fetchProducts();
  }, []);



  const formattedOrders = ordersLists.map((order) => {

    return {
      order_id: order.id,
      id: order.order_id,
      date: new Date(order.order_date).toLocaleString(), // or format as needed
      customer: `${order.customer?.first_name || ""} ${order.customer?.last_name || ""}`,
      customer_mail: order.customer?.email,
      total: `₹${order.total}`,
      paymentStatus: order.payment_status,
      paymentAction: order.payment_actions,
      fulfillmentStatus: order.fulfillment_status,
      items: `${order.items?.length || 0} items`,
      deliveryStatus: order.delivery_status || "-",
      deliveryMethod: "Shipping",
      transactionId: order.transaction_id,
      orderItems: order.items?.map((item: any) => ({
        name: item.name,
        qty: item.quantity,
        image: item.image,
      })) || [],
    };
  });

  const filteredOrders = formattedOrders.filter((order) => {
    if (selectedTab === "all") return true;

    const statusMap: Record<string, string> = {
      confirmed: "Confirmed",
      ready_to_ship: "Ready to Ship",
      out_delivered: "Out for Delivery",
      Delivered: "Delivered",
      Cancelled: "Cancelled",
    };

    console.log(statusMap[selectedTab],'statusMap[selectedTab]',order.deliveryStatus);
    

    return order.deliveryStatus === statusMap[selectedTab];
  });

  const handlePaymentActionModal = async (
    id: string | null,
    status: string,
    note?: string
  ) => {
    try {
      const res = await fetch(`/api/order/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payment_actions: status,
        }),
      });

      const data = await res.json();

      const ress = await fetch(`/api/order`);
      const dataaa = await ress.json();
      setOrderLists(dataaa || []);


    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div className="bg-[#f6f6f7] min-h-screen p-5">

      {/* <OrderViewPage /> */}

      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Package size={18} className="text-gray-700" />
            <h1 className="text-[22px] font-semibold text-black">Orders</h1>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="flat"
              className="bg-white border border-gray-300 text-black"
            >
              Export
            </Button>

            <Dropdown>
              <DropdownTrigger>
                <Button
                  size="sm"
                  variant="flat"
                  className="bg-white border border-gray-300 text-black"
                  endContent={<ChevronDown size={14} />}
                >
                  More actions
                </Button>
              </DropdownTrigger>

              <DropdownMenu aria-label="More Actions">
                <DropdownItem key="print">Print Orders</DropdownItem>
                <DropdownItem key="archive">Archive Orders</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Button
              size="sm"
              className="bg-[#1f1f1f] text-white font-medium"
              startContent={<Plus size={15} />}
            >
              Create order
            </Button>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          {/* Top Filter */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <div className="flex items-center gap-3 w-full">
              <Select
                defaultSelectedKeys={["all"]}
                size="sm"
                variant="bordered"
                className="w-[90px]"
                selectorIcon={<ChevronDown size={14} />}
              >
                <SelectItem key="all">All</SelectItem>
                <SelectItem key="paid">Paid</SelectItem>
                <SelectItem key="pending">Pending</SelectItem>
              </Select>

              <Input
                placeholder="Search and filter"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                startContent={<Search size={16} />}
                size="sm"
                className="max-w-md"
                classNames={{
                  inputWrapper:
                    "bg-white border border-gray-300 shadow-none",
                }}
              />
            </div>

            <Button
              isIconOnly
              size="sm"
              variant="light"
              className="border border-gray-200"
            >
              <MoreVertical size={16} />
            </Button>
          </div>
          <Tabs
            selectedKey={selectedTab}
            onSelectionChange={(key) => setSelectedTab(key as string)}
            variant="underlined"
            className="border-b border-gray-200"
          >
            {tabs.map((tab) => {
              const count =
                tab.key === "all"
                  ? formattedOrders.length
                  : formattedOrders.filter(
                    (order) => order.deliveryStatus === tab.key
                  ).length;

              return (
                <Tab
                  key={tab.key}
                  title={`${tab.label} (${count})`}
                />
              );
            })}
          </Tabs>

          <Table
            removeWrapper
            aria-label="Orders Table"
            isStriped={false}
            classNames={{
              base: "min-h-[500px]",
              table: "min-w-full",
              thead: "sticky top-0 z-10",
              th: `
      bg-[#fafafa]
      text-gray-500
      text-[11px]
      uppercase
      tracking-wider
      font-semibold
      border-b
      border-gray-200
      h-12
    `,
              td: `
      py-5
      text-sm
      border-b
      border-gray-100
      align-middle
    `,
              tr: "hover:bg-[#fafafa] transition-colors duration-200",
            }}
          >
            <TableHeader>
              <TableColumn>Order</TableColumn>
              <TableColumn>Customer</TableColumn>
              <TableColumn>Date</TableColumn>
              <TableColumn>Total</TableColumn>
              <TableColumn>Payment</TableColumn>
              <TableColumn>Products</TableColumn>
              <TableColumn>Delivery</TableColumn>
              <TableColumn>Payment Actions</TableColumn>
            </TableHeader>

            <TableBody emptyContent="No orders found">
              {filteredOrders.map((order) => (
                <TableRow
                  key={order.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => router.push(`/admin/orders/view/${order.order_id}`)}
                >
                  {/* ORDER ID */}

                  <TableCell>
                    <div>
                      <p className="font-semibold text-[#111827]">
                        {order.id}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        {order.transactionId}
                      </p>
                    </div>
                  </TableCell>

                  {/* CUSTOMER */}

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold">
                        {order.customer.charAt(0)}
                      </div>

                      <div>
                        <p className="font-medium text-[#111827]">
                          {order.customer}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {order.customer_mail}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* DATE */}

                  <TableCell>
                    <div>
                      <p className="text-sm text-[#111827]">
                        {order.date}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        Today
                      </p>
                    </div>
                  </TableCell>

                  {/* PRODUCTS */}



                  {/* TOTAL */}

                  <TableCell>
                    <div>
                      <p className="font-semibold text-[#111827]">
                        {order.total}
                      </p>

                      <p className="text-xs text-green-600 mt-1">
                        Paid via UPI
                      </p>
                    </div>
                  </TableCell>

                  {/* PAYMENT STATUS */}

                  <TableCell>
                    <Chip
                      radius="full"
                      className={`
              px-3
              ${order.paymentStatus === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                        }
            `}
                    >
                      {order.paymentStatus}
                    </Chip>
                  </TableCell>

                  <TableCell>
                    <Popover placement="bottom-start">
                      <PopoverTrigger>
                        <button className="text-blue-600 hover:underline text-sm font-medium">
                          {order.items}
                        </button>
                      </PopoverTrigger>

                      <PopoverContent className="p-0 bg-transparent shadow-none border-none">
                        <div className="w-[360px] bg-white rounded-3xl border border-gray-200 shadow-2xl overflow-hidden">
                          <div className="p-4 border-b border-gray-100">
                            <h3 className="font-semibold text-[#111827]">
                              Order Items
                            </h3>

                            <p className="text-xs text-gray-400 mt-1">
                              {order.items}
                            </p>
                          </div>

                          <div className="p-4 space-y-4">
                            {order.orderItems.map(
                              (item: any, index: number) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between"
                                >
                                  <div className="flex items-center gap-3">
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-14 h-14 rounded-2xl border object-cover"
                                    />

                                    <div>
                                      <p className="text-sm font-medium text-[#111827]">
                                        {item.name}
                                      </p>

                                      <p className="text-xs text-gray-400 mt-1">
                                        Qty: {item.qty}
                                      </p>
                                    </div>
                                  </div>

                                  {/* <span className="text-sm font-semibold">
                                    × {item.qty}
                                  </span> */}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>

                  {/* DELIVERY */}

                  <TableCell>
                    <Chip
                      radius="full"
                      className={`
    ${deliveryStatusColors[order.deliveryStatus] || "bg-gray-100 text-gray-700"}
  `}
                    >
                      {order.deliveryStatus}
                    </Chip>
                  </TableCell>



                  {/* ACTIONS */}

                  <TableCell>
                    {order.paymentAction === "Pending" ? (
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          className="
                  bg-black
                  text-white
                  font-medium
                  rounded-xl
                "
                          onClick={() => {
                            setSelectedOrderId(order.order_id);
                            setIsModalOpen(true);
                            setInputValue(order.transactionId);
                          }}
                        >
                          Accept
                        </Button>
                      </div>
                    ) : (
                      <Chip
                        radius="full"
                        className={
                          order.paymentAction === "Accepted"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }
                      >
                        {order.paymentAction}
                      </Chip>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Orders Table */}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen} hideCloseButton>
        <ModalContent>
          <ModalHeader>Accept Order</ModalHeader>

          <ModalBody>
            <Input
              label="Transaction Id"
              placeholder="Type here..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              readOnly
            />
          </ModalBody>

          <ModalFooter>
            <Button
              variant="bordered"
              onClick={() => {
                handlePaymentActionModal(selectedOrderId, "Decline", inputValue);
                setIsModalOpen(false);
                setInputValue("");
              }}
            >
              Decline
            </Button>

            <Button
              className="bg-black text-white"
              onClick={() => {
                handlePaymentActionModal(selectedOrderId, "Accepted", inputValue);
                setIsModalOpen(false);
                setInputValue("");
              }}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}