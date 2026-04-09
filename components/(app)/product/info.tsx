'use client';
import AddBtn, { QuantityStepper } from "@/components/ui/(app)/btn-action";
import FavoriteButton from "@/components/ui/btn-favorites";
import {RotateCcw, Shield, Star, Truck } from "lucide-react";
import { useState } from "react";


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

export default function Infos({ product=pd,favorite }: { product: ProductType ,favorite:boolean}) {

  const [selectedSize, setSelectedSize] = useState<string>(product.size[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.color[0]);


  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-3">
          <span className="px-4 py-1.5 bg-christi-500 text-white text-sm font-medium rounded-full">
            {product.category.toUpperCase()}
          </span>
          {product.is_promo && (
            <span className="px-4 py-1.5 bg-yellow-500 text-regal-700 text-sm font-bold rounded-full">
              PROMO
            </span>
          )}
        </div>

        <h1 className="text-4xl font-bold text-regal-700 leading-tight">
          {product.name}
        </h1>

        <div className="flex items-center gap-4 mt-4">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={22} fill="currentColor" />
            ))}
          </div>
          <span className="text-gray-600">(128 avis)</span>
        </div>
      </div>

      {/* Prix */}
      <div className="text-5xl font-bold text-regal-600">
        {product.price.toLocaleString()} FCFA
      </div>

      {/* Description */}
      <div>
        <h3 className="font-semibold text-lg mb-3 text-regal-700">Description</h3>
        <p className="text-gray-600 leading-relaxed">{product.description}</p>
      </div>

      {/* Tailles */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-lg text-regal-700">Taille</h3>
          <a href="#" className="text-sm text-christi-500 hover:underline">Guide des tailles</a>
        </div>
        <div className="flex gap-3 flex-wrap">
          {product.size.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-6 py-3 rounded-2xl font-medium transition-all border ${selectedSize === size
                ? 'bg-regal-500 text-white border-regal-500'
                : 'bg-white border-gray-300 hover:border-regal-400'
                }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Couleurs */}
      <div>
        <h3 className="font-semibold text-lg mb-3 text-regal-700">Couleur</h3>
        <div className="flex gap-4">
          {product.color.map((color, index) => (
            <button
              key={index}
              onClick={() => setSelectedColor(color)}
              className={`w-12 h-12 rounded-2xl border-4 transition-all ${selectedColor === color
                ? 'border-regal-500 scale-110'
                : 'border-white shadow-sm'
                }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Quantité */}
      <QuantityStepper productId={product.id} />
      {/* Boutons d'action */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <AddBtn 
        productId={product.id}
         product={{ 
          name: product.name, 
          price: Number(product.price), 
          image_url: product.image_url,
          size:selectedSize,
          color:selectedColor,
           }} />

        {/* <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`px-8 py-6 rounded-3xl border-2 flex items-center justify-center transition-all ${isWishlisted
            ? 'bg-red-50 border-red-500 text-red-500'
            : 'border-gray-300 hover:border-regal-400'
            }`}
        >
          <Heart size={28} className={isWishlisted ? 'fill-current' : ''} />
        </button> */}
        <FavoriteButton 
        productId={product.id}
        isInitiallyFavorite={favorite}
        />
      </div>

      {/* Informations livraison & garantie */}
      <div className="grid grid-cols-3 gap-4 pt-8 border-t">
        <div className="flex flex-col items-center text-center">
          <Truck className="text-christi-500 mb-2" size={32} />
          <p className="text-sm font-medium">Livraison rapide</p>
          <p className="text-xs text-gray-500">2-4 jours</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Shield className="text-christi-500 mb-2" size={32} />
          <p className="text-sm font-medium">Paiement sécurisé</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <RotateCcw className="text-christi-500 mb-2" size={32} />
          <p className="text-sm font-medium">Retour facile</p>
          <p className="text-xs text-gray-500">30 jours</p>
        </div>
      </div>
    </div>
  )
}