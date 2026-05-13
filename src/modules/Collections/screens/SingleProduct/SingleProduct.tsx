'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import { ChevronRight } from 'lucide-react';
import { useRouter, useParams } from "next/navigation";

const product = {
    id: 1,
    name: 'Ultimate Facelift Day Cream',
    price: '$27.00',
    originalPrice: '$30.00',
    badge: 'New',
    images: [
        'https://zest-cosmo.myshopify.com/cdn/shop/files/69.jpg?v=1740561521&width=800',
        'https://zest-cosmo.myshopify.com/cdn/shop/files/72.jpg?v=1740561715&width=800',
        'https://zest-cosmo.myshopify.com/cdn/shop/files/73.jpg?v=1740561767&width=800',
    ],
};

export default function SingleProduct() {
    const router = useRouter();
    const params = useParams();
    const [productData, setProductData] = useState<any>(null);
    const productId = params?.id;

    console.log(productData, 'productData');


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${productId}`);
                const data = await res.json();

                setProductData(data);



            } catch (error) {
                console.error("Error fetching product", error);
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    return (
        <>
            <div className='bg-[#fcfaf7]'>
                <div className="container mx-auto px-4 md:px-8 lg:px-12">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-[14px] text-black py-4">

                        <span className="hover:text-black cursor-pointer transition">
                            Home
                        </span>

                        <ChevronRight size={14} className="text-black" />

                        <span className="hover:text-black cursor-pointer transition">
                            Bodycare
                        </span>

                        <ChevronRight size={14} className="text-black" />

                        <span className="text-black  truncate max-w-[200px]">
                            {productData?.name}
                        </span>

                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                        {/* LEFT: IMAGE GRID */}

                        {productData && <ProductGallery product={productData?.images} />}

                        {/* RIGHT: PRODUCT INFO */}
                        <ProductInfo product={productData} />

                    </div>
                </div>
            </div>
        </>
    );
}