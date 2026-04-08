// components/StripePaymentElement.tsx
'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    PaymentElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import { useCart } from '@/context/cart';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type Props = {
    clientSecret: string;
   
};

function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const { total } = useCart();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsProcessing(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/payment/stripe/success`,
            },
        });

        if (error) {
            console.error(error.message || "Une erreur est survenue lors du paiement");
        } else {
            alert("Paiement réussi !");
        }

        setIsProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <PaymentElement
                options={{
                    layout: 'tabs',           // ou 'accordion'
                }}
            />

            <button
                type="submit"
                disabled={!stripe || isProcessing}
                className="w-full bg-[#635BFF] hover:bg-[#5438FF] disabled:bg-gray-400 text-white font-bold py-6 rounded-3xl text-xl transition-all active:scale-[0.98]"
            >
                {isProcessing
                    ? "Traitement du paiement..."
                    : `Payer ${total.toLocaleString('fr-BJ')} FCFA`
                }
            </button>

            <p className="text-center text-xs text-gray-500">
                Paiement sécurisé par Stripe • SSL 256 bits
            </p>
        </form>
    );
}

export default function StripePaymentElement({ clientSecret, }: Props) {
    const options = {
        clientSecret,
        appearance: {
            theme: 'stripe' as const,
            variables: {
                colorPrimary: '#00416A',        // Regal Blue
                colorBackground: '#ffffff',
                colorText: '#1f2937',
                colorDanger: '#ef4444',
                borderRadius: '16px',
            },
        },
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm  />
        </Elements>
    );
}