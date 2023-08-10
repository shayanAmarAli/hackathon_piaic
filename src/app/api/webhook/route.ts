import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-11-15",
  });
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
  
  export  async function POST(req: any, res: any){
      
      try {
      const rawBody = await req.text();
      const sig = req.headers.get("stripe-signature") as string
      const event = stripe.webhooks.constructEvent(rawBody,sig,webhookSecret);
      if ( 'checkout.session.completed' === event.type ) {
          const session = event.data.object;
      } else {
          res.setHeader("Allow", "POST");
      }
      } catch (err: any) {
          console.log("Error in webhook----------", err);
          return;
      }
     
  }