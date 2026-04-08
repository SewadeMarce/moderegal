import Categories from '@/components/(app)/Categories';
import FeaturedProducts from '@/components/(app)/FeaturedProducts';
import ProductHorizontalList from '@/components/(app)/ProductSection';
import { CategorySkeleton } from '@/components/ui/(app)/categories-skeleton';
import { getAllCategories, getFeaturedProducts } from '@/lib/data';
import { ArrowRight, Truck, ShieldCheck, Award } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function Page() {
  const categories = await getAllCategories();


  const featuredProducts = await getFeaturedProducts()

  return (
    <>
      {/* HERO SECTION */}
      <section id="accueil" className="relative h-screen flex items-center justify-center overflow-hidden bg-regal-700">
        {/* Image de fond */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/heros.jpg')",
            opacity: 0.35
          }}
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-linear-to-r from-regal-800/90 via-regal-700/70 to-transparent" />

        <div className="relative max-w-7xl mx-auto p-6 text-center z-10">

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-none mb-6 tracking-tighter">
            L&#39;ÉLÉGANCE<br />
            <span className="text-yellow-400">À VOTRE MESURE</span>
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-gray-200 mb-10">
            Découvrez notre sélection premium de vêtements pour hommes et femmes.
            Qualité exceptionnelle, style intemporel et confort incomparable.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              href="/shop"
              className="group bg-yellow-500 hover:bg-yellow-400 text-regal-700 font-bold text-xl px-12 py-6 rounded-3xl transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              Découvrir la collection
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={26} />
            </Link>

            <Link
              href="/shop"
              className="border-2 border-white/80 hover:bg-white/10 text-white font-semibold text-xl px-12 py-6 rounded-3xl transition-all"
            >
              Voir les promotions
            </Link>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 mt-16 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <Truck size={20} className="text-christi-400" />
              Livraison rapide partout au Bénin
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={20} className="text-christi-400" />
              Paiement 100% sécurisé
            </div>
            <div className="flex items-center gap-2">
              <Award size={20} className="text-christi-400" />
              Qualité premium garantie
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/70">
          <div className="w-px h-12 bg-linear-to-b from-transparent via-white/50 to-transparent" />
        </div>
      </section>

      {/* CATÉGORIES POPULAIRES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-regal-700 mb-3">Nos Collections</h2>
            <p className="text-gray-600 text-lg">Choisissez votre univers</p>
          </div>

          <Suspense fallback={<CategorySkeleton />}>
            <Categories categories={categories} />
          </Suspense>
        </div>
      </section>

      {/* PRODUITS EN VEDETTE */}
      <section id="promotions" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-christi-500 font-medium tracking-widest">SÉLECTION EXCLUSIVE</span>
              <h2 className="text-5xl font-bold text-regal-700 mt-2">Nos Coups de Cœur</h2>
            </div>

            <Link
              href="/shop"
              className="mt-6 md:mt-0 flex items-center gap-2 text-regal-600 hover:text-regal-700 font-medium group"
            >
              Voir toute la collection
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <Suspense fallback={<ProductSkeleton />}>
            <FeaturedProducts featuredProducts={featuredProducts} />
          </Suspense>
        </div>
      </section>
     
      <section id="hommes" className="py-20 bg-gray-50">
        <ProductHorizontalList
          title="Nouvelles Arrivées"
          subtitle="Découvrez nos dernières pièces"
          products={featuredProducts}
        />
      </section>

      {/* Meilleures Ventes */}
      <section id="femmes" className="py-20 bg-gray-50">

        <ProductHorizontalList
          title="Meilleures Ventes"
          subtitle="Les produits les plus populaires"
          products={featuredProducts}
        />
      </section>
    </>
  );
};


const ProductSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="bg-white rounded-3xl p-4 shadow-sm animate-pulse">
          <div className="w-full h-64 bg-gray-200 rounded-lg mb-4" />
          <div className="h-5 w-3/4 bg-gray-300 rounded mb-2" />
          <div className="h-4 w-1/2 bg-gray-300 rounded" />
        </div>
      ))}
    </div>
  );
};