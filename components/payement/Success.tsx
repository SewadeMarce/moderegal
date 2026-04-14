'use client';
import { ArrowRight, CheckCircle, Package, Truck } from "lucide-react";
import Link from "next/link";

export default function SuccessContent({orderId}: {orderId: string,status:string}) {
 

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Carte principale */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* En-tête avec succès */}
          <div className="bg-gradient-to-r from-regal-600 to-regal-700 px-10 py-16 text-center relative">
            <div className="mx-auto w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
              <CheckCircle size={80} className="text-green-500" />
            </div>
            
            <h1 className="text-5xl font-bold text-white mb-3">Paiement Réussi !</h1>
            <p className="text-xl text-white/90">Merci pour votre confiance</p>
            
            {orderId && (
              <div className="mt-6 inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-6 py-2 rounded-full">
                <span className="text-white/80 text-sm">Commande n°</span>
                <span className="font-mono font-bold text-white">#{orderId}</span>
              </div>
            )}
          </div>

          {/* Contenu */}
          <div className="p-10">
            <div className="text-center mb-10">
              <p className="text-gray-600 text-lg">
                Votre commande a été enregistrée avec succès.<br />
                Vous recevrez un email de confirmation sous peu.
              </p>
            </div>

            {/* Informations utiles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-gray-50 rounded-2xl p-6 flex gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Package className="text-green-600" size={28} />
                </div>
                <div>
                  <p className="font-semibold text-regal-700">Préparation</p>
                  <p className="text-sm text-gray-600 mt-1">Votre commande est en cours de préparation</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 flex gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Truck className="text-blue-600" size={28} />
                </div>
                <div>
                  <p className="font-semibold text-regal-700">Livraison</p>
                  <p className="text-sm text-gray-600 mt-1">Livraison prévue dans 2 à 4 jours ouvrés</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/dashboard/orders"
                className="flex-1 bg-regal-500 hover:bg-regal-600 text-white font-bold py-5 rounded-3xl flex items-center justify-center gap-3 transition-all"
              >
                Suivre ma commande
                <ArrowRight size={22} />
              </Link>

              <Link 
                href="/shop"
                className="flex-1 border-2 border-gray-300 hover:border-gray-400 font-semibold py-5 rounded-3xl flex items-center justify-center gap-3 transition-all"
              >
                Continuer mes achats
              </Link>
            </div>

          
          </div>
        </div>
      </div>
    </div>
  );
}
    