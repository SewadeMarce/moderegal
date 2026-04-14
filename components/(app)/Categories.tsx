// components/CategoryInfiniteScroll.tsx
'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CategoriesType } from "@/types";

export default function Categories({categories}:{categories: CategoriesType}) {

    // Mapping des icônes par slug pour garantir la correspondance
    const iconMap: Record<string, string> = {
        'accessoires': '👜',
        'chaussures': '👟',
        'vetements-hommes': '👔 👖',
        'vetements-femmes': '👗'
    };

    return (
        <section className="py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {categories.map((category) => (
                    <div 
                        key={category.id} 
                        className="group relative h-40 w-full bg-slate-100 rounded-3xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                        {/* Conteneur de l'icône (Centré) */}
                        <div className="absolute inset-0 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500">
                            {iconMap[category.slug] || '📦'}
                        </div> 
                        
                        {/* Overlay Gradient pour la lisibilité du texte */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />

                        {/* Contenu texte */}
                        <div className="absolute bottom-4 left-0 right-0 text-center">
                            <h3 className="text-white font-semibold text-lg tracking-tight">
                                {category.name}
                            </h3>
                            <p className="text-white/70 text-xs hidden md:block">
                                {category.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}




interface Category {
  id: number;
  name: string;
  image: string;
  slug: string;
  count?: number;
}

interface CategoryInfiniteScrollProps {
  categories: Category[];
  title?: string;
}

export  function CategoryInfiniteScroll({ 
  categories, 
  title = "Explorez par catégorie" 
}: CategoryInfiniteScrollProps) {

  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Dupliquer les catégories pour créer l'effet infini
  const infiniteCategories = [...categories, ...categories, ...categories];

  // Auto-scroll fluide
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrame: number;

    const autoScroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += 1; // Vitesse de défilement

        // Réinitialiser quand on atteint la fin (effet infini)
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 3) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationFrame = requestAnimationFrame(autoScroll);
    };

    animationFrame = requestAnimationFrame(autoScroll);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Drag avec la souris (pour desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeft.current = scrollRef.current?.scrollLeft || 0;
    scrollRef.current!.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    
    const x = e.pageX - (scrollRef.current.offsetLeft || 0);
    const walk = (x - startX.current) * 2; // Vitesse du drag
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
  };
    const iconMap: Record<string, string> = {
        'accessoires': '👜',
        'chaussures': '👟',
        'vetements-hommes': '👔 👖',
        'vetements-femmes': '👗'
    };

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-4xl font-bold text-regal-700">{title}</h2>
            <p className="text-gray-600 mt-2">Découvrez nos collections par catégorie</p>
          </div>
          <div className="text-sm text-gray-400 hidden md:block">
            Faites glisser ou laissez défiler →
          </div>
        </div>

        {/* Zone de défilement infini */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 cursor-grab active:cursor-grabbing scroll-smooth"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ scrollbarWidth: 'none' }}
        >
          {infiniteCategories.map((category, index) => (
          <>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {categories.map((category) => (
                    <div 
                        key={category.id} 
                        className="group relative h-40 w-full bg-slate-100 rounded-3xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                        {/* Conteneur de l'icône (Centré) */}
                        <div className="absolute inset-0 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500">
                            {iconMap[category.slug] || '📦'}
                        </div> 
                        
                        {/* Overlay Gradient pour la lisibilité du texte */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />

                        {/* Contenu texte */}
                        <div className="absolute bottom-4 left-0 right-0 text-center">
                            <h3 className="text-white font-semibold text-lg tracking-tight">
                                {category.name}
                            </h3>
                            <p className="text-white/70 text-xs hidden md:block">
                                {category.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div></>
          ))}
        </div>
      </div>
    </div>
  );
}