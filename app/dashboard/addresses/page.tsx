// app/(dashboard)/addresses/page.tsx
import { MapPin, Plus, Edit2 } from 'lucide-react';

export default  function AddressesPage() {
  const addresses = [
    {
      id: 1,
      type: "Adresse principale",
      address: "Lot 245, Quartier Fidjrossè",
      city: "Cotonou",
      phone: "01 23 45 67",
      isDefault: true
    },
    {
      id: 2,
      type: "Adresse secondaire",
      address: "Résidence Les Palmiers, Parakou",
      city: "Parakou",
      phone: "02 34 56 78",
      isDefault: false
    }
  ];

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-regal-700">Mes Adresses</h1>
        <button className="flex items-center gap-3 bg-regal-500 text-white px-8 py-4 rounded-3xl font-medium hover:bg-regal-600 transition-all">
          <Plus size={22} />
          Nouvelle adresse
        </button>
      </div>

      <div className="grid gap-6">
        {addresses.map((addr) => (
          <div key={addr.id} className="bg-white rounded-3xl p-8 flex justify-between items-start border border-gray-100">
            <div className="flex gap-6">
              <MapPin className="text-christi-500 mt-1" size={28} />
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-xl">{addr.type}</h3>
                  {addr.isDefault && (
                    <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">Par défaut</span>
                  )}
                </div>
                <p className="text-gray-600 mt-2 leading-relaxed">{addr.address}</p>
                <p className="text-gray-600 mt-1">{addr.city}</p>
                <p className="text-sm text-gray-500 mt-3">📞 {addr.phone}</p>
              </div>
            </div>

            <button className="text-gray-400 hover:text-regal-600 p-2">
              <Edit2 size={22} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}