import stripe from '@/lib/utils/stripe';
import SuccessContent from '@/components/payement/Success';
import { Suspense } from 'react';

export default async function PaymentSuccessPage({searchParams}: {searchParams: { payment_intent: string,orderId: string }}) {
  const { payment_intent } = await searchParams;


  const intent = await stripe.paymentIntents.retrieve(payment_intent, {
    expand: ["payment_method", "latest_charge"],
  });
  console.log({metadata: intent.metadata, status: intent.status});
  
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <SuccessContent orderId={intent.metadata.orderId} status={intent.status === 'succeeded' ? 'paid' : 'failed'} />
    </Suspense>
  );
}

