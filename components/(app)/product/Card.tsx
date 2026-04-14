'use client';
import { Product } from '@/types';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AddBtn from '@/components/ui/(app)/btn-action';
import FavoriteButton from '@/components/ui/btn-favorites';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
  isInitiallyFavorite:boolean
}

const ProductCard = ({ product ,isInitiallyFavorite}: ProductCardProps) => {
  const router = useRouter()


  return (
    <>
      <Link
        href={`/${product.id}`}
        className="group block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col"
      >
        <div className="relative overflow-hidden">
          {/* Image */}
          <div className="aspect-[4/5] bg-gray-100">
            <Image
              src={product.image_url}
              alt={product.name}
              width={1500}
              height={1500}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Badges en haut à gauche */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.is_new && (
              <span className="bg-christi-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md">
                NOUVEAUTÉ
              </span>
            )}
            {product.is_promo && (
              <span className="bg-yellow-500 text-regal-700 text-[10px] font-bold px-3 py-1 rounded-full shadow-md">
                PROMO
              </span>
            )}
          </div>


          {/* Boutons d'action en haut à droite - VISIBLES PAR DÉFAUT */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          
            <FavoriteButton
              productId={product.id}
              isInitiallyFavorite={isInitiallyFavorite }
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                router.push(`/${product.id}`);
              }}
              className="p-2.5 bg-white/90 backdrop-blur-sm rounded-xl shadow-md hover:bg-white transition-all active:scale-90"
            >
              <Eye size={18} className="text-regal-600" />
            </button>
          </div>
        </div>

        {/* Informations produit */}
        <div className="p-5  flex flex-col flex-1">
          <div className="text-[10px] uppercase tracking-widest text-christi-500 font-bold mb-1">
            {product.category}
          </div>

          <h3 className="font-semibold text-lg text-regal-700 line-clamp-1 mb-3">
            {product.name}
          </h3>

          <div className="flex items-baseline gap-1 mb-4">
            <span className="text-2xl font-bold text-regal-600">
              {product.price.toLocaleString()}
            </span>
            <span className="text-xs font-medium text-gray-500 uppercase">FCFA</span>
          </div>

          <AddBtn productId={product.id}
            product={{
              name: product.name,
              price: product.price,
              image_url: product.image_url,
              size: product.size[0],
              color: product.color[0],
            }} />
        </div>
      </Link>
    </>
  );
};

export default ProductCard;