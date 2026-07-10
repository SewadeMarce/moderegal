import { use, UserType } from "@/context";
import { useCart } from "@/context/cart";
import { verifyOrder } from "@/lib/actions";
import { useKKiaPay } from "kkiapay-react";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";


export const useFormPaymentKkiapay = () => {
    const { total: amount, } = useCart();
    const { user } = use()
    const router = useRouter();
    const [pending, startTransition] = useTransition();
    const [get, set] = useState<UserType>(user);

    const { openKkiapayWidget } = useKKiaPay();
    const listenersAdded = useRef(false);

    return {
        get,
        pending,
        handleShippingSubmit: (e: React.FormEvent) => {
            e.preventDefault();

            startTransition(async () => {

                // 2. Ouvrir le widget Kkiapay
                openKkiapayWidget({
                    amount,
                    key: process.env.NEXT_PUBLIC_KKIAPAY_PUBLIC_KEY,
                    sandbox: true,
                    name: get?.full_name,
                    email: get?.email,
                    phone: get?.phone,
                    partnerId: get?.id,     // stocké dans la transaction KKiaPay
                    theme: '#00416A',
                    //  callback: `${window.location.origin}/orders/confirmation`,


                });

            });
        },
        // Gestion du formulaire de livraison
        handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            set({ ...get, [e.target.name]: e.target.value } as UserType);
        },
        setupListeners: function () {
            if (listenersAdded.current) return;
            listenersAdded.current = true;

            window.addSuccessListener(async ({ transactionId }) => {
                const shipping_adress = {
                    fullName: get?.full_name as string,
                    phone: get?.phone as string,
                    address: get?.address as string,
                    city: get?.city as string,
                };
                try {
                    //  await verifyAndPlaceOrder
                    await verifyOrder(transactionId, shipping_adress);
                    console.log({ transactionId });

                    router.push(`/`)
                } catch (err) {
                    console.error("Erreur vérification KKiaPay:", err);
                }
            });

            window.addFailedListener(() => {
                console.error("Erreur de payement << KKiaPay >>:",);
            });
        }
    }
}