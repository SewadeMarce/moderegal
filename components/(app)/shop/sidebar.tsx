'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { use } from "@/context";
import { X } from "lucide-react";
import { useCallback } from 'react';
import { CategoriesType } from '@/types';

export default function Sidebar({ categories }: { categories: CategoriesType }) {
    const Categories = [{ id: '0', name: 'all' }, ...categories];
    const { showFilters,setShowFilters } = use();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // --- LOGIQUE DE SYNCHRONISATION URL ---
    
    const updateQuery = useCallback((name: string, value: string | null) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(name, value);
        } else {
            params.delete(name);
        }
        // scroll: false pour éviter de remonter en haut de page à chaque clic
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, [searchParams, pathname, router]);

    //const clearFilters = () => router.push(pathname);

    // --- RÉCUPÉRATION DES VALEURS DEPUIS L'URL ---

    const selectedCategory = searchParams.get('category') || 'all';


    return (
        <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-72 bg-white p-8 rounded-3xl shadow-sm h-fit sticky top-24 z-100`}>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold text-regal-700">Filtres</h2>
                <button
                    onClick={()=>setShowFilters(!showFilters)}
                    className="text-christi-500 hover:text-christi-600 text-sm font-medium flex items-center gap-1"
                >
              <X size={16} />
                </button>
            </div>

            {/* Catégories */}
            <div className="mb-10">
                <h3 className="font-semibold text-regal-600 mb-4">Catégories</h3>
                <div className="space-y-3">
                    {Categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => updateQuery('category', cat.name === 'all' ? null : cat.id)}
                            className={`w-full text-left px-5 py-3 rounded-2xl transition-all ${selectedCategory === cat.name
                                ? 'bg-regal-500 text-white'
                                : 'hover:bg-gray-100 text-gray-700'
                                }`}
                        >
                            {cat.name === 'all' ? 'Toutes les catégories' : cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            
           
        </div>
    );
}