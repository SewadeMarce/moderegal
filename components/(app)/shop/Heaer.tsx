'use client';
import BtnMobile from "@/components/ui/(app)/shop/BtnMobile";
import InputSearch from "@/components/ui/(app)/shop/input-search";
import { Products } from "@/types";

type Props = {
    filteredProducts: Products;
}

export default function Header({ filteredProducts }: Props) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <div>
                <h1 className="text-5xl font-bold text-regal-700">Notre Boutique</h1>
                <p className="text-xl text-gray-600 mt-3">
                    Découvrez notre collection premium • {filteredProducts.length} articles
                </p>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
                {/* Recherche */}
                <InputSearch />

                {/* Bouton filtres mobile */}
                <BtnMobile />
            </div>
        </div>
    )
}