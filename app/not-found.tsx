import type { Metadata } from 'next'
import Link from 'next/link'


export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
}
export default function Page() {
  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-regal-600 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-regal-700 mb-6">Page non trouvée</h2>
        <p className="text-xl text-gray-600 mb-10">
          Désolé, la page que vous recherchez n&#39;existe pas.
        </p>
        <Link
          href="/"
          className="inline-block bg-yellow-500 hover:bg-yellow-400 text-regal-700 font-bold px-10 py-5 rounded-3xl transition-all"
        >
          Retour à l&#39;accueil
        </Link>
      </div>
    </div>
  )
}