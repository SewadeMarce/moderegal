
import { getAllProducts } from '@/lib/data';

export default async function AdminProductsPage() {
  const filteredProducts = getAllProducts()


  return (
    <div>
      <h1 className="text-4xl font-bold text-white">Gestion des Produits</h1>
      <p className="text-gray-400 mt-2">{filteredProducts.length} produits au total</p>
    </div>

  );
}