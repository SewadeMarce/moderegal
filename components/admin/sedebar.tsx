'use client'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function MobileNav({ sidebar }: { sidebar: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Bouton pour ouvrir sur mobile */}
      <header className="lg:hidden bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <button onClick={() => setIsOpen(true)} className="text-regal-700">
          <Menu size={24} />
        </button>
        <div className="font-bold text-regal-700">ModeRegal</div>
      </header>

      {/* Overlay et Sidebar mobile */}
      <div className={`fixed inset-0 z-50 lg:hidden ${isOpen ? "visible" : "invisible"}`}>
        <div 
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsOpen(false)}
        />
        <aside className={`absolute inset-y-0 left-0 w-72 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
          {/* Bouton pour fermer */}
          <button onClick={() => setIsOpen(false)} className="absolute top-5 right-5 text-white z-50">
            <X size={24} />
          </button>
          {sidebar}
        </aside>
      </div>
    </>
  )
}