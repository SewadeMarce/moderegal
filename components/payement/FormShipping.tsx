// app/checkout/page.tsx
'use client';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, Smartphone, Check } from 'lucide-react';
import { useCart } from '@/context/cart';
import { createPaymentIntent } from '@/lib/actions';
import { use } from '@/context';
import { useFormPaymentKkiapay } from '@/hooks/useHooks';
import Script from 'next/script';

export default function ShippingForm() {


    const { handleShippingSubmit, handleInputChange, get, pending, setupListeners } = useFormPaymentKkiapay()

    return (
        <div>
            <Script
                src="https://cdn.kkiapay.me/k.js"
                onLoad={setupListeners}
            />
            <form onSubmit={handleShippingSubmit} className="text-black">
                <h2 className="text-2xl font-semibold mb-8 text-regal-700">Informations de livraison</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">Nom complet *</label>
                        <input
                            type="text"
                            name="fullName"
                            value={get?.full_name}
                            onChange={handleInputChange}
                            className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-regal-500/20 focus:border-regal-500 transition-all"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">Téléphone *</label>
                        <input
                            type="tel"
                            name="phone"
                            value={get?.phone || ""}
                            onChange={handleInputChange}
                            className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-regal-500/20 focus:border-regal-500 transition-all"
                            placeholder="01 23 45 67"
                            required
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <label className="block text-sm font-medium mb-2 text-gray-700">Adresse complète *</label>
                    <input
                        type="text"
                        name="address"
                        value={get?.address || ""}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-regal-500/20 focus:border-regal-500 transition-all"
                        placeholder="Quartier, Rue, Numéro"
                        required
                    />
                </div>

                <div className="mt-6">
                    <label className="block text-sm font-medium mb-2 text-gray-700">Email </label>
                    <input
                        type="text"
                        name="email"
                        value={get?.email || ""}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-regal-500/20 focus:border-regal-500 transition-all"
                        placeholder="Votre, Email"
                        required
                    />
                </div>
                {/* Section Mode de Paiement */}
                <div className="mt-12">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                        Moyen de paiement
                    </h2>
                    <span className="text-xs opacity-70 mt-1">
                        : Mobile Money MTN, Moov, Cb
                    </span>
                </div>

                <button
                    type="submit"
                    disabled={pending}
                    className="mt-10 w-full bg-regal-500 hover:bg-regal-600 hover:scale-[1.01] active:scale-[0.98] text-white font-bold py-6 rounded-3xl text-xl shadow-lg shadow-regal-500/20 transition-all"
                >
                    {pending ? 'Traitement en cours...' : 'Passez au payement'}
                </button>
            </form>
        </div>
    );
}