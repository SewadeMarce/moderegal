'use client'
import { usePathname } from "next/navigation";

export default function Step() {
  const pathname = usePathname();
  return (
    <div className="flex justify-center gap-3 mb-6">
      <div>
        <h1 className="text-4xl font-bold text-regal-700 mb-2">Finaliser votre commande</h1>
        <p className="text-gray-600 mb-10">Étape {pathname === '/payment' ? '1' : pathname === '/payment/checkout' ? '2' : '2'} sur 2</p>
      </div>
      <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full mb-6 border border-white/20">
        <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center">
          <span className="text-regal-700 font-bold text-4xl">M</span>
        </div>
      </div>
    </div>

  )
}