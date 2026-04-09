'use client'

import { useOptimistic, useTransition } from 'react';
import { Heart } from 'lucide-react'; // ou votre icône habituelle
import { toggle } from '@/lib/actions';
import { use } from '@/context';

export default function FavoriteButton({
  productId,
  isInitiallyFavorite
}: {
  productId: string,
  isInitiallyFavorite: boolean
}) {
  const [isPending, startTransition] = useTransition();
  const { user } = use()
  // useOptimistic prend l'état réel et une fonction de mise à jour
  const [optimisticFavorite, addOptimisticFavorite] = useOptimistic(
    isInitiallyFavorite,
    (state, newState: boolean) => newState
  );


  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        // 1. On déclenche la transition
        startTransition(async () => {
          // 2. On met à jour l'UI immédiatement (optimisme)
          addOptimisticFavorite(!optimisticFavorite);

          // 3. On appelle le serveur
          await toggle(user?.id as string, productId);
          addOptimisticFavorite(!optimisticFavorite);

        });
      }} disabled={isPending}
         aria-label={optimisticFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
   className="p-2.5 bg-white/90 backdrop-blur-sm rounded-xl shadow-md hover:bg-white transition-all active:scale-90"
    >
      <Heart
        size={24}
        fill={optimisticFavorite ? "red" : "none"}
        color={optimisticFavorite ? "red" : "currentColor"}
        className={isPending ? "opacity-70" : "opacity-100"}
      />
      <span className="text-sm font-medium">
        {optimisticFavorite ? "Favori" : "Ajouter"}
      </span>

    </button>
  );
}