// app/admin/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Shield, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulation de vérification admin (à remplacer par vraie logique plus tard)
    await new Promise(resolve => setTimeout(resolve, 1200));

    if (email === "admin@moderegal.bj" && password === "admin123") {
      // Simulation de connexion admin réussie
      localStorage.setItem('adminToken', 'fake-admin-jwt-token-2026');
      router.push('/admin');
    } else {
      setError("Identifiants administrateur incorrects");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo & Titre */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-yellow-500 rounded-3xl flex items-center justify-center">
              <span className="text-regal-700 text-5xl font-bold">M</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white">Administration</h1>
          <p className="text-gray-400 mt-3">Accès réservé aux administrateurs</p>
        </div>

        {/* Carte de connexion */}
        <div className="bg-gray-900 rounded-3xl p-10 shadow-2xl border border-gray-800">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="text-yellow-500" size={32} />
            <h2 className="text-2xl font-semibold text-white">Connexion Admin</h2>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-2xl mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email administrateur</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@moderegal.bj"
                className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Mot de passe</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-600 text-regal-700 font-bold py-6 rounded-3xl text-xl transition-all flex items-center justify-center gap-3 mt-8"
            >
              {isLoading ? (
                "Connexion en cours..."
              ) : (
                <>
                  Accéder à l'administration
                  <ArrowRight size={24} />
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-8 text-xs text-gray-500">
            Accès strictement réservé au personnel autorisé
          </div>
        </div>

        {/* Lien retour vers le site */}
        <div className="text-center mt-10">
          <a 
            href="/"
            className="text-gray-400 hover:text-white text-sm flex items-center justify-center gap-2"
          >
            ← Retour au site client
          </a>
        </div>
      </div>
    </div>
  );
}