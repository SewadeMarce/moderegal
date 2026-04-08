export const CategorySkeleton = () => {
  return (
    <section className="py-12">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {/* On génère 5 placeholders (ou 10 selon ton besoin) */}
        {[...Array(5)].map((_, index) => (
          <div 
            key={index} 
            className="relative h-40 w-full bg-slate-200 rounded-3xl overflow-hidden animate-pulse"
          >
            {/* Simulation de l'icône centrale */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-slate-300 rounded-full" />
            </div>

            {/* Simulation du contenu texte en bas */}
            <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center gap-2 px-4">
              {/* Titre (h3) */}
              <div className="h-4 w-3/4 bg-slate-300 rounded shadow-sm" />
              
              {/* Description (p) - Cachée sur mobile comme ton original */}
              <div className="hidden md:block h-3 w-1/2 bg-slate-300/60 rounded" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};