import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import failAnimation from "../../../public/lotti/Payment Failed.json";

const PaymentFail = () => {
  const { tranId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">

      {/* Animation */}

      <div className="w-[450px] mb-4">
        <Lottie animationData={failAnimation} loop={true} />
      </div>

      {/* <h1 className="text-2xl font-bold text-red-600 mb-4">
        Payment Failed ❌
      </h1> */}

      <p className="text-gray-600 mb-2 text-xl font-medium">
        Unfortunately, your payment could not be completed.
      </p>

      {tranId && (
        <p className="mb-6 text-xl">
          Transaction ID: <span className="text-normal text-[#3b5d50] font-medium">{tranId}</span>
        </p>
      )}

      <p className="text-gray-500 mb-8">
        Please try again or contact support if the problem persists.
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

export default PaymentFail;