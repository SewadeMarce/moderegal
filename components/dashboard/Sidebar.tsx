// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { Home, Package, User, MapPin, LogOut, Heart } from 'lucide-react';

// const navItems = [
//   { label: 'Tableau de bord', href: '/dashboard', icon: Home },
//   { label: 'Mes commandes', href: '/dashboard/orders', icon: Package },
//   { label: 'Mes favoris', href: '/dashboard/favorites', icon: Heart },
//   { label: 'Profil', href: '/dashboard/profile', icon: User },
//   { label: 'Adresses', href: '/dashboard/addresses', icon: MapPin },
// ];

// export default function DashboardSidebar({user}) {
//   const pathname = usePathname();

//   return (
//     <div className="w-72 bg-regal-700 text-white h-screen sticky top-0 flex flex-col">
//       <div className="p-8 border-b border-white/10">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 bg-yellow-500 rounded-2xl flex items-center justify-center text-regal-700 font-bold text-2xl">
//             M
//           </div>
//           <div>
//             <div className="font-bold text-2xl tracking-tight">ModeRegal</div>
//             <div className="text-xs text-white/60 -mt-1">Espace Client</div>
//           </div>
//         </div>
//       </div>

//       <nav className="flex-1 px-6 py-8">
//         <div className="space-y-2">
//           {navItems.map((item) => {
//             const isActive = pathname === item.href;
//             const Icon = item.icon;
            
//             return (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${
//                   isActive 
//                     ? 'bg-white text-regal-700 font-semibold' 
//                     : 'hover:bg-white/10'
//                 }`}
//               >
//                 <Icon size={22} />
//                 <span>{item.label}</span>
//               </Link>
//             );
//           })}
//         </div>
//       </nav>

//       <div className="p-6 border-t border-white/10 mt-auto">
//         <button className="flex items-center gap-3 w-full px-6 py-4 text-white/80 hover:text-white hover:bg-white/10 rounded-2xl transition-all">
//           <LogOut size={22} />
//           <span>Déconnexion</span>
//         </button>
//       </div>
//     </div>
//   );
// }


// components/dashboard/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Package, 
  Heart, 
  User, 
  LogOut, 
} from 'lucide-react';
import { logoutUser } from '@/lib/actions';

const navItems = [
  { 
    label: 'Tableau de bord', 
    href: '/dashboard', 
    icon: Home 
  },
  { 
    label: 'Mes commandes', 
    href: '/dashboard/orders', 
    icon: Package 
  },
  { 
    label: 'Mes favoris', 
    href: '/dashboard/favorites', 
    icon: Heart 
  },
  { 
    label: 'Mon profil', 
    href: '/dashboard/profile', 
    icon: User 
  },
];

interface SidebarProps {
  user?: {
    full_name: string;
    email: string;
  };
}

export default function DashboardSidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  const handleLogout = async () => {
    if (confirm("Voulez-vous vraiment vous déconnecter ?")) {
      await logoutUser();
    }
  };

  return (
    <div className="w-72 bg-regal-700 text-white h-screen sticky top-0 flex flex-col shadow-xl">
      {/* Logo & En-tête */}
      <div className="p-8 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-yellow-500 rounded-2xl flex items-center justify-center text-regal-700 font-bold text-3xl">
            M
          </div>
          <div>
            <div className="font-bold text-3xl tracking-tighter">ModeRegal</div>
            <div className="text-xs text-white/60 -mt-1">Espace Client</div>
          </div>
        </div>
      </div>

      {/* Informations utilisateur */}
      {user && (
        <div className="px-8 py-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl font-semibold">
              {user.full_name.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="font-semibold truncate">{user.full_name}</p>
              <p className="text-xs text-white/60 truncate">{user.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-6 py-8">
        <div className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all text-[15px] ${
                  isActive 
                    ? 'bg-white text-regal-700 font-semibold shadow-sm' 
                    : 'hover:bg-white/10 text-white/90'
                }`}
              >
                <Icon size={22} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Pied de sidebar */}
      <div className="p-6 border-t border-white/10 mt-auto">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-6 py-4 text-white/80 hover:text-white hover:bg-white/10 rounded-2xl transition-all"
        >
          <LogOut size={22} />
          <span className="font-medium">Déconnexion</span>
        </button>

        <div className="text-center text-[10px] text-white/40 mt-8">
          © {new Date().getFullYear()} ModeRegal - Bénin
        </div>
      </div>
    </div>
  );
}