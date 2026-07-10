// app/checkout/page.tsx
import KkiapayCheckout from "@/components/payement/Kkiapay";
import { KkiapaySearchParams } from "@/types";

export default async function CheckoutPage({searchParams}: KkiapaySearchParams) {

  const userId =( await searchParams).userId || "eddb_dfdf88tr87t87tr";
const name = ( await searchParams).fullName || "John Doe";
const email = ( await searchParams).email || "john.doe@example.com";
const amount = (await searchParams).amount || 1000; // Montant en centimes (ex: 1000 = 10.00)
const phone = ( await searchParams).phone || "97000000"; // Numéro de téléphone
const city = ( await searchParams).city || "Cotonou";
const address = ( await searchParams).address || "Rue des Fleurs, Cotonou";
return (
    <main className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-xl font-medium mb-6">Finaliser la commande</h1>


      <KkiapayCheckout
        amount={amount}
        name={name}
        email={email}
        userId={userId}
        phone={phone}
        city={city}
        address={address}
      />
    </main>
  );
}


/*// app/payment/kkiapay/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { createOrder } from '@/app/actions';
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function KkiapayPaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { subtotal, clearCart } = useCart();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const shipping = subtotal > 50000 ? 0 : 5000;
  const total = subtotal + shipping;

  const fullName = searchParams.get('fullName') || '';
  const phone = searchParams.get('phone') || '';
  const address = searchParams.get('address') || '';
  const email = searchParams.get('email') || '';

  useEffect(() => {
    if (!phone) {
      setError("Numéro de téléphone manquant");
      setIsLoading(false);
      return;
    }

    // Initialiser Kkiapay
    const initializeKkiapay = () => {
      // @ts-ignore
      if (window.Kkiapay) {
        // @ts-ignore
        window.Kkiapay({
          amount: total,
          key: process.env.NEXT_PUBLIC_KKIAPAY_PUBLIC_KEY!,
          phone: phone.replace(/\s+/g, ''),
          name: fullName,
          email: email || 'client@moderegal.bj',
          sandbox: process.env.NEXT_PUBLIC_KKIAPAY_SANDBOX === 'true',
          theme: "#00416A",           // Regal Blue
          callback: (response: any) => {
            if (response.status === "success") {
              handlePaymentSuccess(response.transactionId);
            } else {
              setError("Le paiement a échoué ou a été annulé");
            }
          },
          close: () => {
            // Rediriger vers checkout si l'utilisateur ferme
            router.push('/checkout');
          }
        });
      } else {
        setError("Kkiapay n'a pas pu se charger");
      }
      setIsLoading(false);
    };

    // Attendre que le script Kkiapay soit chargé
    const timer = setTimeout(initializeKkiapay, 800);
    return () => clearTimeout(timer);
  }, [total, phone, fullName, email]);

  const handlePaymentSuccess = async (transactionId: string) => {
    try {
      // Créer la commande en base de données
      await createOrder(
        1,                    // userId (à remplacer par session réelle)
        address,
        phone,
        'mobile_money'
      );

      // Vider le panier
      clearCart();

      // Redirection vers la page de succès
      router.push(`/payment/success?orderId=${Date.now()}&tx=${transactionId}`);
    } catch (err) {
      setError("Paiement réussi mais erreur lors de l'enregistrement de la commande");
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md px-6">
          <div className="text-red-500 text-6xl mb-6">⚠️</div>
          <h2 className="text-2xl font-bold text-regal-700 mb-4">Erreur de paiement</h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <button 
            onClick={() => router.push('/checkout')}
            className="bg-regal-500 text-white px-10 py-4 rounded-2xl"
          >
            Retour au paiement
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-10">
          <div className="mx-auto w-20 h-20 bg-christi-100 rounded-full flex items-center justify-center mb-6">
            <span className="text-4xl">📱</span>
          </div>
          <h1 className="text-3xl font-bold text-regal-700">Paiement Mobile Money</h1>
          <p className="text-gray-600 mt-3">Vous allez être redirigé vers Kkiapay</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm mb-8">
          <div className="space-y-4 text-left">
            <div className="flex justify-between">
              <span className="text-gray-600">Montant à payer</span>
              <span className="font-bold text-xl">{total.toLocaleString('fr-BJ')} FCFA</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Numéro</span>
              <span className="font-medium">{phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Nom</span>
              <span className="font-medium">{fullName}</span>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="flex flex-col items-center">
            <Loader2 className="animate-spin text-regal-500" size={48} />
            <p className="mt-4 text-gray-600">Ouverture de Kkiapay en cours...</p>
          </div>
        )}

        <button 
          onClick={() => router.push('/checkout')}
          className="mt-8 text-gray-500 hover:text-gray-700 flex items-center gap-2 mx-auto"
        >
          <ArrowLeft size={18} />
          Retour à la page précédente
        </button>
      </div>
    </div>
  );
}*/