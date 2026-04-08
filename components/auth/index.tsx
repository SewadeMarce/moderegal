'use client';
import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginUser, registerUser } from '@/lib/actions';
import Image from 'next/image';

type AuthMode = 'login' | 'register';

export default function AuthForm() {
    const [mode, setMode] = useState<AuthMode>('login');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleSubmit = async (formData: FormData) => {
        setError('');
        setIsLoading(true);

        try {
            if (mode === 'register') {
                await registerUser(formData);
            } else {
                await loginUser(formData);
            }
            router.push('/');
        } catch (err) {
            
            setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };



    const toggleMode = () => {
        setMode(mode === 'login' ? 'register' : 'login');
        setFormData({ fullName: '', email: '', password: '', confirmPassword: '' });
    };

    return (


        <div className="w-full max-w-md">
            <div className="mb-10 text-center lg:text-left">
                <h2 className="text-4xl font-bold text-regal-700 mb-3">
                    {mode === 'login' ? 'Bienvenue' : 'Créer un compte'}
                </h2>
                <p className="text-gray-600">
                    {mode === 'login'
                        ? 'Connectez-vous pour accéder à votre compte'
                        : 'Inscrivez-vous pour profiter de tous nos avantages'}
                </p>
            </div>
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl mb-6">
                    {error}
                </div>
            )}

            <form action={handleSubmit} className="space-y-6">
                {mode === 'register' && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                required
                                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-regal-500"
                                placeholder="Jean Koffi"
                            />
                        </div>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-regal-500"
                            placeholder="votre@email.com"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-12 pr-12 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-regal-500"
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                {mode === 'register' && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirmer le mot de passe</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required
                                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-regal-500"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>
                )}

                {mode === 'login' && (
                    <div className="flex justify-end">
                        <Link href="#" className="text-christi-500 hover:text-christi-600 text-sm font-medium">
                            Mot de passe oublié ?
                        </Link>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-300 text-regal-700 font-bold text-xl py-6 rounded-3xl transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                >
                    {isLoading ? (
                        'Connexion en cours...'
                    ) : mode === 'login' ? (
                        <>
                            Se connecter <ArrowRight size={24} />
                        </>
                    ) : (
                        <>
                            Créer mon compte <ArrowRight size={24} />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-gray-600">
                    {mode === 'login' ? "Vous n'avez pas encore de compte ?" : "Vous avez déjà un compte ?"}
                    {' '}
                    <button
                        onClick={toggleMode}
                        className="text-christi-500 hover:text-christi-600 font-semibold"
                    >
                        {mode === 'login' ? "S'inscrire" : "Se connecter"}
                    </button>
                </p>
            </div>

            {/* Option sociale */}
            <div className="mt-10">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-gray-50 px-4 text-gray-500">Ou continuer avec</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                    <button className="flex items-center justify-center gap-3 border border-gray-200 hover:border-gray-300 py-4 rounded-2xl transition-all">
                        <img width={5} height={5} src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png" alt="Google" className="w-5 h-5" />
                        <span className="font-medium">Google</span>
                    </button>
                    <button className="flex items-center justify-center gap-3 border border-gray-200 hover:border-gray-300 py-4 rounded-2xl transition-all">
                        <span className="text-xl">f</span>
                        <span className="font-medium">Facebook</span>
                    </button>
                </div>
            </div>
        </div>

    );
};
