import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const PaymentCancel = () => {
  const { tranId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">

      <h1 className="text-3xl font-bold text-yellow-600 mb-4">
        Payment Cancelled ⚠️
      </h1>

      <p className="text-gray-600 mb-2">
        You cancelled the payment process.
      </p>

      {tranId && (
        <p className="mb-6">
          Transaction ID: <span className="font-semibold">{tranId}</span>
        </p>
      )}

      <p className="text-gray-500 mb-8">
        If this was a mistake, you can try the payment again.
      </p>

      <div className="flex gap-4">

        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-[#3b5d50] text-white rounded hover:bg-gray-600"
        >
          Back Home
        </button>

        <button
          onClick={() => navigate("/cart")}
          className="px-6 py-2 bg-[#dc2626d1] text-white rounded hover:bg-[#ea1e1e]"
        >
          Try Payment Again
        </button>

      </div>

    </div>
  );
};

export default PaymentCancel;