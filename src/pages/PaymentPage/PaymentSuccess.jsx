import React from "react";
import { Link } from "react-router";

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card bg-base-100 shadow-xl w-full max-w-md text-center p-8 rounded-md">
        <div className="mb-6">
          <svg
            className="h-28 w-28 mx-auto text-success"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold mb-3">Payment Successful!</h1>
        <p className="text-lg text-base-content/70 mb-8">
          Thank you for your purchase
        </p>

        <Link
          to="/"
          className="btn bg-red-600 text-white hover:bg-red-800 rounded-lg w-full text-lg"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
