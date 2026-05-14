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
  User,
} from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@heroui/react";
import EditUsers from "../form/EditUser";

export default function UsersList() {
  const [search, setSearch] = useState("");
  const [ordersLists, setOrderLists] = useState<any[]>([]);


  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`/api/users`);
      const data = await res.json();
      setOrderLists(data.data || []);
    };

    fetchProducts();
  }, []);

  console.log(ordersLists, 'ordersLists');


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


  const formattedOrders = ordersLists.map((item) => {

    return {
      id: item.id,
      customer: `${item.first_name || ""} ${item.last_name || ""}`,
      email: item.email,
      phone: 'N/A',
      orders: 'N/A',
      amountSpend: 'N/A',
      accountStatus: 'N/A',
      createdAt: new Date(item.created_at).toLocaleString(), // or format as needed

    };
  });

  return (
    <div className="bg-[#f6f6f7] min-h-screen p-5">
      {/* <EditUsers/> */}
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <User size={18} className="text-gray-700" />
            <h1 className="text-[22px] font-semibold text-black">Customers</h1>
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
              <TableColumn>ID</TableColumn>
              <TableColumn>Customer</TableColumn>
              <TableColumn>Email</TableColumn>
              <TableColumn>Phone</TableColumn>
              <TableColumn>Orders</TableColumn>
              <TableColumn>Amount Spend</TableColumn>
              <TableColumn>Account Status</TableColumn>
              <TableColumn>Created At</TableColumn>
            </TableHeader>

            <TableBody emptyContent="No orders found">
              {formattedOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-semibold text-blue-700 cursor-pointer">
                    {order.id}
                  </TableCell>

                  <TableCell>{order.customer}</TableCell>

                  <TableCell>{order.email}</TableCell>

                  <TableCell>{order.phone}</TableCell>
                  <TableCell>{order.orders}</TableCell>
                  <TableCell>{order.amountSpend}</TableCell>
                  <TableCell className="capitalize">{order.accountStatus}</TableCell>
                  <TableCell>{order.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}