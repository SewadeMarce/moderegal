
import GalerieImages from "@/components/(app)/product/GalerieImages";
import Infos from "@/components/(app)/product/info";
import { BtnBack } from "@/components/ui/BtnBack";
import { getCurrentUser, getProductById, isFavorite } from "@/lib/data";

export default async function Page(
    {
        params,
    }: {
        params: Promise<{ id: string }>
    }) {
    const id = (await params).id
    const product = await getProductById(id);
    const user = await getCurrentUser()
    const favorites = await isFavorite(user?.id as string, id)

    return (

        <>
            <div className="bg-gray-50 min-h-screen pt-8 pb-20">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Bouton retour */}
                    <BtnBack />

                    {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Section Images */}
                        {/* <GalerieImages product={product} /> */}

                        {/* Section Informations */}
                        {/* <Infos 
                            favorite={favorites}
                            product={product} />
                    </div> */}
                </div>
            </div>
        </>
    )
}