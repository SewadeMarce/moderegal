import WavingFlag from "@/components/WaveingFlag";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-regal-950 mb-12">Bienvenue</h1>
      
      {/* Utilisation du drapeau soufflé */}
      <WavingFlag className="my-10" />
      
    </main>
  )
}