"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { Formik, Form } from "formik";
import { supabase } from "@/lib/db";

export default function Checkout() {
  const { data: session } = useSession();
  const { cart } = useCart();
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [txnId, setTxnId] = useState("");
  const [formData, setFormData] = useState<any>({});

  const Field = ({ label, children }: any) => (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-800">
        {label}
      </label>
      <div>{children}</div>
    </div>
  );


  const subtotal = cart.reduce(
    (acc: number, item: any) => acc + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 50 : 0;
  const total = subtotal + shipping;

  const upiId = "omdiyora58@okicici";
  const name = "DITTU STORE";

  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    name
  )}&am=${total}&cu=INR`;

  // ❌ Empty cart
  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl">Your cart is empty</h2>
        <button
          onClick={() => router.push("/")}
          className="mt-4 bg-black text-white px-6 py-2 rounded-full"
        >
          Go Shopping
        </button>
      </div>
    );
  }


  const handleOrderSubmit = async () => {
    if (!txnId) {
      alert("Enter transaction ID");
      return;
    }

    try {
      const { error } = await supabase.from("orders").insert([
        {
          customer_id: session?.user?.id || null,
          customer_name: formData.name,
          email: formData.email,
          phone_number: formData.phone_number,

          address: formData.address,
          city: formData.city,
          state: formData.state,
          pin_code: formData.pin_code,

          items: cart,

          subtotal,
          shipping,
          total,

          payment_method: "upi",
          payment_status: "pending",
          order_status: "pending",

          notes: formData.notes,
          transaction_id: txnId,
        },
      ]);

      if (error) throw error;

      alert("✅ Order placed successfully!");

      // 👉 optional: clear cart here

      router.push("/");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to place order");
    }
  };


  const handleSubmit = async (values: any) => {
    setFormData(values);   // store form data
    onOpen();              // open QR modal
  };

  return (
    <div className="min-h-screen bg-[#fcfaf7] px-6 py-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        {/* LEFT SIDE */}
        <div>
          <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

          <h2 className="text-sm font-medium mb-4">Shipping Information</h2>

          <Formik
            initialValues={{
              name: session?.user
                ? `${session.user.first_name ?? ""} ${session.user.last_name ?? ""}`
                : "",
              email: session?.user.email || "",
              phone_number: "",
              city: "",
              state: "",
              pin_code: "",
              address: "",
              notes: "",
            }}
            onSubmit={handleSubmit}
          >
            {({ handleChange, values, setFieldValue }) => (

              <Form className="space-y-6">
                <Field label="Full name *">
                  <Input
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    variant="bordered"
                    placeholder="Enter full name"
                  />
                </Field>
                <Field label="Email address *">
                  <Input
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    variant="bordered"
                    placeholder="Enter Email address"
                  />
                </Field>
                <Field label="Phone number *">
                  <Input
                    name="phone_number"
                    value={values.phone_number}
                    onChange={handleChange}
                    variant="bordered"
                    placeholder="Enter Phone number"
                  />
                </Field>
                <div className="grid grid-cols-3 gap-3">
                  <Field label="State *">
                    <Input
                      name="state"
                      value={values.state}
                      onChange={handleChange}
                      variant="bordered"
                      placeholder="Enter State Name"
                    />
                  </Field>
                  <Field label="City *">
                    <Input
                      name="city"
                      value={values.city}
                      onChange={handleChange}
                      variant="bordered"
                      placeholder="Enter City Name"
                    />
                  </Field>

                  <Field label="PIN Code *">
                    <Input
                      name="pin_code"
                      value={values.pin_code}
                      onChange={handleChange}
                      variant="bordered"
                      placeholder="Enter PIN Code"
                    />
                  </Field>

                </div>
                <div>
                  <label className="text-sm font-medium">Address</label>
                  <Textarea
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    className="mt-2 w-full"
                    variant="bordered"
                    placeholder="Enter Your Address"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Notes</label>
                  <Textarea
                    name="notes"
                    value={values.notes}
                    onChange={handleChange}
                    className="mt-2 w-full"
                    variant="bordered"
                    placeholder="Enter Your Notes"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white p-6 rounded-xl shadow-sm">

          <h2 className="text-sm font-medium mb-4">Review your cart</h2>

          {/* CART ITEMS */}
          <div className="space-y-4 mb-6">
            {cart.map((item: any) => (
              <div key={item.id} className="flex gap-4 items-center">
                <img
                  src={item.image}
                  className="w-14 h-14 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="text-sm">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    {item.quantity} × ₹{item.price}
                  </p>
                </div>
                <p className="text-sm font-medium">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          {/* PRICE */}
          <div className="text-sm space-y-2 border-t pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{shipping}</span>
            </div>

            <div className="flex justify-between font-medium text-black">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <div className="mt-2">

            <RadioGroup
              label="Select Payment Method"
              value={paymentMethod}
              onValueChange={setPaymentMethod}
            >
              <Radio value="upi">Pay with UPI</Radio>
              {/* <Radio value="bank">Bank Transfer</Radio> */}
            </RadioGroup>
          </div>

          {/* PAY BUTTON */}
          <Button
            className="w-full mt-5 bg-black text-white rounded-full"
            onPress={() => {
              if (paymentMethod === "upi") {
                onOpen();
              } else {
                alert("Bank transfer flow coming soon");
              }
            }}
          >
            Confirm
          </Button>

          <p className="text-xs text-gray-400 mt-3 text-center">
            Secure Checkout • UPI Supported
          </p>
        </div>

        <Modal isOpen={isOpen} onClose={onClose} placement="center">
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              Complete UPI Payment
            </ModalHeader>

            <ModalBody className="flex flex-col items-center">

              {/* QR CODE */}
              <QRCodeCanvas value={upiUrl} size={200} />

              <p className="text-sm text-gray-500 mt-2">
                Scan & pay using Google Pay / PhonePe
              </p>

              {/* TXN INPUT */}
              <Input
                label="Enter UPI Transaction ID"
                placeholder="e.g. 1234567890"
                value={txnId}
                variant="bordered"
                onChange={(e) => setTxnId(e.target.value)}
              />

              {/* OPTIONAL AUTO VERIFY INFO */}
              <p className="text-xs text-gray-400 text-center">
                Auto verification is not free. Enter Transaction ID for manual verification.
              </p>

            </ModalBody>

            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cancel
              </Button>

              <Button
                className="bg-black text-white"
                onPress={handleOrderSubmit}
              >
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}