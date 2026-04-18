import React from "react";
import { useQuery } from "@tanstack/react-query";

import { toast } from "react-toastify";
import useAxios from "../../../Hooks/useAxios";

const AllOrders = () => {
  const axiosInstance = useAxios();

  const { data: orders = [], refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosInstance.get("/allorders");
      return res.data;
    },
  });
  console.log(orders);

  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await axiosInstance.patch(`/orders/${id}`, {
        orderStatus: status,
      });

      if (res.data.modifiedCount > 0) {
        toast.success(`Order ${status}`);
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#3C5D50]">All Orders</h2>

      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-[#3C5D50] text-white">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Title</th>
              <th className="p-3">Price</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Update Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) =>
              order.orders.map((item) => (
                <tr key={item._id} className="border-b">
                  {/* Image */}
                  <td className="p-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-14 rounded object-cover"
                    />
                  </td>

                  {/* Title */}
                  <td className="p-3 font-medium">{item.title}</td>

                  {/* Price */}
                  <td className="p-3">{item.price} BDT</td>

                  {/* Status */}
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        order.orderStatus === "delivered"
                          ? "bg-green-100 text-green-700"
                          : order.orderStatus === "accepted"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.orderStatus || "pending"}
                    </span>
                  </td>

                  {/* Update */}
                  <td className="p-3">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() =>
                          handleStatusUpdate(order._id, "accepted")
                        }
                        className="px-3 py-1 bg-blue-600 text-white rounded text-xs"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() =>
                          handleStatusUpdate(order._id, "delivered")
                        }
                        className="px-3 py-1 bg-green-600 text-white rounded text-xs"
                      >
                        Delivered
                      </button>
                    </div>
                  </td>
                </tr>
              )),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrders;
