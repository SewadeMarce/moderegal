// components/admin/AdminSidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings,
  LogOut 
} from 'lucide-react';
import { logoutUser } from '@/lib/actions';

const adminNav = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Produits', href: '/admin/products', icon: Package },
  { label: 'Commandes', href: '/admin/orders', icon: ShoppingCart },
  { label: 'Utilisateurs', href: '/admin/users', icon: Users },
  { label: 'Statistiques', href: '/admin/statistics', icon: BarChart3 },
  { label: 'Paramètres', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-72 bg-gray-950 text-white h-screen sticky top-0 flex flex-col border-r border-gray-800">
      {/* Logo Admin */}
      <div className="p-8 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-500 rounded-2xl flex items-center justify-center text-regal-700 font-bold text-2xl">
            M
          </div>
          <div>
            <div className="font-bold text-2xl">ModeRegal</div>
            <div className="text-xs text-gray-400 -mt-1">Administration</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 py-10">
        <div className="space-y-2">
          {adminNav.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${
                  isActive 
                    ? 'bg-regal-600 text-white font-semibold' 
                    : 'hover:bg-gray-900 text-gray-300'
                }`}
              >
                <Icon size={22} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Déconnexion */}
      <div className="p-6 border-t border-gray-800">
        <button 
          onClick={logoutUser}
          className="w-full flex items-center gap-4 px-6 py-4 text-red-400 hover:bg-gray-900 rounded-2xl transition-all"
        >
          <LogOut size={22} />
          <span>Déconnexion</span>
        </button>
      </div>
    </div>
  );
}