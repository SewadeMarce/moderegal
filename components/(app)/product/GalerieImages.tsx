'use client';
import { useState } from "react";
import { Product } from "@/types";
import Image from "next/image";
const pd ={
  id: '33333333-3333-3333-3333-000000000001',
  name: 'Chemise Oxford Slim',
  slug: 'chemise-oxford-slim',
  description: 'Chemise Oxford coupe slim, idéale pour le bureau ou les sorties.',
  price: '15000',
  category_id: '22222222-2222-2222-2222-000000000001',
  image_url: '/images/img-24.jpg',
  images: [
    {
      alt: 'Veste face',
      url: '/images/img-24.jpg',
      name: 'Face',
      width: 4000,
      height: 6000
    },
    {
      alt: 'Veste face',
      url: '/images/img-11.jpg',
      name: 'Face',
      width: 3648,
      height: 3648
    },
    {
      alt: 'Veste dos',
      url: '/images/img-25.jpg',
      name: 'Dos',
      width: 2339,
      height: 3508
    }
  ],
  size: [ 'S', 'M', 'L', 'XL' ],
  color: [ '#FFFFFF', '#679FFA', '#87CEEB' ],
  stock: 45,
  is_new: true,
  is_promo: false,
  discount_price: null,
  discount_percentage: null,
  created_at: '2026-04-08T10:44:49.517Z',
  updated_at: '2026-04-08T10:44:49.517Z',
  category: 'Vêtements Hommes'
}
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

export default function GalerieImages({ product=pd }: { product: ProductType }) {
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