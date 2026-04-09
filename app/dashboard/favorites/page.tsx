// app/(dashboard)/favorites/page.tsx

import ProductCard from '@/components/(app)/product/Card';
import {  getCurrentUser, getFavoritesByUser } from '@/lib/data';
import { Heart } from 'lucide-react';

export default async function FavoritesPage() {

  const user = await getCurrentUser()

  const favorites = await getFavoritesByUser(user?.id as string);
  return (
    <div>
      <div className="flex items-center gap-4 mb-10">
        <Heart className="text-red-500" size={36} />
        <div>
          <h1 className="text-4xl font-bold text-regal-700">Mes Favoris</h1>
          <p className="text-gray-600">{favorites.length} produits sauvegardés</p>
        </div>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {favorites.map((product) => (
            <ProductCard
              isInitiallyFavorite={true}
              key={product.id}
              product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl">
          <Heart size={80} className="mx-auto text-gray-300 mb-6" />
          <h3 className="text-2xl font-semibold text-gray-700">Aucun favori pour le moment</h3>
          <p className="text-gray-500 mt-4">Ajoutez des produits à vos favoris pour les retrouver ici.</p>
        </div>
      )}
    </div>
  );
}