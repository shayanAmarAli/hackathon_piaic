import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});


export  async function POST(req: any, res: NextResponse){
    const { data } = await req.json();
    console.log(data);
      const redirectURL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://hackathon-piaic.vercel.app';

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: data.map((product: any) => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.title,
            },
            unit_amount: product.price * 100, // Convert price to cents
          },
          quantity: 1,
        })),
        mode: 'payment',
        success_url: redirectURL + '/payment/success',
        cancel_url: redirectURL + '/payment/fail',
        metadata: {
          images: data[0].image,
        },
      });

    //    console.log("response-------------------",await session);
    return NextResponse.json(session?.id) ;
  };
  
