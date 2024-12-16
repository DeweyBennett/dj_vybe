import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(req: NextRequest) {
    try {
        const { amount } = await req.json();

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return NextResponse.json({ message: 'success', clientSecret: paymentIntent.client_secret })
    } catch (err) {
        console.log(err)
    }
};