// components/UserMenu.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, LogOut, Package, Heart } from 'lucide-react';
import { logoutUser } from '@/lib/actions';
import { use } from '@/context';

export default function UserMenu() {
  const { user, setUser } = use();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();



  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      router.push('/auth');
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error);
    }
  };

  const goToDashboard = () => {
    router.push('/dashboard');
    setIsOpen(false);
  };

  return (
    <>
      {user ? (
        <div className="relative bg-yellow-500 rounded-2xl">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-3 hover:bg-gray-100 px-4 py-2 rounded-2xl transition-all"
          >
            <div className="w-9 h-9 bg-regal-500 text-white rounded-2xl flex items-center justify-center font-semibold">
              {user.full_name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="hidden md:block text-left">
              <p className="font-medium text-sm text-regal-700">{user.full_name}</p>
              <p className="text-xs text-gray-500 -mt-0.5">{user.email}</p>
            </div>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <>
              {/* Overlay pour fermer en cliquant dehors */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsOpen(false)}
              />

              <div className="absolute right-0 mt-3 w-72  bg-black/60 backdrop-blur-sm  rounded-3xl shadow-2xl border border-gray-100 z-50 py-2 overflow-hidden">
                {/* En-tête du menu */}
                <div className="px-6 py-5 border-b">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-regal-500 text-white rounded-2xl flex items-center justify-center text-3xl font-bold">
                      {user.full_name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{user.full_name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </div>

                {/* Liens du menu */}
                <div className="py-2">
                  <button
                    onClick={goToDashboard}
                    className="w-full px-6 py-4 flex items-center gap-4 hover:bg-regal-500 text-left transition-colors"
                  >
                    <Package size={22} className="text-yellow-600" />
                    <span className="font-medium">Tableau de bord</span>
                  </button>

                  <button
                    onClick={() => {
                      router.push('/dashboard/orders');
                      setIsOpen(false);
                    }}
                    className="w-full px-6 py-4 flex items-center gap-4 hover:bg-regal-500 text-left transition-colors"
                  >
                    <Package size={22} className="text-yellow-600" />
                    <span className="font-medium">Mes commandes</span>
                  </button>

                  <button
                    onClick={() => {
                      router.push('/dashboard/profile');
                      setIsOpen(false);
                    }}
                    className="w-full px-6 py-4 flex items-center gap-4 hover:bg-regal-500 text-left transition-colors"
                  >
                    <User size={22} className="text-yellow-600" />
                    <span className="font-medium">Mon profil</span>
                  </button>

                  <button
                    onClick={() => {
                      router.push('/dashboard/favorites');
                      setIsOpen(false);
                    }}
                    className="w-full px-6 py-4 flex items-center gap-4 hover:bg-regal-500 text-left transition-colors"
                  >
                    <Heart size={22} className="text-yellow-600" />
                    <span className="font-medium">Mes favoris</span>
                  </button>
                </div>

                <div className="border-t my-2" />

                {/* Bouton Déconnexion */}
                <button
                  onClick={handleLogout}
                  className="w-full px-6 py-4 flex items-center gap-4 hover:bg-red-50 text-red-600 text-left transition-colors"
                >
                  <LogOut size={22} />
                  <span className="font-medium">Déconnexion</span>
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        <button
          onClick={() => router.push('/auth')}
          className="flex items-center justify-center gap-2 bg-regal-700 p-4 rounded-2xl text-sm font-semibold hover:bg-regal-800 transition-colors">
          <User size={18} /> Compte
        </button>
      )}
    </>

  );
}