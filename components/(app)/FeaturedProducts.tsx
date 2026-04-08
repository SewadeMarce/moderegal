import { Products } from "@/types"
import ProductCard from "./product/Card"

export default async function FeaturedProducts({featuredProducts}:{featuredProducts: Products}) {
    
    return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
        ))}
    </div>

}