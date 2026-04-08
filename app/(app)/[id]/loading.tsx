export default function DetailLoading() {
    
  return (
    <div className="bg-gray-50 min-h-screen pt-8 pb-20 animate-pulse">
      <div className="max-w-7xl mx-auto px-6">
        {/* Bouton retour fantôme */}
        <div className="h-6 w-40 bg-gray-200 rounded-md mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Section Images Skeleton */}
          <div className="space-y-6">
            <div className="aspect-[4/5] rounded-3xl bg-gray-200 shadow-sm" />
            
            {/* Miniatures */}
            <div className="flex gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex-1 aspect-square rounded-2xl bg-gray-200" />
              ))}
            </div>
          </div>

          {/* Section Informations Skeleton */}
          <div className="space-y-8">
            <div>
              {/* Badges */}
              <div className="flex gap-3 mb-4">
                <div className="h-8 w-24 bg-gray-200 rounded-full" />
                <div className="h-8 w-20 bg-gray-200 rounded-full" />
              </div>
              
              {/* Titre */}
              <div className="h-10 w-3/4 bg-gray-200 rounded-lg mb-4" />
              
              {/* Avis */}
              <div className="h-6 w-32 bg-gray-200 rounded-md" />
            </div>

            {/* Prix */}
            <div className="h-14 w-48 bg-gray-200 rounded-xl" />

            {/* Description */}
            <div className="space-y-2">
              <div className="h-5 w-28 bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-2/3 bg-gray-200 rounded" />
            </div>

            {/* Tailles */}
            <div className="space-y-3">
              <div className="flex justify-between h-5">
                <div className="w-16 bg-gray-200 rounded" />
                <div className="w-24 bg-gray-200 rounded" />
              </div>
              <div className="flex gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-12 w-16 bg-gray-200 rounded-2xl" />
                ))}
              </div>
            </div>

            {/* Couleurs */}
            <div className="space-y-3">
              <div className="h-5 w-20 bg-gray-200 rounded" />
              <div className="flex gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-12 h-12 rounded-2xl bg-gray-200" />
                ))}
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <div className="flex-1 h-20 bg-gray-200 rounded-3xl" />
              <div className="w-full sm:w-24 h-20 bg-gray-200 rounded-3xl" />
            </div>

            {/* Réassurance (Livraison/Garantie) */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-200">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full" />
                  <div className="h-3 w-16 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};