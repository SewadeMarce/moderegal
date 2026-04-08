
import StripePaymentElement from '@/components/payement/Elements';

export default async function CheckoutPage({ searchParams }: { searchParams: { clientSecret?: string } }) {

  const { clientSecret } = await searchParams;



  return (

    <div className="bg-white rounded-3xl p-10 shadow-sm">
      <p className="text-gray-600 mb-6">Paiement sécurisé par carte bancaire (Visa, Mastercard...)</p>

      <StripePaymentElement
        clientSecret={clientSecret as string}
      />

    </div>


  );
}