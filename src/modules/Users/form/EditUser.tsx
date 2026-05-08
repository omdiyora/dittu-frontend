"use client";

import React from "react";
import {
  Button,
  Input,
  Chip,
  Textarea,
  Card,
  CardBody,
} from "@heroui/react";

import { MoreVertical } from "lucide-react";

export default function EditUsers() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">👤 Om Diyora</h2>
        <Button variant="flat" size="sm" startContent={<MoreVertical size={16} />}>
          More actions
        </Button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Amount spent" value="₹2,002.46" />
        <StatCard title="Orders" value="2" />
        <StatCard title="Customer since" value="6 days" />
        <StatCard title="RFM group" value="Dormant" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">

          {/* Last Order */}
          <Card>
            <CardBody>
              <h4 className="font-semibold mb-3">Last order placed</h4>

              <div className="border rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">#1002</span>
                    <Chip size="sm" color="default">Refunded</Chip>
                    <Chip size="sm" color="success">Fulfilled</Chip>
                    <Chip size="sm" color="primary">Return in progress</Chip>
                  </div>
                  <span className="font-semibold">₹706.82</span>
                </div>

                <p className="text-sm text-gray-500 mt-1">
                  April 29, 2026 at 1:02 pm
                </p>

                <div className="flex justify-between items-center mt-4">
                  <div className="flex gap-3 items-center">
                    <img
                      src="https://via.placeholder.com/50"
                      className="w-12 h-12 rounded-lg"
                    />
                    <div>
                      <p className="text-sm">
                        Apple Cider Vinegar Tablets
                      </p>
                      <p className="text-xs text-gray-500">x1</p>
                    </div>
                  </div>
                  <span className="font-medium">₹599.00</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="bordered">View all orders</Button>
                <Button size="sm" color="primary">Create order</Button>
              </div>
            </CardBody>
          </Card>

          {/* Timeline */}
          <Card>
            <CardBody>
              <h4 className="font-semibold mb-3">Timeline</h4>

              <Textarea placeholder="Leave a comment..." />

              <div className="mt-3">
                <Button size="sm" color="default">Post</Button>
              </div>

              <div className="mt-5 space-y-3 text-sm">
                <div>
                  <p className="text-gray-500">Yesterday</p>
                  <p>Added phone number</p>
                </div>

                <div>
                  <p className="text-gray-500">April 29</p>
                  <p>Customer created</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-4">

          {/* Customer Info */}
          <Card>
            <CardBody>
              <h4 className="font-semibold mb-3">Customer</h4>

              <Input label="Email" defaultValue="omdiyoraa@gmail.com" />
              <Input label="Phone" defaultValue="+91 9871101487" className="mt-3" />

              <Input label="Country" defaultValue="India" className="mt-3" />
            </CardBody>
          </Card>

          {/* Marketing */}
          <Card>
            <CardBody>
              <h4 className="font-semibold mb-3">Marketing</h4>
              <div className="flex gap-2">
                <Chip>Email</Chip>
                <Chip>SMS</Chip>
              </div>
            </CardBody>
          </Card>

          {/* Tags */}
          <Card>
            <CardBody>
              <h4 className="font-semibold mb-3">Tags</h4>
              <Input placeholder="Add tags" />
            </CardBody>
          </Card>

          {/* Notes */}
          <Card>
            <CardBody>
              <h4 className="font-semibold mb-3">Notes</h4>
              <Textarea placeholder="Write notes..." />
            </CardBody>
          </Card>

        </div>
      </div>
    </div>
  );
}

/* Reusable Stat Card */
function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <Card>
      <CardBody>
        <p className="text-sm text-gray-500">{title}</p>
        <h4 className="font-semibold">{value}</h4>
      </CardBody>
    </Card>
  );
}