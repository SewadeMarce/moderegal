'use client'
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export const BtnBack = () => {
    const router = useRouter()
    return <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-regal-600 hover:text-regal-700 mb-8 transition-colors"
    >
        <ArrowLeft size={20} />
        Retour à la boutique
    </button>
}