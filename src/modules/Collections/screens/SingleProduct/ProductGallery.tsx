'use client';

import Image from 'next/image';
import { useState } from 'react';

const images = [
    'https://zest-cosmo.myshopify.com/cdn/shop/files/69.jpg?v=1740561521&width=800',
    'https://zest-cosmo.myshopify.com/cdn/shop/files/3a.jpg?v=1740561521&width=800',
    'https://zest-cosmo.myshopify.com/cdn/shop/files/72.jpg?v=1740561715&width=800',
    'https://zest-cosmo.myshopify.com/cdn/shop/files/73.jpg?v=1740561767&width=800',
];

export default function ProductGallery({ product }: any) {
    const [selectedImage, setSelectedImage] = useState(product && product[0]);

    console.log(product,'productproduct');
    

    return (
        <div className="flex gap-4">

            {/* LEFT: Thumbnails */}
            <div className="flex flex-col gap-3">
                {product?.map((img: any, index: any) => (
                    <div
                        key={index}
                        onClick={() => setSelectedImage(img)}
                        className={`w-[70px] h-[70px] border rounded-md overflow-hidden cursor-pointer
              ${selectedImage === img
                                ? 'border-black'
                                : 'border-gray-200'
                            }`}
                    >
                        <Image
                            src={img}
                            alt="thumb"
                            width={70}
                            height={70}
                            className="object-cover w-full h-full"
                        />
                    </div>
                ))}
            </div>

            {/* RIGHT: Main Image */}
            <div className="w-[550px] h-[550px]  rounded-lg  flex items-center justify-center">
                <Image
                    src={selectedImage}
                    alt="product"
                    width={550}
                    height={550}
                    className="object-contain max-w-full max-h-full transition duration-300 "
                />
            </div>

        </div>
    );
}