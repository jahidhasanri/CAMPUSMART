import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const PaymentFail = () => {
  const { tranId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">

      <h1 className="text-3xl font-bold text-red-600 mb-4">
        Payment Failed ❌
      </h1>

      <p className="text-gray-600 mb-2">
        Unfortunately, your payment could not be completed.
      </p>

      {tranId && (
        <p className="mb-6">
          Transaction ID: <span className="font-semibold">{tranId}</span>
        </p>
      )}

      <p className="text-gray-500 mb-8">
        Please try again or contact support if the problem persists.
      </p>

      <div className="flex gap-4">

        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Back Home
        </button>

        <button
          onClick={() => navigate("/cart")}
          className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Try Payment Again
        </button>

      </div>

    </div>
  );
};

export default PaymentFail;