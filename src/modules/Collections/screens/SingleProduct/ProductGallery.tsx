'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function ProductGallery({ product }: any) {
    const [selectedImage, setSelectedImage] = useState(
        product && product[0]
    );

    return (
        <div className="flex flex-col-reverse md:flex-row gap-4">

            {/* LEFT / BOTTOM Thumbnails */}
            <div
                className="
        flex md:flex-col gap-3
        overflow-x-auto md:overflow-visible
        scrollbar-hide
        pb-1
    "
            >
                {product?.map((img: any, index: any) => (
                    <div
                        key={index}
                        onClick={() => setSelectedImage(img)}
                        className={`
                            min-w-[70px] w-[70px] h-[70px]
                            border rounded-md overflow-hidden cursor-pointer flex-shrink-0
                            ${selectedImage === img
                                ? 'border-black'
                                : 'border-gray-200'
                            }
                        `}
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

            {/* Main Image */}
            <div className="
                w-full 
                h-[320px] 
                sm:h-[420px] 
                md:w-[550px] 
                md:h-[550px]
                rounded-lg
                flex items-center justify-center
            ">
                <Image
                    src={selectedImage}
                    alt="product"
                    width={550}
                    height={550}
                    className="object-contain max-w-full max-h-full transition duration-300"
                />
            </div>

        </div>
    );
}