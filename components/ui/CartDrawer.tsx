'use client';
import { useCart } from '@/context/cart';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const router = useRouter();
  const { items: cart, remove, update, total, shipping, subtotal } = useCart();


  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[100] transform transition-transform duration-300 flex flex-col
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-regal-500 text-white">
          <div className="flex items-center gap-3">
            <ShoppingBag size={28} />
            <h2 className="text-2xl font-bold">Votre Panier ({cart.length})</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={28} />
          </button>
        </div>

        {/* Contenu */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag size={48} className="text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-regal-700 mb-2">Votre panier est vide</h3>
              <p className="text-gray-500 mb-8">Découvrez nos collections et remplissez votre panier.</p>
              <button
                onClick={onClose}
                className="bg-christi-500 hover:bg-christi-600 text-white font-semibold px-10 py-4 rounded-2xl transition-all"
              >
                Continuer mes achats
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.id}-${item.size}-${item.color}`}
                className="flex gap-5 bg-white border border-gray-100 rounded-3xl p-5 shadow-sm">
                <div className="w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image_url as string}
                    alt={item.name}
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-regal-700 line-clamp-2 pr-2">
                      {item.name}
                    </h4>
                    <button
                      onClick={() => remove(item.id)}
                      className="text-red-500 hover:text-red-600 p-1"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <p className="text-sm text-gray-500 mt-1">
                    Taille : <span className="font-medium">{item.size}</span> •
                    Couleur : <span className="inline-block w-4 h-4 rounded ml-1 align-middle"
                      style={{ backgroundColor: item.color }}></span>
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="font-bold text-xl text-regal-600">
                      {(item.price * item.quantity).toLocaleString('fr-BJ')} FCFA
                    </div>

                    <div className="flex items-center border border-gray-200 rounded-2xl overflow-hidden">
                      <button
                        onClick={() => update(item.id, item.quantity - 1)}
                        className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 active:bg-gray-200"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-10 text-center font-semibold text-lg">{item.quantity}</span>
                      <button
                        onClick={() => update(item.id, item.quantity + 1)}
                        className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 active:bg-gray-200"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer avec total */}
        {cart.length > 0 && (
          <div className="border-t p-6 bg-white">
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-lg">
                <span className="text-gray-600">Sous-total</span>
                <span className="font-semibold">{subtotal.toLocaleString('fr-BJ')} FCFA</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="text-gray-600">Livraison</span>
                <span className={`${shipping === 0 ? 'text-christi-500 font-medium' : 'text-gray-700'}`}>
                  {shipping === 0 ? 'Gratuite' : `${shipping.toLocaleString('fr-BJ')} FCFA`}
                </span>

              </div>

              <div className="pt-4 border-t border-gray-200 flex justify-between text-2xl font-bold text-regal-700">
                <span>Total</span>
                <span>{total.toLocaleString('fr-BJ')} FCFA</span>
              </div>
              <p className="text-sm text-gray-500">
                Livraison gratuite au-dessus de 100 000 FCFA
              </p>
            </div>

            <button
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-regal-700 cursor-auto font-bold text-xl py-6 rounded-3xl transition-all active:scale-[0.98]"
              onClick={() => {
                router.push('/payment')
                onClose()
              }}
            >
              Passer à la caisse
            </button>

            <button
              onClick={onClose}
              className="mt-4 w-full text-regal-600 hover:text-regal-700 py-3 font-medium"
            >
              Continuer mes achats
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;