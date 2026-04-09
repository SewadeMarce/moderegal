// components/dashboard/OrderDetailCard.tsx
// import { format } from 'date-fns';
// import { fr } from 'date-fns/locale';
import { formatTime } from '@/lib/utils';
import { Truck, Calendar, CreditCard } from 'lucide-react';

interface OrderDetailCardProps {
 order: {
    id: string;
    total_amount: string;
    status: string;
    created_at:string;
    payment_method:string;
    phone:string;
    address:string
  };}
  const statusConfig: Record<string, Record<string, string>>= {
    pending: { label: 'En attente de paiement', color: 'bg-yellow-100 text-yellow-700' },
    paid: { label: 'Payée', color: 'bg-green-100 text-green-700' },
    processing: { label: 'En préparation', color: 'bg-blue-100 text-blue-700' },
    shipped: { label: 'En cours de livraison', color: 'bg-purple-100 text-purple-700' },
    delivered: { label: 'Livré', color: 'bg-christi-100 text-christi-700' },
    cancelled: { label: 'Annulée', color: 'bg-red-100 text-red-700' },
  };


export default function OrderDetailCard({ order }: OrderDetailCardProps) {
  const config = statusConfig[order.status] || statusConfig.pending;

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100">
      {/* En-tête */}
      <div className="px-8 pt-8 pb-6 border-b">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">Commande #{order.id}</p>
            <p className="text-3xl font-bold text-regal-700 mt-1">
              {parseFloat(order.total_amount).toLocaleString('fr-BJ')} FCFA
            </p>
          </div>
          <span className={`px-5 py-2 text-sm font-semibold rounded-2xl ${config.color}`}>
            {config.label}
          </span>
        </div>

        <div className="flex items-center gap-6 mt-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            {formatTime(order.created_at)}
          </div>
          <div className="flex items-center gap-2">
            <CreditCard size={18} />
            {order.payment_method === 'mobile_money' ? 'Mobile Money' : 
             order.payment_method === 'card' ? 'Carte Bancaire' : 'Paiement à la livraison'}
          </div>
        </div>
      </div>

      {/* Informations de livraison */}
      <div className="p-8 border-b">
        <div className="flex items-start gap-4">
          <Truck className="text-christi-500 mt-1" size={24} />
          <div>
            <p className="font-medium text-regal-700">Adresse de livraison</p>
            <p className="text-gray-600 mt-1 leading-relaxed">{order.address}</p>
            <p className="text-gray-600 mt-1">{order.phone}</p>
          </div>
        </div>
      </div>

      {/* Bouton d'action selon le statut */}
      <div className="px-8 py-6 flex gap-4">
        {order.status === 'shipped' || order.status === 'processing' ? (
          <button className="flex-1 bg-regal-500 hover:bg-regal-600 text-white font-semibold py-4 rounded-2xl transition-all">
            Suivre ma commande
          </button>
        ) : order.status === 'delivered' ? (
          <button className="flex-1 bg-christi-500 hover:bg-christi-600 text-white font-semibold py-4 rounded-2xl transition-all">
            Laisser un avis
          </button>
        ) : (
          <button className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-regal-700 font-semibold py-4 rounded-2xl transition-all">
            Voir le détail
          </button>
        )}

        <button className="px-8 border border-gray-300 hover:border-gray-400 rounded-2xl font-medium transition-all">
          Facture
        </button>
      </div>
    </div>
  );
}