"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  // Button,
  Input,
} from "@heroui/react";
import { Select, SelectItem, Button } from "@nextui-org/react";
import { Tooltip } from "@heroui/react";
import {
  Search,
  ChevronDown,
  MoreVertical,
  Plus,
  Download,
  User,
  CheckCheck,
  Printer,
} from "lucide-react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@heroui/react";
import EditUsers from "../form/EditUser";
import UpdateUserModal from "../form/UpdateUserModal";
import AddCustomer from "../form/AddCustomer";
import UpdateUserDrawer from "../form/UpdateUserModal";


export const EyeIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const DeleteIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M8.60834 13.75H11.3833"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.91669 10.4167H12.0834"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const PlusIcon = ({
  size = 24,
  width,
  height = 24,
  ...props
}: {
  size?: number;
  width?: number;
  height?: number;
}) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M6 12h12" />
        <path d="M12 18V6" />
      </g>
    </svg>
  );
};

export const EditIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M2.5 18.3333H17.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  );
};

export default function UsersList() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [userLists, setUserLists] = useState<any[]>([]);
  const [orderLists, setOrderLists] = useState<any[]>([]);
  const [isEdit, setIsEdit] = useState(false);

  console.log(isEdit, 'isEdit');


  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`/api/users`);
      const data = await res.json();
      setUserLists(data.data || []);
    };
    const fetchOrders = async () => {
      const res = await fetch(`/api/order`);
      const data = await res.json();
      setOrderLists(data || []);
    };
    setIsEdit(false)

    fetchProducts();
    fetchOrders();
  }, [isEdit]);



  const formattedOrders = userLists.map((item) => {
    // Find all orders for this user
    const userOrders = orderLists.filter(
      (order) => order.customer_id.toString() === item.id.toString()
    );

    // Total order count
    const totalOrders = userOrders.length;

    // Total amount spend
    const totalAmountSpend = userOrders.reduce(
      (sum, order) => sum + Number(order.total || 0),
      0
    );

    return {
      id: item.id,
      customer: `${item.first_name || ""} ${item.last_name || ""}`,
      email: item.email,
      phone: item.phone,

      // Dynamic values
      orders: totalOrders,
      amountSpend: `₹${totalAmountSpend.toLocaleString()}`,

      accountStatus: item.account_status,
      createdAt: new Date(item.created_at).toLocaleString(),
      role: item.role
    };
  });

  const filteredUsers = formattedOrders.filter((user) => {
    // Status Filter
    const matchesStatus =
      statusFilter === "all"
        ? true
        : user.accountStatus.toLowerCase() === statusFilter;

    // Search Filter
    const matchesSearch = Object.values(user)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="bg-[#f6f6f7] min-h-screen p-5">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <User size={18} className="text-gray-700" />
            <h1 className="text-[22px] font-semibold text-black">Customers</h1>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Button
              startContent={<Download size={16} />}
              className="bg-black text-white rounded-2xl"
            >
              Export Data
            </Button>
            <AddCustomer />
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          {/* Top Filter */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <div className="flex items-end gap-4 w-full">
              {/* Account Status */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Account Status
                </label>

                <Select
                  selectedKeys={[statusFilter]}
                  onSelectionChange={(keys) => {
                    const value = Array.from(keys)[0] as string;
                    setStatusFilter(value);
                  }}
                  size="sm"
                  variant="bordered"
                  className="w-[160px]"
                  selectorIcon={<ChevronDown size={14} />}
                >
                  <SelectItem key="all">All</SelectItem>
                  <SelectItem key="active">Active</SelectItem>
                  <SelectItem key="inactive">Inactive</SelectItem>
                </Select>
              </div>

              {/* Search */}
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-sm font-medium text-gray-700">
                  Search
                </label>

                <Input
                  placeholder="Search anything"
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
            </div>
          </div>

          {/* Orders Table */}
          <Table
            removeWrapper
            aria-label="Customers Table"
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
              <TableColumn>Role</TableColumn>
              <TableColumn>Created At</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>

            <TableBody emptyContent="No customers found">
              {filteredUsers.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="cursor-pointer">
                    {order.id}
                  </TableCell>

                  <TableCell>{order.customer}</TableCell>

                  <TableCell>{order.email}</TableCell>

                  <TableCell>{order.phone}</TableCell>
                  <TableCell>{order.orders}</TableCell>
                  <TableCell>{order.amountSpend}</TableCell>
                  <TableCell className="capitalize">{order.accountStatus}</TableCell>
                  <TableCell className="capitalize">{order.role}</TableCell>
                  <TableCell>{order.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {/* View */}

                      <Tooltip content="Edit">
                        <Button
                          isIconOnly
                          color="default"
                          aria-label="Edit"
                          size="md"
                          className="ml-1 rounded-lg bg-[#f6f6f6]"
                        // onClick={() => handleEditPartiallyAchievedOption(index)}
                        >
                          <EyeIcon />
                        </Button>

                      </Tooltip>
                      <Tooltip content="Edit">
                        <UpdateUserDrawer customerData={order} setIsEdit={setIsEdit} />
                      </Tooltip>
                      <Tooltip color="danger" content="Delete">

                        <Button
                          isIconOnly
                          color="danger"
                          aria-label="Delete"
                          size="md"
                          className="ml-1 rounded-lg bg-[#f6f6f6] text-red-600"
                        // onClick={() => handleDeletePartiallyAchievedOption(index)}
                        >
                          <DeleteIcon />
                        </Button>
                      </Tooltip>
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