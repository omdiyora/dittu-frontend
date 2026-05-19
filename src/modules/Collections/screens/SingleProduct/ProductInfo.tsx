'use client';

import { useEffect, useState } from 'react';
import { Heart, Plus, Truck, Package } from 'lucide-react';
import { useCart } from "@/context/CartContext";
import { useSnackbar } from "notistack";
import { useSession } from "next-auth/react";

export default function ProductInfo({ product }: any) {
  const { data: session } = useSession();

  const [open, setOpen] = useState<string | null>('features');
  const [currentUser, setCurrentUser] = useState<any>();

  const { enqueueSnackbar } = useSnackbar();
  const { addToCart } = useCart();

  const toggle = (section: string) => {
    setOpen(open === section ? null : section);
  };

  // Accordion
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
      <div className="border-b border-gray-200">
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
          className={`grid transition-all duration-300 ease-in-out ${isOpen
              ? 'grid-rows-[1fr] opacity-100'
              : 'grid-rows-[0fr] opacity-0'
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

  // Add To Cart
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

  // Fetch User
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!session?.user?.id) return;

        const res = await fetch(`/api/users/${session?.user.id}`);
        const data = await res.json();

        setCurrentUser(data.data || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [session]);

  // Wishlist
  const handleWishlist = async () => {
    try {
      const currentWishlist = currentUser?.wishlist || [];

      const productId = product?.id;

      const alreadyExists = currentWishlist.includes(productId);

      const updatedWishlist = alreadyExists
        ? currentWishlist.filter((id: string) => id !== productId)
        : [...currentWishlist, productId];

      const response = await fetch(`/api/users/${session?.user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wishlist: updatedWishlist,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update wishlist");
      }

      enqueueSnackbar(
        alreadyExists
          ? "Removed from wishlist"
          : "Added to wishlist",
        {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
          autoHideDuration: 1500,
        }
      );

      const res = await fetch(`/api/users/${session?.user.id}`);
      const data = await res.json();

      setCurrentUser(data.data || []);

    } catch (error) {
      console.error(error);

      enqueueSnackbar("Something went wrong", {
        variant: "error",
      });
    }
  };

  const isWishlisted = currentUser?.wishlist?.includes(product?.id);

  return (
    <div className="space-y-6 mb-4">

      {/* Product Info */}
      <div className="space-y-3">

        {product?.badge && (
          <span className="inline-block bg-green-700 text-white text-[12px] px-2 py-[4px] rounded-md">
            {product?.badge}
          </span>
        )}

        {/* Title */}
        <h1 className="text-[34px] sm:text-[28px] leading-[1.1] font-medium text-gray-900">
          {product?.name}
        </h1>

        {/* Price */}
        <div className="flex items-center gap-2 text-[20px] font-medium text-gray-900">

          <span>
            ₹{product?.price}
          </span>

          {product?.original_price && (
            <span className="line-through text-gray-400 text-[18px] font-normal">
              ₹{product?.original_price}
            </span>
          )}

        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 text-[14px] leading-none">
          <span className="text-orange-500">★★★★★</span>

          <span className="text-gray-500">
            (3)
          </span>
        </div>

      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:grid sm:grid-cols-[1fr_1fr_auto] gap-3">

        {/* Add To Cart */}
        <button
          onClick={handleAddToCart}
          className="
            bg-black text-white
            h-[52px] sm:h-[56px]
            px-6
            rounded-full
            text-[15px] sm:text-[16px]
            font-medium
            hover:opacity-90
            transition
            w-full
          "
        >
          ADD TO CART
        </button>

        {/* Buy Now */}
        <button
          className="
            border border-black
            h-[52px] sm:h-[56px]
            px-6
            rounded-full
            text-[15px] sm:text-[16px]
            font-medium
            hover:bg-black hover:text-white
            transition
            w-full
          "
        >
          BUY NOW
        </button>

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className={`
            w-full sm:w-[56px]
            h-[52px] sm:h-[56px]
            rounded-full
            flex items-center justify-center
            transition
            ${isWishlisted
              ? "bg-black text-white border-black"
              : "border border-black hover:bg-black hover:text-white"
            }
          `}
        >
          <Heart
            size={18}
            fill={isWishlisted ? "currentColor" : "none"}
          />
        </button>

      </div>

      {/* Delivery Info */}
      <div className="border-t border-gray-200 pt-5 space-y-4 text-[14px] text-black">

        <div className="flex items-center gap-3">
          <Truck size={17} />

          <span>
            Estimated delivery: Mar 30 – Apr 03
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Package size={17} />

          <span>
            30-day money-back guarantee
          </span>
        </div>

      </div>

      {/* Accordion */}
      <div className="border-t border-gray-200 pt-4">

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

          <p className="text-sm text-gray-500">
            No product details available.
          </p>

        )}

      </div>

    </div>
  );
}