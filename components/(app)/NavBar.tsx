'use client';
import { useEffect, useState } from 'react';
import { ShoppingCart, Menu, X, ChevronRight, User,  } from 'lucide-react';
import CartDrawer from '../ui/CartDrawer';
import { useCart } from '@/context/cart';
import UserMenu from '../ui/userMenu';
import { use } from '@/context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const {count: totalItems } = useCart();
  const { user } = use();
  const router = useRouter()
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);
  const navLinks = [
    { name: "Accueil", href: "/#accueil" },
    { name: "Boutique", href: "/shop" },
    { name: "Hommes", href: "#hommes" },
    { name: "Femmes", href: "#femmes" },
    { name: "Promotions", href: "#promotions", highlight: true },
  ];
  return (<>
    <nav className="bg-regal-500 text-white sticky top-0 z-110 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative bg-regal-500">
        {/* Logo */}
        <Link href={'/'} className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-regal-500 font-bold text-2xl">
            M
          </div>
          <h1 className="text-2xl font-bold tracking-tight">ModeRegal</h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 text-lg font-medium">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-yellow-400 transition-colors">
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <button onClick={() => setIsCartOpen(true)} className="relative p-1">
            <ShoppingCart size={26} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-christi-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-regal-500">
                {totalItems}
              </span>
            )}
          </button>
          <div className="hidden lg:block">
            <UserMenu />

          </div>
          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-1 text-yellow-500 focus:outline-none"
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* --- MENU RIDEAU (MOBILE) --- */}
      <div
        className={`absolute top-full left-0 w-full bg-regal-600 shadow-2xl transition-all duration-500 ease-in-out transform lg:hidden ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
          }`}
        style={{ zIndex: -1 }} // Se place sous la navbar principale
      >
        <div className="px-8 py-10 flex flex-col gap-1">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-between py-4 border-b border-regal-400/50 transition-all duration-300 ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                } ${link.highlight ? 'text-yellow-400' : 'text-white'}`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <span className="text-xl font-bold uppercase tracking-wide">{link.name}</span>
              <ChevronRight size={20} className="text-regal-300" />
            </Link>
          ))}

          <div className="mt-8">
            {user ?
              (<Link href={'/dashboard'} className="px-6 py-5 border-b">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-regal-500 text-white rounded-2xl flex items-center justify-center text-3xl font-bold">
                    {user?.full_name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{user?.full_name}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                </div>
              </Link>) :
              (
                <button
                  onClick={() => router.push('/auth')} className="flex items-center justify-center gap-2 bg-regal-700 p-4 rounded-2xl text-sm font-semibold hover:bg-regal-800 transition-colors">
                  <User size={18} /> Compte
                </button>)
            }


          </div>
        </div>
      </div>
    </nav>

    <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    {isOpen && (
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] lg:hidden transition-opacity duration-500"
        onClick={() => setIsOpen(false)}
      />
    )}
  </>

  );
};

export default Navbar;