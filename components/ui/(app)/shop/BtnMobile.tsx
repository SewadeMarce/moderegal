'use client';
import { use } from "@/context"
import { SlidersHorizontal } from "lucide-react"

export default function BtnMobile() {
    const { showFilters, setShowFilters } = use()
    return (
        <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center gap-2 bg-white px-6 py-4 rounded-2xl border border-gray-200"
        >
            <SlidersHorizontal size={22} />
            Filtres
        </button>
    )
}