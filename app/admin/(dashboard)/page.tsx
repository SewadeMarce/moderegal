// app/(admin)/page.tsx
import { Package, Users, ShoppingCart, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-bold text-white">Tableau de bord Admin</h1>
        <p className="text-gray-400 mt-2">Bienvenue dans l&#39;espace d&#39;administration</p>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-900 rounded-3xl p-8">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-400">Total Produits</p>
              <p className="text-5xl font-bold text-white mt-3">248</p>
            </div>
            <Package className="text-yellow-500" size={48} />
          </div>
        </div>

        <div className="bg-gray-900 rounded-3xl p-8">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-400">Commandes aujourd&#39;hui</p>
              <p className="text-5xl font-bold text-white mt-3">12</p>
            </div>
            <ShoppingCart className="text-green-500" size={48} />
          </div>
        </div>

        <div className="bg-gray-900 rounded-3xl p-8">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-400">Utilisateurs</p>
              <p className="text-5xl font-bold text-white mt-3">1,284</p>
            </div>
            <Users className="text-blue-500" size={48} />
          </div>
        </div>

        <div className="bg-gray-900 rounded-3xl p-8">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-400">Chiffre d&#39;affaires</p>
              <p className="text-5xl font-bold text-white mt-3">8.4M</p>
              <p className="text-sm text-green-500">+12% ce mois</p>
            </div>
            <TrendingUp className="text-emerald-500" size={48} />
          </div>
        </div>
      </div>

      {/* Section à venir */}
      <div className="bg-gray-900 rounded-3xl p-10 text-center">
        <h3 className="text-2xl font-semibold text-white mb-4">Bienvenue dans l&#39;espace administrateur</h3>
        <p className="text-gray-400 max-w-md mx-auto">
          Gérez vos produits, commandes, utilisateurs et consultez les statistiques de votre boutique.
        </p>
      </div>
    </div>
  );
}