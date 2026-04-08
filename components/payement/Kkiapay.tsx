
// components/KkiapayCheckout.tsx
"use client";
import { useKKiaPay } from 'kkiapay-react';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect, useRef } from "react";
import Script from "next/script";
import { verifyOrder } from "@/lib/actions";

declare global {
    interface Window {
        openKkiapayWidget: (opts: Record<string, any>) => void;
        addSuccessListener: (cb: (response: { transactionId: string }) => void) => void;
        addFailedListener: (cb: (response: any) => void) => void;
    }
}

type Props = {
    amount: number;
    name: string;
    email: string;
    phone?: string;
    userId: string;           // pour le partnerId — lie la tx à la commande
   city:string;
   address:string;
    onSuccess?: (txId: string) => void;
    onFailed?: () => void;
};

function KkiapayWidget({
 city,  address, amount, name, email, phone, userId, onSuccess, onFailed,
}: Props) {
    const listenersAdded = useRef(false);
    const shipping_adress = {
        fullName: name,
        phone,
        address,
        city,
    };
      const { openKkiapayWidget } = useKKiaPay();


    function openWidget() {
        openKkiapayWidget({
            amount,
            key: process.env.NEXT_PUBLIC_KKIAPAY_PUBLIC_KEY,
            sandbox: true,
            name,
            email,
            phone,
            partnerId: userId,     // stocké dans la transaction KKiaPay
            //  callback: `${window.location.origin}/orders/confirmation`,
            theme: '#00416A',

        });
    }

    function setupListeners() {
        if (listenersAdded.current) return;
        listenersAdded.current = true;

        window.addSuccessListener(async ({ transactionId }) => {
            try {
                //  await verifyAndPlaceOrder
                await verifyOrder(transactionId, shipping_adress);
                onSuccess?.(transactionId);
            } catch (err) {
                console.error("Erreur vérification KKiaPay:", err);
            }
        });

        window.addFailedListener(() => {
            onFailed?.();
        });
    }

    return (
        <>
            <Script
                src="https://cdn.kkiapay.me/k.js"
                onLoad={setupListeners}
            />
            <button
                onClick={openWidget}
                className="text-center py-8">



                <div
                    className="border-2 border-christi-500 bg-christi-50 rounded-3xl p-8 cursor-pointer hover:border-christi-600 transition-all"
                >
                    <div className="flex items-center gap-6">
                        <div className="text-5xl">📱</div>
                        <div>
                            <h3 className="font-bold text-xl">Paiement Mobile Money</h3>
                            <p className="text-gray-600 mt-1">MTN Mobile Money • Moov Money • Celtis Cash</p>
                            <p className="text-sm text-christi-600 mt-4 font-medium">Paiement instantané et sécurisé via Kkiapay</p>
                        </div>
                    </div>
                </div>


            </button>
        </>
    );
}




export default function KkiapayCheckout({
   city,  address,  amount, name, email, userId, phone
}: {
   city:string,  address:string,  amount: number; name: string; email: string; userId: string; phone?: string;
}) {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    return (
        <div className="space-y-4">
            {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200
                      rounded-lg px-4 py-3">
                    {error}
                </p>
            )}
            <KkiapayWidget
                amount={amount}
                name={name}
                email={email}
                phone={phone}
                userId={userId}
                onSuccess={(txId) => router.push(`/`)}
                onFailed={() => setError("Paiement échoué. Veuillez réessayer.")}
                 city={city}
                  address={address}
            />
        </div>
    );
}