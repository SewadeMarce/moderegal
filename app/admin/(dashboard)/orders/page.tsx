// app/(admin)/orders/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search, 
  Filter 
} from 'lucide-react';

interface Order {
  id: number;
  user_id: number;
  full_name?: string;
  total_amount: number;
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_method: string;
  address: string;
  phone: string;
  created_at: string;
  items_count?: number;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Simulation de données (à remplacer par une vraie Server Action plus tard)
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setIsLoading(true);
    
    // Simulation de données pour le moment
    const mockOrders: Order[] = [
      {
        id: 1001,
        user_id: 5,
        full_name: "Jean Koffi",
        total_amount: 125000,
        status: "shipped",
        payment_method: "mobile_money",
        address: "Fidjrossè, Cotonou",
        phone: "0123456789",
        created_at: "2026-04-10T14:30:00",
        items_count: 3
      },
      {
        id: 1002,
        user_id: 12,
        full_name: "Aïcha Bello",
        total_amount: 87500,
        status: "delivered",
        payment_method: "card",
        address: "Akpakpa, Cotonou",
        phone: "0198765432",
        created_at: "2026-04-09T11:15:00",
        items_count: 2
      },
      {
        id: 1003,
        user_id: 8,
        full_name: "Mohamed Traoré",
        total_amount: 245000,
        status: "processing",
        payment_method: "mobile_money",
        address: "Parakou",
        phone: "0234567890",
        created_at: "2026-04-11T09:45:00",
        items_count: 5
      },
      {
        id: 1004,
        user_id: 3,
        full_name: "Sophie Lawson",
        total_amount: 45000,
        status: "pending",
        payment_method: "mobile_money",
        address: "Godomey",
        phone: "0145678901",
        created_at: "2026-04-12T16:20:00",
        items_count: 1
      },
    ];

    setOrders(mockOrders);
    setFilteredOrders(mockOrders);
    setIsLoading(false);
  };

  // Filtrage combiné (recherche + statut)
  useEffect(() => {
    let result = [...orders];

    // Filtre par recherche
    if (searchTerm.trim()) {
      result = result.filter(order => 
        order.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toString().includes(searchTerm) ||
        order.phone.includes(searchTerm)
      );
    }

    // Filtre par statut
    if (statusFilter !== 'all') {
      result = result.filter(order => order.status === statusFilter);
    }

    setFilteredOrders(result);
  }, [searchTerm, statusFilter, orders]);

  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    // Ici tu ajouteras la vraie Server Action plus tard
    alert(`Commande #${orderId} mise à jour vers : ${newStatus}`);
    
    // Mise à jour locale pour simulation
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus as any } : order
    ));
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: "bg-yellow-500/20 text-yellow-400",
      paid: "bg-green-500/20 text-green-400",
      processing: "bg-blue-500/20 text-blue-400",
      shipped: "bg-purple-500/20 text-purple-400",
      delivered: "bg-emerald-500/20 text-emerald-400",
      cancelled: "bg-red-500/20 text-red-400",
    };

    const labels = {
      pending: "En attente",
      paid: "Payée",
      processing: "En préparation",
      shipped: "En livraison",
      delivered: "Livré",
      cancelled: "Annulée",
    };

    return (
      <span className={`px-4 py-1.5 text-xs font-medium rounded-full ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white">Gestion des Commandes</h1>
          <p className="text-gray-400 mt-2">{filteredOrders.length} commandes au total</p>
        </div>
      </div>

      {/* Filtres */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher par nom, ID ou téléphone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 pl-14 py-4 rounded-3xl text-white placeholder-gray-500 focus:outline-none focus:border-regal-500"
          />
        </div>

        <div className="flex items-center gap-3 bg-gray-900 border border-gray-700 rounded-3xl px-6">
          <Filter size={20} className="text-gray-400" />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-transparent border-0 focus:outline-none text-white py-4"
          >
            <option value="all">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="paid">Payées</option>
            <option value="processing">En préparation</option>
            <option value="shipped">En livraison</option>
            <option value="delivered">Livrées</option>
            <option value="cancelled">Annulées</option>
          </select>
        </div>
      </div>

      {/* Tableau des commandes */}
      <div className="bg-gray-900 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="px-8 py-6 text-left text-gray-400 font-medium">Commande</th>
                <th className="px-8 py-6 text-left text-gray-400 font-medium">Client</th>
                <th className="px-8 py-6 text-left text-gray-400 font-medium">Montant</th>
                <th className="px-8 py-6 text-left text-gray-400 font-medium">Statut</th>
                <th className="px-8 py-6 text-left text-gray-400 font-medium">Date</th>
                <th className="px-8 py-6 text-center text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {isLoading ? (
                <tr><td colSpan={6} className="text-center py-20 text-gray-400">Chargement...</td></tr>
              ) : filteredOrders.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-20 text-gray-400">Aucune commande trouvée</td></tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-8 py-6">
                      <div>
                        <p className="font-mono font-semibold text-white">#{order.id}</p>
                        <p className="text-xs text-gray-500 mt-1">{order.items_count} article(s)</p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div>
                        <p className="font-medium text-white">{order.full_name}</p>
                        <p className="text-sm text-gray-500">{order.phone}</p>
                      </div>
                    </td>
                    <td className="px-8 py-6 font-semibold text-white">
                      {order.total_amount.toLocaleString('fr-BJ')} FCFA
                    </td>
                    <td className="px-8 py-6">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-8 py-6 text-gray-400 text-sm">
                      {new Date(order.created_at).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => updateOrderStatus(order.id, 'processing')}
                          className="px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-2xl text-sm transition-all"
                        >
                          Préparer
                        </button>
                        <button 
                          onClick={() => updateOrderStatus(order.id, 'shipped')}
                          className="px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-2xl text-sm transition-all"
                        >
                          Expédier
                        </button>
                        <button 
                          onClick={() => updateOrderStatus(order.id, 'delivered')}
                          className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-2xl text-sm transition-all"
                        >
                          Livré
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}