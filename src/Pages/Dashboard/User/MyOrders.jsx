import React, { useContext, useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import SharedBanner from "../../../components/Shared/SharedBanner";
import useAxios from "../../../Hooks/useAxios";
import { AuthContext } from "../../../provider/AuthProvider";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const axiosSecure = useAxios();

  useEffect(() => {
    if (!user?.email) return;

    const fetchOrders = async () => {
      try {
        const res = await axiosSecure.get(`/finalOrders?email=${user.email}`);
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-[#3b5d50]">
        <SharedBanner
          title="PURCHASE HISTORY"
          subtitle="Track your orders and download invoices for your campus marketplace purchases."
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-x-auto">
          <table className="w-full text-left min-w-[750px]">
            <thead className="bg-gray-100 text-[#3b5d50] uppercase text-xs md:text-sm font-bold">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Products</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 hidden md:table-cell">Trx ID</th>
                <th className="px-6 py-4 text-center">Invoice</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition">
                  {/* ORDER ID */}
                  <td className="px-6 py-4 font-bold text-blue-600 text-sm">
                    {order._id}
                  </td>

                  {/* PRODUCTS */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-3">
                      {order.orders?.map((item) => (
                        <div key={item._id} className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-10 h-10 md:w-12 md:h-12 object-cover rounded"
                          />

                          <span className="text-xs md:text-sm font-medium">
                            {item.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>

                  {/* AMOUNT */}
                  <td className="px-6 py-4 font-bold text-gray-700">
                    ৳{order.total}
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        order.orderStatus === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  {/* TRANSACTION ID */}
                  <td className="px-6 py-4 text-xs font-mono text-gray-500 hidden md:table-cell">
                    {order.tran_id}
                  </td>

                  {/* INVOICE */}
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => {
                        window.location.href = `/payment-success/${order.tran_id}`;
                      }}
                      className="text-[#3b5d50] hover:scale-110 transition"
                    >
                      <FaDownload size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
