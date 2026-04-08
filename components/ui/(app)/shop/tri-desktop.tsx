'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // On récupère la valeur actuelle dans l'URL ou "newest" par défaut
  const currentSort = searchParams.get('sort') || 'newest';

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    
    // Pousse la nouvelle URL (ex: /boutique?sort=price-low)
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="hidden lg:flex items-center gap-3">
      <span className="text-regal-600 font-medium">Trier par :</span>
      <select
        value={currentSort}
        onChange={(e) => handleSortChange(e.target.value)}
        className="bg-white border border-gray-200 rounded-2xl px-6 py-3 focus:outline-none focus:border-regal-500"
      >
        <option value="newest">Plus récents</option>
        <option value="price-low">Prix croissant</option>
        <option value="price-high">Prix décroissant</option>
        <option value="name">Nom (A-Z)</option>
      </select>
    </div>
  );
}