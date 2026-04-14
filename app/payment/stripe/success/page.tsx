import stripe from '@/lib/utils/stripe';
import SuccessContent from '@/components/payement/Success';
import { Suspense } from 'react';
import { createOrderByStripe } from '@/lib/actions';

export default async function PaymentSuccessPage({searchParams}: {searchParams: Promise<{ payment_intent: string,orderId: string }>}) {
  const { payment_intent } = await searchParams;


  const intent = await stripe.paymentIntents.retrieve(payment_intent, {
    expand: ["payment_method", "latest_charge"],
  });
  console.log({metadata: intent.metadata, status: intent.status});
  const data = {
    user_id: intent.metadata.userId,
    phone: intent.metadata.phone,
    address: intent.metadata.address,
    total_amount: intent.amount,
    payment_method: 'stripe',
    status: intent.status === 'succeeded' ? 'paid' : 'failed',
    shipping_fee:intent.metadata.shipping ? Number(intent.metadata.shipping) : 5000,
    shipping_adress: {
      fullName: intent.metadata.fullName,
      phone: intent.metadata.phone,
      address: intent.metadata.address,
      city: intent.metadata.city,
    }
  }
  console.log({data});
  
  const orders = await createOrderByStripe(data);
  console.log({orders});
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <SuccessContent orderId={orders.id} status={intent.status === 'succeeded' ? 'paid' : 'failed'} />
    </Suspense>
  );
}

