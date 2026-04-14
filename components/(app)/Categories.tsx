// components/CategoryInfiniteScroll.tsx
'use client';

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


