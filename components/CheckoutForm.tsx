import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

interface Props {
    amount: number
}

export default function CheckoutForm({amount} : Props) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [intent, setIntent] = useState<string>()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/bookEvent/confirmed",
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
    return;
  };

  async function fetchIntent() {
    const res = await fetch('/api/create-payment-intent',
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({amount: amount})
        }
    )

    const data = await res.json()

    if ( data.message == 'success' ) {
        setIntent(data.clientSecret)
    }
  }

  useEffect(() => {
    fetchIntent()
  }, [amount])

  return (
    <>
      <form id="payment-form" onSubmit={(e) => handleSubmit(e)} className="bg-white p-2 rounded-md">

        {intent && <PaymentElement id="payment-element" options={{layout: "accordion"}} />}
        <button disabled={isLoading || !stripe || !elements} id="submit" className="w-full text-white p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse">
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>
        </button>
        
        {message && <div id="payment-message">{message}</div>}
      </form>
    </>
  );
}