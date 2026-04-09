// app/checkout/page.tsx
import KkiapayCheckout from "@/components/payement/Kkiapay";

export default async function CheckoutPage({searchParams}: { searchParams: { userId?: string, fullName?: string, email?: string, phone?: string , amount?: number, city?: string, address?: string} }) {

  const userId =( await searchParams).userId || "eddb_dfdf88tr87t87tr";
const name = ( await searchParams).fullName || "John Doe";
const email = ( await searchParams).email || "john.doe@example.com";
const amount = (await searchParams).amount || 1000; // Montant en centimes (ex: 1000 = 10.00)
const phone = ( await searchParams).phone || "97000000"; // Numéro de téléphone
const city = ( await searchParams).city || "Cotonou";
const address = ( await searchParams).address || "Rue des Fleurs, Cotonou";
return (
    <main className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-xl font-medium mb-6">Finaliser la commande</h1>


      <KkiapayCheckout
        amount={amount}
        name={name}
        email={email}
        userId={userId}
        phone={phone}
        city={city}
        address={address}
      />
    </main>
  );
}