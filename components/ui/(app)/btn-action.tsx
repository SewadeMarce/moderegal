// components/ui/CartButton.tsx
"use client";
import { useCart } from "@/context/cart";
import { useTransition, useState } from "react";


interface Props {
    productId: string;
    product: {
        name: string; price: number;
        image_url?: string | null;
        size?: string;
        color?: string;
    };
    quantity?: number;

}



export default function AddBtn({
    productId,
    quantity = 1,
    product,
}: Props) {
    const { add } = useCart();
    const [localPending, start] = useTransition();
    const [added, setAdded] = useState(false);
    const loading = localPending;

    function handleClick(e: React.MouseEvent) {
        e.preventDefault(); // Empêche la navigation vers le détail
        start(async () => {
            console.log('ajout de produt:', product.image_url);

            add(productId, product, quantity);
            setAdded(true);
            setTimeout(() => setAdded(false), 1500);
        });
    }

    return (
        <button
            onClick={handleClick}
            disabled={loading}
            className="w-full bg-regal-700 hover:bg-regal-800 text-white font-semibold py-3 rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"

        >
            {loading ? (
                <>
                    <Spinner />
                    Ajout en cours…
                </>
            ) : added ? (
                <>
                    <CheckIcon />
                    Ajouté !
                </>
            ) : (
                <>
                    <CartIcon />
                    Ajouter au panier
                </>
            )}
        </button>
    );
}

const Spinner = () => (
    <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
        <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
);

const CheckIcon = () => (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const CartIcon = () => (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <path d="M2 3h1.5l2 8h7l1.5-5.5H5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="7" cy="13" r="1" fill="currentColor" />
        <circle cx="11" cy="13" r="1" fill="currentColor" />
    </svg>
);




export function QuantityStepper({ productId }: {
    productId: string;
}) {

    const { items, update } = useCart();
    const item = items.find(i => i.product_id === productId);
    const qty = item ? item.quantity : 0;

    return (
        <div>
            <h3 className="font-semibold text-lg mb-3 text-regal-700">Quantité</h3>
            <div className="flex items-center gap-6">
                <button
                    onClick={() => update(item?.id as string, qty - 1)}
                    className="w-12 h-12 flex items-center justify-center text-2xl hover:bg-gray-100 rounded-l-2xl"
                >
                    −
                </button>
                <span className="w-12 h-12 flex items-center justify-center font-semibold text-xl">

                    {qty}
                </span>
                <button
                    onClick={() => update(item?.id as string, qty + 1)}
                    className="w-12 h-12 flex items-center justify-center text-2xl hover:bg-gray-100 rounded-r-2xl"
                >
                    +
                </button>
            </div>
        </div>
    );
}