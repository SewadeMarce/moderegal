// components/ProductHorizontalList.tsx
'use client';

import { Product } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import ProductCard from './product/Card';

interface ProductHorizontalListProps {
  title: string;
  products: Product[];
  subtitle?: string;
}

export default function ProductHorizontalList({
  title,
  products,
  subtitle
}: ProductHorizontalListProps) {

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  return (

    <div className="max-w-7xl mx-auto px-6">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-4xl font-bold text-regal-700">{title}</h2>
          {subtitle && (
            <p className="text-gray-600 mt-2 text-lg">{subtitle}</p>
          )}
        </div>

        {/* Boutons de navigation (visibles uniquement sur grand écran) */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={scrollLeft}
            className="w-12 h-12 flex items-center justify-center bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all active:scale-95"
          >
            <ChevronLeft size={24} className="text-regal-600" />
          </button>
          <button
            onClick={scrollRight}
            className="w-12 h-12 flex items-center justify-center bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all active:scale-95"
          >
            <ChevronRight size={24} className="text-regal-600" />
          </button>
        </div>
      </div>

      {/* Liste des produits - Scroll horizontal sur mobile */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide scroll-smooth"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-full sm:w-[280px] md:w-[300px] snap-start"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Indicateur de scroll pour mobile */}
      <div className="md:hidden flex justify-center gap-2 mt-4">
        {products.slice(0, 5).map((_, index) => (
          <div
            key={index}
            className="w-2 h-2 bg-gray-300 rounded-full"
          />
        ))}
      </div>
    </div>
  );
}