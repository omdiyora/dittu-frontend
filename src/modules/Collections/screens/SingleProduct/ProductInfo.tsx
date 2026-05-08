'use client';

import { useState } from 'react';
import { Heart, Plus, Truck, Package } from 'lucide-react';
import { useCart } from "@/context/CartContext"; // ✅ ADD
import { useSnackbar } from "notistack";

export default function ProductInfo({ product }: any) {
  const [open, setOpen] = useState<string | null>('features');

  const { enqueueSnackbar } = useSnackbar();
  const { addToCart } = useCart(); // ✅ ADD

  const toggle = (section: string) => {
    setOpen(open === section ? null : section);
  };

  // 🔥 Reusable Accordion Item
  const AccordionItem = ({
    title,
    id,
    children,
  }: {
    title: string;
    id: string;
    children: React.ReactNode;
  }) => {
    const isOpen = open === id;

    return (
      <div className="border-b">
        <button
          onClick={() => toggle(id)}
          className="w-full flex justify-between items-center py-4 text-[14px] font-medium hover:text-black transition"
        >
          {title}

          <Plus
            size={18}
            className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : ''
              }`}
          />
        </button>

        <div
          className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
            }`}
        >
          <div className="overflow-hidden">
            <div className="pb-4 text-[14px] text-gray-600 leading-relaxed">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ✅ HANDLE ADD TO CART
  const handleAddToCart = () => {
    // @ts-ignore
    addToCart({
      id: product?.id,
      name: product?.name,
      price:
        typeof product?.price === "string"
          ? Number(product?.price.replace(/[^\d]/g, ""))
          : product?.price,
      image: product?.image || product?.images?.[0] || "",
    });

    enqueueSnackbar("Added to cart", {
      variant: "success",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
      autoHideDuration: 1500,
    });
  };

  return (
    <div className="space-y-6">

      {/* Top Info */}
      <div className="space-y-2">

        {product?.badge && (
          <span className="inline-block bg-green-700 text-white text-[12px] px-2 py-[2px] rounded">
            {product?.badge}
          </span>
        )}

        <h1 className="text-[28px] font-medium leading-tight text-gray-900">
          {product?.name}
        </h1>

        {/* <div className="text-[18px] font-medium text-gray-900">
          {product?.price}
        </div> */}
        <div className="text-[18px] font-medium text-gray-900">
          <span className="font-medium">₹{product?.price}</span>

          {product?.original_price && (
            <span className="line-through text-gray-400 ml-2">
              ₹{product?.original_price}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-[14px] leading-none">
          <span className="text-orange-500">★★★★★</span>
          <span className="text-gray-500">(3)</span>
        </div>

      </div>

      {/* CTA */}
      <div className="grid grid-cols-[1fr_1fr_auto] gap-3">

        {/* ✅ UPDATED BUTTON */}
        <button
          onClick={handleAddToCart}
          className="bg-black text-white py-3 rounded-full font-medium hover:opacity-90 transition"
        >
          ADD TO CART
        </button>

        <button className="border border-black py-3 rounded-full font-medium hover:bg-black hover:text-white transition">
          BUY NOW
        </button>

        <button className="w-[48px] h-[48px] border border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition">
          <Heart size={18} />
        </button>

      </div>

      {/* Delivery Info */}
      <div className="border-t pt-4 space-y-3 text-[14px] text-black">

        <div className="flex items-center gap-2">
          <Truck size={16} />
          <span>Estimated delivery: Mar 30 – Apr 03</span>
        </div>

        <div className="flex items-center gap-2">
          <Package size={16} />
          <span>30-day money-back guarantee</span>
        </div>

      </div>

      {/* Accordion */}
      {/* Accordion */}
      <div className="border-t pt-4">
        {product?.product_details?.length > 0 ? (
          product.product_details.map((item: any, index: number) => (
            <AccordionItem
              key={index}
              title={item.title?.toUpperCase()}
              id={`accordion-${index}`}
            >
              {item.accordion_description}
            </AccordionItem>
          ))
        ) : (
          <p className="text-sm text-gray-500">No product details available.</p>
        )}
      </div>

    </div>
  );
}