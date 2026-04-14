'use client'

import React from 'react'

interface WavingFlagProps {
  countryName?: string
  mainColor?: string
  accentColor?: string
  className?: string
}

export default function WavingFlag({
  countryName = "Bénin",
  // Couleurs par défaut (Vert et Rouge/Or pour le Bénin style ModeRegal)
  mainColor = "#eab308", // bg-yellow-500
  accentColor = "#15803d", // bg-green-700
  className = ""
}: WavingFlagProps) {
  
  // Style CSS Injecté pour gérer l'effet 3D de vague et l'animation
  // Nous utilisons des dégradés radiaux complexes pour simuler les ombres et lumières des plis
  const flagStyles = `
    .flag-wave-container {
      perspective: 1000px;
    }

    .flag-waving {
      position: relative;
      width: 100%;
      height: 100%;
      background-size: 200% 100%;
      background-image: 
        linear-gradient(90deg, ${accentColor} 30%, ${mainColor} 30%);
      
      /* L'effet de pli simulé par des gradients radiaux (ombres et lumières) */
      background-image: 
        radial-gradient(circle at 15% 50%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 25%),
        radial-gradient(circle at 85% 50%, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 25%),
        linear-gradient(90deg, ${accentColor} 30%, ${mainColor} 30%);

      border-radius: 4px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
      
      /* Animation */
      animation: wave 2.5s infinite ease-in-out;
      transform-origin: left center;
    }

    /* Le mât du drapeau */
    .flag-waving::before {
      content: '';
      position: absolute;
      top: -10px;
      left: -12px;
      width: 8px;
      height: calc(100% + 150px);
      background: linear-gradient(90deg, #666, #aaa 50%, #eee 60%, #999);
      border-radius: 10px;
      box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
      z-index: -1;
    }
    
    /* La boule en haut du mât */
    .flag-waving::after {
        content: '';
        position: absolute;
        top: -18px;
        left: -16px;
        width: 16px;
        height: 16px;
        background: radial-gradient(circle at 30% 30%, #ffd700, #b8860b);
        border-radius: 50%;
        box-shadow: 1px 1px 3px rgba(0,0,0,0.3);
        z-index: 1;
    }

    /* Animation de l'ondulation et de la perspective */
    @keyframes wave {
      0%, 100% {
        transform: rotateY(15deg) rotateX(2deg) translateZ(0px);
        background-position: 0% 50%;
      }
      50% {
        transform: rotateY(-10deg) rotateX(-2deg) translateZ(10px);
        background-position: 100% 50%;
      }
    }
  `;

  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      {/* Insertion des styles CSS spécifiques */}
      <style>{flagStyles}</style>

      {/* Conteneur pour la perspective */}
      <div className="flag-wave-container w-[280px] h-[180px] md:w-[350px] md:h-[220px]">
        
        {/* Le drapeau lui-même */}
        <div className="flag-waving flex items-center justify-center">
          {/* Contenu sur le drapeau (optionnel) */}
          <div className="text-regal-900/90 text-center select-none transform -rotate-12 opacity-80 mt-[-20px]">
            <div className="text-4xl font-extrabold tracking-tighter">Mode</div>
            <div className="text-4xl font-extrabold tracking-tighter -mt-2">Regal</div>
          </div>
        </div>
      </div>

      {/* Légende (optionnel) */}
      <p className="mt-10 text-gray-500 text-sm font-medium tracking-wide italic">
        Fier du {countryName}, soufllé par l&#39;élégance
      </p>
    </div>
  )
}