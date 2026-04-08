import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Authentification",
  description: "Authhetification pour se connecter à 'ModeRegal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <div className="min-h-screen bg-gray-50 flex">

      <div className="hidden lg:flex lg:w-1/2 bg-regal-700 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://picsum.photos/id/1015/1200/1600')",
            opacity: 0.25
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-br from-regal-800/90 to-transparent" />

        <div className="relative z-10 p-12 flex flex-col justify-between h-full">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center">
              <span className="text-regal-700 font-bold text-4xl">M</span>
            </div>
            <h1 className="text-white text-4xl font-bold">ModeRegal</h1>
          </div>

          <div>
            <h2 className="text-white text-6xl font-bold leading-tight mb-6">
              L&#39;élégance<br />commence ici
            </h2>
            <p className="text-gray-300 text-xl max-w-md">
              Rejoignez notre communauté et profitez d&#39;offres exclusives,
              de nouvelles collections et d&#39;un service premium.
            </p>
          </div>

          <div className="text-white/70 text-sm">
            © {new Date().getFullYear()} ModeRegal - Bénin
          </div>
        </div>
      </div>
      {children}


    </div>


  );
}
