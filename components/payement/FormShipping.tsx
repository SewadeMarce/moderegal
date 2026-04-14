// app/checkout/page.tsx
'use client';
import {  useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, Smartphone, Check } from 'lucide-react';
import { useCart } from '@/context/cart';
import {  createPaymentIntent } from '@/lib/actions';
import { use } from '@/context';

export default function ShippingForm() {
    const { total, } = useCart();


    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'stripe' | 'kkiapay'>('stripe');
    const { user } = use()
    const [pending, startTransition] = useTransition();
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        address: '',
        city: 'Cotonou',
    });

    const handleShippingSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            ...formData,
            userId: user?.id as string,

        }

        startTransition(async () => {

            // 1. On prépare les données communes


            // 2. Logique conditionnelle selon le mode de paiement
            if (activeTab === 'stripe') {

                const secret = await createPaymentIntent(data);
                router.push(`/payment/stripe?clientSecret=${secret}`, { scroll: false });

            } else if (activeTab === 'kkiapay') {
                // 2. Ouvrir le widget Kkiapay
                // Redirection vers la page Kkiapay dédiée (sans modale)
                const params = new URLSearchParams({
                    ...formData,
                    amount: total.toString(),
                    userId: user?.id as string,

                });

                router.push(`/payment/kkiapay?${params.toString()}`, { scroll: false });


            }
        });
    };
    // Gestion du formulaire de livraison
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    return (
        <div>
            <form onSubmit={handleShippingSubmit}>
                <h2 className="text-2xl font-semibold mb-8 text-regal-700">Informations de livraison</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">Nom complet *</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
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
                            value={formData.phone}
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
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-regal-500/20 focus:border-regal-500 transition-all"
                        placeholder="Quartier, Rue, Numéro"
                        required
                    />
                </div>

                {/* Section Mode de Paiement */}
                <div className="mt-12">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">Moyen de paiement</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Option Stripe */}
                        <label className="relative cursor-pointer">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="stripe"
                                className="peer sr-only"
                                checked={activeTab === 'stripe'}
                                onChange={() => setActiveTab('stripe')}
                            />
                            <div className="flex flex-col items-center justify-center p-6 border-2 border-gray-100 rounded-3xl bg-gray-50 text-gray-600 transition-all hover:bg-white hover:shadow-md peer-checked:border-regal-500 peer-checked:bg-regal-50/50 peer-checked:text-regal-700">
                                <div className="w-12 h-12 mb-3 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100">
                                    <CreditCard className="text-regal-500" size={28} />
                                </div>
                                <span className="font-bold text-lg">Carte Bancaire</span>
                                <span className="text-xs opacity-70 mt-1">Visa, Mastercard, AMEX</span>
                            </div>
                            {/* Badge Check (Optionnel) */}
                            <div className="absolute top-4 right-4 scale-0 peer-checked:scale-100 transition-transform bg-regal-500 text-white rounded-full p-1">
                                <Check size={14} />
                            </div>
                        </label>

                        {/* Option Kkiapay */}
                        <label className="relative cursor-pointer">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="kkiapay"
                                className="peer sr-only"
                                checked={activeTab === 'kkiapay'}
                                onChange={() => setActiveTab('kkiapay')}
                            />
                            <div className="flex flex-col items-center justify-center p-6 border-2 border-gray-100 rounded-3xl bg-gray-50 text-gray-600 transition-all hover:bg-white hover:shadow-md peer-checked:border-christi-500 peer-checked:bg-christi-50/50 peer-checked:text-christi-700">
                                <div className="w-12 h-12 mb-3 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100">
                                    <Smartphone className="text-christi-500" size={28} />
                                </div>
                                <span className="font-bold text-lg">Mobile Money</span>
                                <span className="text-xs opacity-70 mt-1">MTN, Moov, Wave</span>
                            </div>
                            {/* Badge Check */}
                            <div className="absolute top-4 right-4 scale-0 peer-checked:scale-100 transition-transform bg-christi-500 text-white rounded-full p-1">
                                <Check size={14} />
                            </div>
                        </label>

                    </div>
                </div>

                <button
                    type="submit"
                    disabled={pending}
                    className="mt-10 w-full bg-regal-500 hover:bg-regal-600 hover:scale-[1.01] active:scale-[0.98] text-white font-bold py-6 rounded-3xl text-xl shadow-lg shadow-regal-500/20 transition-all"
                >
                    {pending ? 'Traitement en cours...' : 'Confirmer la commande'}
                </button>
            </form>
        </div>
    );
}