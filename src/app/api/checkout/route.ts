import { NextRequest, NextResponse } from 'next/server';
import { Stripe } from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
});

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { paymentMethodId }:any = req.json();
  console.log(paymentMethodId);

  try {
    // Use the paymentMethodId to create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      payment_method: paymentMethodId,
      amount: 1000, // Set the amount you want to charge (in cents)
      currency: 'usd',
      // Add any additional data you want to include in the payment intent
    });

    // Return the payment intent ID to the client
    return NextResponse.json({  clientSecret: paymentIntent.client_secret   })
} catch (error) {
    console.error(error);
    return NextResponse.json({  message: 'Internal Server Error' })
  }
};

