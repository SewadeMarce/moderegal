import GridProducts from "@/components/(app)/shop/GridProducts";
import Sidebar from "@/components/(app)/shop/sidebar";
import BtnMobile from "@/components/ui/(app)/shop/BtnMobile";
import InputSearch from "@/components/ui/(app)/shop/input-search";
import { getAllCategories } from "@/lib/data";
import { Suspense } from "react";
import type { Metadata } from "next";
import { PropsSearchParams } from "@/types";


export const metadata: Metadata = {
  title: "Shop",
  description: "La boutique ModeRoyal contenant tout les articles",
};


export default async function Page({searchParams}: PropsSearchParams) {
  
    return (
        <div className="bg-gray-50 min-h-screen pt-8">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header de la boutique */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div>
                        <h1 className="text-5xl font-bold text-regal-700">Notre Boutique</h1>
                        <p className="text-xl text-gray-600 mt-3">
                            Découvrez notre collection premium 
                        </p>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        {/* Recherche */}
                        <InputSearch />

                        {/* Bouton filtres mobile */}
                        <BtnMobile />
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Sidebar Filtres (Desktop) */}
                    <Suspense fallback={<FilterSkeleton />}>
                        <SidebarWrapper />
                    </Suspense>
                    {/* Section Produits + Tri Desktop */}
                    <div className="flex-1">
                       
                        {/* Grille de produits */}
                      <Suspense fallback={<ProductGridSkeleton />}>
                        <GridProducts searchParams={searchParams} />
                      </Suspense>
                    </div>
                </div>
            </div>
        </div>
    )
}


async function SidebarWrapper() {
    const categories = await getAllCategories();
    return <Sidebar categories={categories} />;
}


const FilterSkeleton = () => {
    return (
        <div className="hidden lg:block w-full lg:w-72 bg-white p-8 rounded-3xl shadow-sm h-fit sticky top-24 animate-pulse">
            {/* Header : Titre "Filtres" + bouton "Effacer" */}
            <div className="flex justify-between items-center mb-8">
                <div className="h-8 w-24 bg-gray-200 rounded-lg"></div>
                <div className="h-5 w-20 bg-gray-100 rounded-md"></div>
            </div>

            {/* Section Catégories */}
            <div className="mb-10">
                {/* Titre de section "Catégories" */}
                <div className="h-6 w-32 bg-gray-200 rounded-md mb-6"></div>
                
                <div className="space-y-3">
                    {/* Génère 5 boutons fantômes */}
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div 
                            key={i} 
                            className="w-full h-[48px] bg-gray-50 rounded-2xl border border-gray-100/50"
                        ></div>
                    ))}
                </div>
            </div>

            {/* Optionnel : Une autre section si nécessaire */}
            <div className="space-y-4">
                <div className="h-6 w-24 bg-gray-200 rounded-md"></div>
                <div className="h-10 w-full bg-gray-50 rounded-xl"></div>
            </div>
        </div>
    );
};


const ProductGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {/* On génère 8 cartes (ou plus selon tes besoins) */}
      {[...Array(8)].map((_, index) => (
        <div key={index} className="animate-pulse">
          {/* Image du produit */}
          <div className="bg-gray-200 rounded-3xl w-full aspect-square mb-4"></div>
          
          {/* Badge ou petite info */}
          <div className="h-4 bg-gray-100 rounded w-1/4 mb-3"></div>
          
          {/* Nom du produit */}
          <div className="h-6 bg-gray-200 rounded-lg w-3/4 mb-2"></div>
          
          {/* Prix ou description courte */}
          <div className="h-5 bg-gray-100 rounded-md w-1/2 mb-4"></div>
          
          {/* Bouton ou footer de la carte */}
          <div className="flex justify-between items-center mt-auto">
             <div className="h-10 w-1/3 bg-gray-200 rounded-xl"></div>
             <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
};