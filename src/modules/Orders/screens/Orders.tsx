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
  Select,
  SelectItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";

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

export default function AdminOrders() {
  const [search, setSearch] = useState("");
  const [ordersLists, setOrderLists] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`/api/order`);
      const data = await res.json();
      setOrderLists(data || []);
    };

    fetchProducts();
  }, []);

  const handlePaymentAction = async (orderId: string, action: string) => {
    try {
      const res = await fetch(`/api/order/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payment_actions: action,
        }),
      });

      if (!res.ok) throw new Error("Failed to update");

      // Update UI instantly (no refresh)
      setOrderLists((prev) =>
        prev.map((order) =>
          order.order_id === orderId
            ? { ...order, payment_actions: action }
            : order
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const formattedOrders = ordersLists.map((order) => {
    console.log(order.customer?.first_name, 'order.customer?.first_name');

    return {
      id: order.order_id,
      date: new Date(order.order_date).toLocaleString(), // or format as needed
      customer: `${order.customer?.first_name || ""} ${order.customer?.last_name || ""}`,
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

  const handlePaymentActionModal = (
    id: string | null,
    status: string,
    note?: string
  ) => {
    console.log(id, status, note);
    // API call here
  };

  return (
    <div className="bg-[#f6f6f7] min-h-screen p-5">

      <ViewOrders />

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

          {/* Orders Table */}
          <Table
            removeWrapper
            aria-label="Orders Table"
            classNames={{
              table: "min-w-full",
              th: "bg-[#fafafa] text-gray-600 text-xs font-semibold border-b h-10",
              td: "py-4 text-sm border-b border-gray-100",
            }}
          >
            <TableHeader>
              <TableColumn>Order</TableColumn>
              <TableColumn>Date</TableColumn>
              <TableColumn>Customer</TableColumn>
              <TableColumn>Total</TableColumn>
              <TableColumn>Payment status</TableColumn>
              <TableColumn>Fulfillment status</TableColumn>
              <TableColumn>Items</TableColumn>
              <TableColumn>Delivery status</TableColumn>
              <TableColumn>Delivery method</TableColumn>
              <TableColumn>Payment actions</TableColumn>
            </TableHeader>

            <TableBody emptyContent="No orders found">
              {formattedOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-semibold text-blue-700 cursor-pointer">
                    {order.id}
                  </TableCell>

                  <TableCell>{order.date}</TableCell>

                  <TableCell>{order.customer}</TableCell>

                  <TableCell>{order.total}</TableCell>

                  <TableCell>
                    <Chip
                      size="sm"
                      radius="sm"
                      className="bg-gray-100 text-gray-700 border border-gray-200"
                    >
                      {order.paymentStatus}
                    </Chip>
                  </TableCell>

                  <TableCell>
                    <Chip
                      size="sm"
                      radius="sm"
                      className="bg-yellow-100 text-yellow-800 border border-yellow-200"
                    >
                      {order.fulfillmentStatus}
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
                        <div className="w-[340px] bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
                          {/* Header */}
                          <div className="p-3 border-b border-gray-100">
                            <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
                              Fulfillment in progress
                            </span>
                          </div>

                          {/* Shipping Box */}
                          <div className="p-4">
                            <div className="bg-[#f7f7f7] rounded-2xl p-4">
                              <p className="text-sm font-medium text-black mb-4">Shipping</p>

                              <div className="space-y-4">
                                {order.orderItems.map((item: any, index: any) => (
                                  <div
                                    key={index}
                                    className="flex items-start justify-between gap-3"
                                  >
                                    <div className="flex gap-3">
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-12 h-12 rounded-md object-cover border"
                                      />

                                      <p className="text-sm text-[#1f1f1f] leading-6 underline">
                                        {item.name}
                                      </p>
                                    </div>

                                    <span className="text-sm font-medium whitespace-nowrap">
                                      × {item.qty}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>

                  <TableCell>{order.deliveryStatus}</TableCell>

                  <TableCell>{order.deliveryMethod}</TableCell>
                  <TableCell>
                    {order.paymentAction === "Pending" ? (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-green-600 text-white"
                          onClick={() => {
                            setSelectedOrderId(order.id);
                            setIsModalOpen(true);
                            setInputValue(order.transactionId)
                          }}
                        >
                          Accept
                        </Button>

                        <Button
                          size="sm"
                          variant="bordered"
                          className="border-red-400 text-red-600"
                          onClick={() => handlePaymentAction(order.id, "Declined")}
                        >
                          Decline
                        </Button>
                      </div>
                    ) : (
                      <Chip
                        size="sm"
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
              variant="light"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>

            <Button
              className="bg-green-600 text-white"
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