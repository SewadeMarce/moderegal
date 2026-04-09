// app/(dashboard)/orders/page.tsx

import OrderDetailCard from '@/components/dashboard/orders/detail';
import { getOrdersByUser } from '@/lib/actions';
import { getCurrentUser } from '@/lib/data';
import { Package, Filter } from 'lucide-react';
import Link from 'next/link';


export default async function OrdersPage() {
  const user = await getCurrentUser()
  const orders = await getOrdersByUser(user?.id as string);

  // Grouper les commandes par statut pour un affichage plus clair
  const pendingOrders = orders.filter((o) => 
    ['pending', 'paid', 'processing'].includes(o.status)
  );
  
  const completedOrders = orders.filter((o) => 
    ['shipped', 'delivered'].includes(o.status)
  );

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-regal-700">Mes Commandes</h1>
          <p className="text-gray-600 mt-2">
            Suivez l&#39;état de vos commandes et consultez votre historique
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-white px-5 py-3 rounded-2xl flex items-center gap-3 border border-gray-200">
            <Filter size={20} className="text-gray-400" />
            <select className="bg-transparent focus:outline-none text-sm font-medium">
              <option value="all">Toutes les commandes</option>
              <option value="pending">En cours</option>
              <option value="delivered">Livrés</option>
            </select>
          </div>
        </div>
      </div>

      {orders.length === 0 ? (
        /* Panier vide - Aucun commande */
        <div className="bg-white rounded-3xl py-20 text-center">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <Package size={48} className="text-gray-400" />
          </div>
          <h3 className="text-2xl font-semibold text-regal-700 mb-3">Aucune commande pour le moment</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-8">
            Lorsque vous passerez votre première commande, elle apparaîtra ici avec son statut en temps réel.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-yellow-500 hover:bg-yellow-400 text-regal-700 font-bold px-10 py-4 rounded-3xl transition-all"
          >
            Commencer mes achats
          </Link>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Commandes en cours */}
          {pendingOrders.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                <h2 className="text-2xl font-semibold text-regal-700">Commandes en cours</h2>
                <span className="text-sm bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full font-medium">
                  {pendingOrders.length}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {pendingOrders.map((order) => (
                  <OrderDetailCard key={order.id} order={order} />
                ))}
              </div>
            </div>
          )}

          {/* Historique des commandes */}
          {completedOrders.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-4 h-4 bg-christi-500 rounded-full"></div>
                <h2 className="text-2xl font-semibold text-regal-700">Historique des commandes</h2>
                <span className="text-sm bg-christi-100 text-christi-700 px-4 py-1 rounded-full font-medium">
                  {completedOrders.length}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {completedOrders.map((order) => (
                  <OrderDetailCard key={order.id} order={order} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}