// app/(admin)/settings/page.tsx
'use client';

import { useState } from 'react';
import { Save, Upload, Globe, Bell, Shield, Palette, Truck } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "ModeRegal",
    siteDescription: "Boutique de vêtements premium au Bénin",
    contactEmail: "contact@moderegal.bj",
    contactPhone: "+229 01 23 45 67",
    address: "Cotonou, Littoral, Bénin",
    currency: "XOF",
    taxRate: "18",
    freeShippingThreshold: "50000",
    defaultShippingFee: "5000",
  });

  const [notifications, setNotifications] = useState({
    newOrder: true,
    lowStock: true,
    paymentReceived: true,
    customerMessage: false,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulation de sauvegarde
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    alert("Paramètres sauvegardés avec succès !");
    setIsSaving(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div>
        <h1 className="text-4xl font-bold text-white">Paramètres</h1>
        <p className="text-gray-400 mt-2">Configurez votre boutique et gérez les préférences globales</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Colonne principale */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Informations générales */}
          <div className="bg-gray-900 rounded-3xl p-10">
            <div className="flex items-center gap-4 mb-8">
              <Globe className="text-yellow-500" size={32} />
              <h2 className="text-2xl font-semibold text-white">Informations générales</h2>
            </div>

            <div className="space-y-8">
              <div>
                <label className="block text-sm text-gray-400 mb-3">Nom de la boutique</label>
                <input
                  type="text"
                  name="siteName"
                  value={settings.siteName}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-regal-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-3">Description de la boutique</label>
                <textarea
                  name="siteDescription"
                  value={settings.siteDescription}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-gray-800 border border-gray-700 rounded-3xl px-6 py-4 text-white focus:outline-none focus:border-regal-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-3">Email de contact</label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={settings.contactEmail}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-regal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-3">Téléphone</label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={settings.contactPhone}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-regal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-3">Adresse complète</label>
                <input
                  type="text"
                  name="address"
                  value={settings.address}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-regal-500"
                />
              </div>
            </div>
          </div>

          {/* Configuration des livraisons et paiements */}
          <div className="bg-gray-900 rounded-3xl p-10">
            <div className="flex items-center gap-4 mb-8">
              <Truck className="text-yellow-500" size={32} />
              <h2 className="text-2xl font-semibold text-white">Livraison &amp; Paiement</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm text-gray-400 mb-3">Seuil de livraison gratuite (FCFA)</label>
                <input
                  type="number"
                  name="freeShippingThreshold"
                  value={settings.freeShippingThreshold}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-6 py-4 text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-3">Frais de livraison par défaut (FCFA)</label>
                <input
                  type="number"
                  name="defaultShippingFee"
                  value={settings.defaultShippingFee}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-6 py-4 text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Colonne latérale */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Notifications */}
          <div className="bg-gray-900 rounded-3xl p-8">
            <div className="flex items-center gap-4 mb-8">
              <Bell className="text-yellow-500" size={32} />
              <h2 className="text-2xl font-semibold text-white">Notifications</h2>
            </div>

            <div className="space-y-6">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">
                      {key === 'newOrder' && "Nouvelle commande"}
                      {key === 'lowStock' && "Stock faible"}
                      {key === 'paymentReceived' && "Paiement reçu"}
                      {key === 'customerMessage' && "Nouveau message client"}
                    </p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange(key as keyof typeof notifications)}
                    className={`w-12 h-6 rounded-full transition-all relative ${value ? 'bg-emerald-500' : 'bg-gray-700'}`}
                  >
                    <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${value ? 'right-0.5' : 'left-0.5'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Sécurité */}
          <div className="bg-gray-900 rounded-3xl p-8">
            <div className="flex items-center gap-4 mb-8">
              <Shield className="text-yellow-500" size={32} />
              <h2 className="text-2xl font-semibold text-white">Sécurité</h2>
            </div>

            <div className="space-y-6 text-sm">
              <div className="flex justify-between items-center py-3 border-b border-gray-800">
                <span className="text-gray-300">Authentification à deux facteurs</span>
                <span className="text-emerald-400 font-medium">Activée</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-800">
                <span className="text-gray-300">Dernière connexion</span>
                <span className="text-gray-400">Aujourd'hui à 10:45</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-300">Sessions actives</span>
                <span className="text-gray-400">2</span>
              </div>
            </div>
          </div>

          {/* Apparence */}
          <div className="bg-gray-900 rounded-3xl p-8">
            <div className="flex items-center gap-4 mb-8">
              <Palette className="text-yellow-500" size={32} />
              <h2 className="text-2xl font-semibold text-white">Apparence</h2>
            </div>
            
            <div className="text-sm text-gray-400">
              Les couleurs principales de votre boutique sont déjà configurées avec votre palette :
            </div>
            <div className="flex gap-4 mt-6">
              <div className="w-10 h-10 rounded-2xl bg-[#00416A]"></div>
              <div className="w-10 h-10 rounded-2xl bg-[#799F0C]"></div>
              <div className="w-10 h-10 rounded-2xl bg-[#FFE000]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bouton Sauvegarder */}
      <div className="fixed bottom-8 right-8">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-600 text-regal-700 font-bold px-10 py-5 rounded-3xl shadow-2xl shadow-yellow-500/30 transition-all"
        >
          <Save size={24} />
          {isSaving ? "Sauvegarde en cours..." : "Enregistrer les modifications"}
        </button>
      </div>
    </div>
  );
}