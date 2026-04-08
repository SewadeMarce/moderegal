'use client';
import { useCart } from "@/context/cart";
import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Resume() {
  const { items: cart, subtotal, shipping, total } = useCart();
  return (
    <div className="">
      <div className="bg-white rounded-3xl p-8 sticky top-8">
        <h3 className="font-semibold text-xl mb-6">Résumé de la commande</h3>

        <div className="space-y-6 mb-8">
          {cart.map((item) => (
            <div key={`${item.id}-${item.size}`} className="flex gap-4">
              <Image
                width={1000}
                height={1000}
                src={item.image_url as string}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-2xl"
              />
              <div className="flex-1">
                <p className="font-medium line-clamp-2">{item.name}</p>
                <p className="text-sm text-gray-500">
                  {item.size} • {item.quantity} × {item.price.toLocaleString()} FCFA
                </p>
              </div>
              <p className="font-semibold whitespace-nowrap">
                {(item.price * item.quantity).toLocaleString()} FCFA
              </p>
            </div>
          ))}
        </div>

        <div className="border-t pt-6 space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Sous-total</span>
            <span>{subtotal.toLocaleString('fr-BJ')} FCFA</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Livraison</span>
            <span className={shipping === 0 ? 'text-christi-500' : ''}>
              {shipping === 0 ? 'Gratuite' : `${shipping.toLocaleString('fr-BJ')} FCFA`}
            </span>
          </div>
          <div className="flex justify-between text-2xl font-bold border-t pt-4 text-regal-700">
            <span>Total</span>
            <span>{total.toLocaleString('fr-BJ')} FCFA</span>
          </div>
        </div>
        {/* Lien retour accueil */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-regal-600 transition-colors"
          >
            <Home size={18} />
            Retour à l&#39;accueil
          </Link>
        </div>
      </div>

    </div>
  )
}