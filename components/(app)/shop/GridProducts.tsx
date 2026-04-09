import { getAllProducts, getCurrentUser, getUserFavoritesIds } from "@/lib/data";
import ProductCard from "../product/Card";

export default async function GridProducts({ searchParams }:{ searchParams: { query?: string; category?: string } }) {
  const data = {
    search : searchParams?.query || '',
    category_id : searchParams.category || 'all',
   
  }
  
  const filteredProducts = await getAllProducts(data); // Récupère les produits filtrés selon les critères de l'URL
    const user = await getCurrentUser()
    const favoriteIds = user?.id
      ? await getUserFavoritesIds(user.id)
      : [];
  return (
    <>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} 
            isInitiallyFavorite={favoriteIds.includes(product.id)}
            product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-6">😕</div>
          <h3 className="text-2xl font-semibold text-regal-700 mb-3">Aucun produit trouvé</h3>
          <p className="text-gray-600 mb-8">Essayez de modifier vos filtres</p>
        </div>
      )}
      </>
  )
}