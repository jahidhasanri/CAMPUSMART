/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import useAxios from "../../Hooks/useAxios";

const PaymentSuccess = () => {

  const { tranId } = useParams();
  console.log(tranId)
  const [orderData, setOrderData] = useState(null);
  const navigate = useNavigate();
  const invoiceRef = useRef(null);
  const axiosInstance = useAxios();

  useEffect(() => {

    const getOrder = async () => {
      try {
        const res = await axiosInstance.get(
          `/order/${tranId}`
        );

        setOrderData(res.data);

      } catch (err) {
        console.error(err);
      }
    };

    if (tranId) {
      getOrder();
    }

  }, [tranId]);


  const orders = orderData?.orders || [];

  const totalPrice = orders.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleDownload = () => {

    const element = invoiceRef.current;

   html2pdf()
  .set({
    margin: 0.5,
    filename: `campus-mart-invoice-${tranId}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true
    },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  })
  .from(element)
  .save();

  };

  if (!orderData) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (
    <div className="max-w-[1000px] mx-auto py-12 px-4">

      <h1 className="text-3xl font-bold text-center text-green-600 mb-3">
        Payment Successful ✅
      </h1>

      <p className="text-center mb-8">
        Transaction ID : <span className="font-bold">{tranId}</span>
      </p>

      {/* Invoice */}

      <div
        ref={invoiceRef}
        className="bg-white border rounded-xl shadow p-6"
      >

        {/* Header */}

        <div className="flex justify-between items-center border-b pb-4 mb-6">

          <div>
            <h2 className="text-2xl font-bold mb-1">Campus Mart</h2>
            <p className="text-sm text-gray-500">
              Campus Marketplace
            </p>
          </div>

          <div className="text-right">
            <p className="font-semibold">Payment Status</p>
            <span className="text-green-600 font-bold">
              {orderData.paidstatus}
            </span>
          </div>

        </div>

        {/* Buyer Info */}

        <div className="mb-6">

          <h3 className="font-bold text-lg mb-2">
            Buyer Information
          </h3>

          <p className="text-2xl font-semibold">Name: <span className="!text-xl !font-normal">{orderData?.userInfo?.name}</span></p>
          <p className="text-2xl font-semibold">Email: <span className="!text-xl !font-normal">{orderData?.userInfo?.email}</span></p>

        </div>

        {/* Product Table */}

        <table className="w-full border">

          <thead className="bg-gray-200">

            <tr>
              <th className="p-2 border">ProductImage</th>
              <th className="p-2 border">Product Name</th>
              <th className="p-2 border">Product Price</th>
              <th className="p-2 border">Product Qty</th>
              <th className="p-2 border">Total</th>
            </tr>

          </thead>

          <tbody>

            {orders.map((item) => (

              <tr key={item._id}>

                <td className="border p-2">
                  <img
  src={item.image}
  crossOrigin="anonymous"
  className="w-16 h-16 object-cover"
/>
                </td>

                <td className="border p-2">
                  {item.title}
                </td>

                <td className="border p-2">
                  ${item.price}
                </td>

                <td className="border p-2 text-center">
                  {item.quantity}
                </td>

                <td className="border p-2">
                  ${item.price * item.quantity}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {/* Total */}

        <div className="text-right mt-6">

          <h2 className="text-xl font-bold">
            Total: ${totalPrice}
          </h2>

        </div>

      </div>

      {/* Buttons */}

      <div className="flex justify-center gap-5 mt-8">

        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-gray-400 text-white rounded"
        >
          Back Home
        </button>

        <button
          onClick={handleDownload}
          className="px-6 py-2 bg-green-600 text-white rounded"
        >
          Download Invoice
        </button>

      </div>

    </div>
  );
};

export default PaymentSuccess;