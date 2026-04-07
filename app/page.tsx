
import { ArrowRight, Truck, ShieldCheck, Award } from 'lucide-react';
import Link from 'next/link';

export default async function Page() {
  

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-regal-700">
        {/* Image de fond */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/img/heros.jpg')",
            opacity: 0.35
          }}
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-linear-to-r from-regal-800/90 via-regal-700/70 to-transparent" />

        <div className="relative max-w-7xl mx-auto p-6 text-center z-10">

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-none mb-6 tracking-tighter">
            L&#39;ÉLÉGANCE<br />
            <span className="text-yellow-400">À VOTRE MESURE</span>
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-gray-200 mb-10">
            Découvrez notre sélection premium de vêtements pour hommes et femmes.
            Qualité exceptionnelle, style intemporel et confort incomparable.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              href="/shop"
              className="group bg-yellow-500 hover:bg-yellow-400 text-regal-700 font-bold text-xl px-12 py-6 rounded-3xl transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              Découvrir la collection
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={26} />
            </Link>

            <Link
              href="/shop"
              className="border-2 border-white/80 hover:bg-white/10 text-white font-semibold text-xl px-12 py-6 rounded-3xl transition-all"
            >
              Voir les promotions
            </Link>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 mt-16 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <Truck size={20} className="text-christi-400" />
              Livraison rapide partout au Bénin
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={20} className="text-christi-400" />
              Paiement 100% sécurisé
            </div>
            <div className="flex items-center gap-2">
              <Award size={20} className="text-christi-400" />
              Qualité premium garantie
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/70">
          <span className="text-xs tracking-widest mb-2">SCROLL</span>
          <div className="w-px h-12 bg-linear-to-b from-transparent via-white/50 to-transparent" />
        </div>
      </section>
    </>
  );
};


