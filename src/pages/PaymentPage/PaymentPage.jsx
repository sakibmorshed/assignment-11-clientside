import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const PaymentPage = () => {
  const order = useLoaderData();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      Swal.fire("Error", "Stripe not loaded", "error");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      Swal.fire("Error", "Card info missing", "error");
      return;
    }

    try {
      setLoading(true);

      const amount = Number(order.price) * Number(order.quantity);

      const { data } = await axiosSecure.post("/create-payment-intent", {
        price: amount,
      });

      const clientSecret = data.clientSecret;

      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (error) {
        Swal.fire("Payment Failed", error.message, "error");
        setLoading(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        await axiosSecure.patch(`/orders/payment/${order._id}`);

        const paymentInfo = {
          orderId: order._id,
          userEmail: order.userEmail,
          amount,
          transactionId: paymentIntent.id,
          paymentMethod: "card",
          status: "paid",
        };

        await axiosSecure.post("/payments", paymentInfo);

        Swal.fire({
          title: "Payment Successful 🎉",
          text: `Transaction ID: ${paymentIntent.id}`,
          icon: "success",
        });

        navigate(`/paymentSuccess/${order._id}`);
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 border p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Complete Your Payment</h1>

      <p className="mb-4">
        Total Price:
        <span className="font-semibold"> ${order.price * order.quantity}</span>
      </p>

      <form onSubmit={handlePayment}>
        <CardElement className="border p-3 rounded" />

        <button
          type="submit"
          disabled={!stripe || loading}
          className="btn mt-4 bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
