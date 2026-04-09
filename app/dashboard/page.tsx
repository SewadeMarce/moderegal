// app/(dashboard)/page.tsx
import OrderCard from '@/components/dashboard/orders/card';
import { getOrdersByUser } from '@/lib/actions';
import { getCurrentUser } from '@/lib/data';
import { Package, Truck, Award } from 'lucide-react';
import Link from 'next/link';


export default async function DashboardPage() {
  
   const user = await getCurrentUser()
   const userId = user? user.id : null;
   
  const orders = await getOrdersByUser(userId as string);

  const recentOrders = orders.slice(0, 3);

  return (
    <div className="space-y-10">
      {/* Welcome Header */}
      <div>
        <h1 className="text-4xl font-bold text-regal-700">Bonjour, Jean 👋</h1>
        <p className="text-gray-600 mt-2 text-lg">Bienvenue dans votre espace personnel</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Commandes totales</p>
              <p className="text-4xl font-bold text-regal-700 mt-2">{orders.length}</p>
            </div>
            <Package className="text-christi-500" size={40} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">En cours</p>
              <p className="text-4xl font-bold text-yellow-500 mt-2">
                {orders.filter(o => o.status === 'processing' || o.status === 'shipped').length}
              </p>
            </div>
            <Truck className="text-yellow-500" size={40} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Points fidélité</p>
              <p className="text-4xl font-bold text-christi-500 mt-2">245</p>
            </div>
            <Award className="text-christi-500" size={40} />
          </div>
        </div>
      </div>

      {/* Dernières commandes */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-regal-700">Dernières commandes</h2>
          <Link href="/dashboard/orders" className="text-christi-500 hover:underline flex items-center gap-2">
            Voir tout <span>→</span>
          </Link>
        </div>

        {recentOrders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center">
            <p className="text-gray-500">Vous n&#39;avez pas encore passé de commande</p>
          </div>
        )}
      </div>

    </div>
  );
}