// import { format } from 'date-fns';
// import { fr } from 'date-fns/locale';

import { formatTime } from "@/lib/utils";

interface OrderCardProps {
  order: {
    id: string;
    total_amount: string;
    status: string;
    created_at:string;
    payment_method:string;
  };
}
  const statusColors : Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    paid: 'bg-green-100 text-green-700',
    processing: 'bg-blue-100 text-blue-700',
    shipped: 'bg-purple-100 text-purple-700',
    delivered: 'bg-christi-100 text-christi-700',
  };

  
export default function OrderCard({ order }: OrderCardProps) {

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-sm text-gray-500">Commande #{order.id}</p>
          <p className="text-xl font-semibold text-regal-700 mt-1">
            {order.total_amount.toLocaleString()} FCFA
          </p>
        </div>
        <span className={`px-4 py-1 text-xs font-medium rounded-2xl ${statusColors[order.status] || 'bg-gray-100'}`}>
          {order.status === 'delivered' ? 'Livré' :
            order.status === 'shipped' ? 'En cours de livraison' :
              order.status === 'processing' ? 'En préparation' : 'En attente'}
        </span>
      </div>

      <div className="text-sm text-gray-500">
        {/* Passée le {format(new Date(order.created_at), 'dd MMMM yyyy', { locale: fr })} */}
        {formatTime(order.created_at)}

      </div>

      <div className="mt-6 pt-6 border-t text-sm flex justify-between items-center">
        <span className="text-gray-600">Mode de paiement</span>
        <span className="font-medium capitalize">{order.payment_method.replace('_', ' ')}</span>
      </div>
    </div>
  );
}