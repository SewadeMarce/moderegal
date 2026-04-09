'use client'

import { useState, useTransition } from 'react'
import { Calendar, Mail, Phone, MapPin, Edit3, Lock, Check, X } from 'lucide-react'

// Type pour vos données profil
type ProfileData = {
    id: string,
    full_name: string,
    email: string, phone: string,
    address: string,
    city: string,
    role: string,
    created_at: Date
}
export default function UserProfile({ initialData }: { initialData: ProfileData }) {
    const [isEditing, setIsEditing] = useState(false)
    const [isPending, startTransition] = useTransition()
    const [profileData, setProfileData] = useState(initialData)

    // Simulation d'une sauvegarde (à lier à votre Server Action)
    const handleSave = async () => {
        startTransition(async () => {
            // Simulation d'un délai réseau (ex: 1s)
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Ici vous appelleriez votre Server Action : 
            // await updateProfileAction(profileData)

            setIsEditing(false)
        })
    }

    return (
        <div className="bg-white rounded-[40px] shadow-sm p-6 md:p-12 border border-gray-100">

            {/* En-tête du profil */}
            <div className="flex flex-col md:flex-row items-center gap-8 mb-12 text-center md:text-left">
                <div className="relative group">
                    <div className="w-32 h-32 bg-regal-600 text-white rounded-[35px] flex items-center justify-center text-5xl font-bold shadow-lg shadow-regal-200">
                        {profileData?.full_name.charAt(0).toUpperCase()}
                    </div>
                    {isEditing && (
                        <div className="absolute -bottom-2 -right-2 bg-yellow-500 p-2 rounded-xl text-regal-800 shadow-md">
                            <Edit3 size={18} />
                        </div>
                    )}
                </div>

                <div>
                    {isEditing ? (
                        <input
                            className="text-3xl font-bold bg-gray-50 border-b-2 border-regal-500 outline-none px-2 w-full"
                            value={profileData?.full_name}
                            onChange={(e) => setProfileData({ ...profileData, full_name: e.target.value })}
                        />
                    ) : (
                        <h2 className="text-3xl font-extrabold text-regal-900">{profileData.full_name}</h2>
                    )}
                    <p className="text-gray-400 mt-2 flex items-center justify-center md:justify-start gap-2">
                        <Calendar size={18} />
                        Membre depuis {new Date(profileData?.created_at).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                    </p>
                </div>
            </div>

            {/* Informations détaillées */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-8">
                    <div className="group">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                            <Mail size={16} className="text-regal-500" /> Email
                        </label>
                        <p className="font-semibold text-lg text-gray-800 bg-gray-50/50 p-4 rounded-2xl border border-transparent group-hover:border-gray-100 transition-all">
                            {profileData.email}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-1 ml-2">* L&#39;email ne peut pas être modifié</p>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                            <Phone size={16} className="text-regal-500" /> Téléphone
                        </label>
                        {isEditing ? (
                            <input
                                type="tel"
                                className="w-full font-semibold text-lg p-4 rounded-2xl bg-white border-2 border-regal-100 focus:border-regal-500 outline-none transition-all"
                                value={profileData.phone}
                                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                            />
                        ) : (
                            <p className="font-semibold text-lg text-gray-800 p-4">{profileData.phone || "Non renseigné"}</p>
                        )}
                    </div>
                </div>

                <div>
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                            <MapPin size={16} className="text-regal-500" /> Adresse
                        </label>
                        {isEditing ? (
                            <textarea
                                rows={4}
                                className="w-full font-semibold text-lg p-4 rounded-2xl bg-white border-2 border-regal-100 focus:border-regal-500 outline-none transition-all resize-none"
                                value={profileData.address}
                                onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                            />
                        ) : (
                            <p className="font-semibold text-lg text-gray-800 leading-relaxed p-4 bg-gray-50/50 rounded-2xl border border-transparent">
                                {profileData.address || "Aucune adresse enregistrée pour le moment."}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                            <MapPin size={16} className="text-regal-500" /> Ville
                        </label>
                        {isEditing ? (

                            <input
                                type="tel"
                                className="w-full font-semibold text-lg p-4 rounded-2xl bg-white border-2 border-regal-100 focus:border-regal-500 outline-none transition-all"
                                value={profileData.phone}
                                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                            />
                        ) : (
                            <p className="font-semibold text-lg text-gray-800 leading-relaxed p-4 bg-gray-50/50 rounded-2xl border border-transparent">
                                {profileData.city || "Aucune city enregistrée pour le moment."}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Boutons d'action */}
            <div className="mt-14 flex flex-col sm:flex-row gap-4">
                {isEditing ? (
                    <>
                        <button
                            onClick={handleSave}
                            disabled={isPending}
                            className="flex-1 bg-green-600 text-white py-5 rounded-[25px] font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-100 flex items-center justify-center gap-2"
                        >
                            {isPending ? "Enregistrement..." : <><Check size={20} /> Enregistrer</>}
                        </button>
                        <button
                            onClick={() => {
                                setProfileData(initialData)
                                setIsEditing(false)
                            }}
                            disabled={isPending}
                            className="flex-1 bg-gray-100 text-gray-600 py-5 rounded-[25px] font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                        >
                            <X size={20} /> Annuler
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex-1 bg-regal-600 text-white py-5 rounded-[25px] font-bold hover:bg-regal-700 transition-all shadow-lg shadow-regal-100 flex items-center justify-center gap-2"
                        >
                            <Edit3 size={20} /> Modifier mon profil
                        </button>
                        <button className="flex-1 border-2 border-gray-100 text-gray-600 py-5 rounded-[25px] font-bold hover:bg-gray-50 hover:border-gray-200 transition-all flex items-center justify-center gap-2">
                            <Lock size={20} /> Mot de passe
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}