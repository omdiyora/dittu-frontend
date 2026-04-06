"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/db";
import { Tooltip } from "@heroui/react";
import { Button, Chip, Input, Select, SelectItem } from "@nextui-org/react";

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // 🔥 Fetch Orders
  const fetchOrders = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setOrders(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Approve Payment
  const approvePayment = async (id: string) => {
    await supabase
      .from("orders")
      .update({ payment_status: "paid" })
      .eq("id", id);

    fetchOrders();
  };

  // ✅ Update Order Status
  const updateOrderStatus = async (id: string, status: string) => {
    await supabase
      .from("orders")
      .update({ order_status: status })
      .eq("id", id);

    fetchOrders();
  };

  // 🎨 Status color
  const getStatusColor = (status: string) => {
    if (status === "paid" || status === "delivered") return "success";
    if (status === "pending") return "warning";
    if (status === "rejected") return "danger";
    return "default";
  };

  // 📄 Pagination
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const paginatedData = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 bg-white shadow-md rounded-lg w-full">

      {/* HEADER */}
      <div className="flex justify-between items-center h-20">
        <div className="font-bold text-[22px]">Orders</div>

        <Input
          placeholder="Search orders..."
          className="w-80"
        />
      </div>

      {/* TABLE */}
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden">

          <thead>
            <tr className="bg-gray-200 text-left text-gray-700">
              {/* <th className="p-3">#</th> */}
              <th className="p-3">Product Details</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Order ID</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((order, index) => (
              <tr
                key={order.id}
                className="border-t hover:bg-gray-100 transition"
              >
                {/* INDEX */}
                {/* <td className="p-3">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td> */}
                <td className="p-3">
                  <div className="flex items-center gap-3">

                    {/* PRODUCT IMAGE */}
                    <img
                      src={order.items?.[0]?.image}
                      className="w-12 h-12 object-cover rounded-md border"
                    />

                    {/* PRODUCT INFO */}
                    <div>
                      <p className="font-medium text-sm">
                        {order.items?.[0]?.name}
                      </p>

                      <p className="text-xs text-gray-500">
                        {order.items?.[0]?.quantity} × ₹{order.items?.[0]?.price}
                      </p>

                      {/* MULTIPLE ITEMS */}
                      {order.items?.length > 1 && (
                        <p className="text-xs text-gray-400">
                          +{order.items.length - 1} more items
                        </p>
                      )}
                    </div>

                  </div>
                </td>
                {/* CUSTOMER */}
                <td className="p-3">
                  <div className="font-medium">
                    {order.customer_name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {order.email}
                  </div>
                </td>

                {/* ORDER ID */}
                <td className="p-3">
                  #{order.id}
                </td>

                {/* AMOUNT */}
                <td className="p-3 font-medium">
                  ₹{order.total}
                </td>

                {/* PAYMENT */}
                <td className="p-3">
                  <Chip
                    size="sm"
                    color={getStatusColor(order.payment_status)}
                    variant="flat"
                  >
                    {order.payment_status}
                  </Chip>
                </td>

                {/* ORDER STATUS */}
                <td className="p-3">
                  <div className="flex gap-2 items-center">

                    {/* APPROVE BUTTON (only if pending) */}
                    {order.payment_status === "pending" && (
                      <Tooltip content="Approve Payment">
                        <Button
                          size="sm"
                          className="bg-black text-white"
                          onPress={() => approvePayment(order.id)}
                        >
                          Approve
                        </Button>
                      </Tooltip>
                    )}

                    {/* STATUS SELECT */}
                    <Select
                      size="sm"
                      className="w-40"
                      placeholder="Pending"
                      onChange={(e) =>
                        updateOrderStatus(order.id, e.target.value)
                      }
                    >
                      <SelectItem key="processing" value="processing">
                        Processing
                      </SelectItem>
                      <SelectItem key="shipped" value="shipped">
                        Shipped
                      </SelectItem>
                      <SelectItem key="delivered" value="delivered">
                        Delivered
                      </SelectItem>
                      <SelectItem key="cancelled" value="cancelled">
                        Cancelled
                      </SelectItem>
                    </Select>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="mr-2 px-4 py-2 border rounded-md disabled:opacity-50"
          >
            Previous
          </button>

          <span className="mr-2">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-4 py-2 border rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* PAGE SIZE */}
        <div className="flex items-center">
          <span className="mr-2">Show:</span>
          <select
            className="border rounded-md px-2 py-1"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[10, 20, 30, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && (
        <p className="text-center mt-4 text-gray-500">
          Loading...
        </p>
      )}
    </div>
  );
}