import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";
import CompletePage from "@/components/CompletePage";

interface Props {
    params: {
        id: string
    }
}

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function App({ params: { id } }: Props) {
    const [loading, setLoading] = useState<boolean>(true)
    const [confirmed, setConfirmed] = useState<boolean>(false);
    const cost = 0

    async function verifyId() {
        if(id == 'confirmed') {
            setConfirmed(true)
            setLoading(false)
        }
    }

    useState(() => {
        if (loading) {
            verifyId()
        }
    })

    return (
        <div className="App">
            <Elements options={{ mode: 'payment', currency: 'usd', amount: cost }} stripe={stripePromise}>
                {confirmed ? <CompletePage /> : <CheckoutForm amount={cost} />}
            </Elements>
        </div>
    );
}