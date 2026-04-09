'use client';
import { useState } from "react";
import Image from "next/image";

type ProductType = {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: string;
    category_id: string;
    image_url: string;
     images: {
        alt: string;
        url: string;
        name: string;
        width: number;
        height: number;
    }[];
    size: string[];
    color: string[];
    stock: number;
    is_new: boolean;
    is_promo: boolean;
    discount_price: null;
    discount_percentage: null;
    created_at: string;
    updated_at: string;
    category: string;

}

export default function GalerieImages({ product}: { product: ProductType }) {
    // Simuler plusieurs images (tu peux les remplacer par de vraies URLs)
    const [images, setImages] = useState(product.images[0]);
    
    const productImages = product ? [...product.images] : [];

    return <div className="space-y-6">
        <div className="aspect-4/5  overflow-hidden rounded-3xl bg-white shadow-xl">
            <Image
                src={images.url}
                alt={images.name}
                width={images.width}
                height={images.height}
                className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
            />
        </div>

        {/* Miniatures */}
        <div className="flex gap-4">
            {productImages.map((img, index) => (
                <button
                    key={index}
                    onClick={() => setImages(img)}
                    className={`flex-1 aspect-square rounded-2xl overflow-hidden border-2 transition-all ${images.url === img.url
                        ? 'border-regal-500 scale-105'
                        : 'border-transparent hover:border-gray-300'
                        }`}
                >
                    <Image width={img.width} height={img.height} src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                </button>
            ))}
        </div>
    </div>
}