import React from 'react';

import { FaBoxOpen, FaDownload, FaTruck } from "react-icons/fa";
import SharedBanner from '../../../components/Shared/SharedBanner';

const orders = [
  { id: "#CM9920", item: "Engineering Calculator", price: 1200, status: "Delivered", date: "Feb 20, 2026", trxId: "trx_772183" },
  { id: "#CM9945", item: "Organic Chemistry Vol 1", price: 450, status: "In Transit", date: "Mar 01, 2026", trxId: "trx_990122" },
];

const MyOrders = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-[#3b5d50]">
        <SharedBanner title="PURCHASE HISTORY" subtitle="Track your orders and download invoices for your campus marketplace purchases." />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-[#3b5d50] uppercase text-xs font-bold">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Trx ID</th>
                <th className="px-6 py-4">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-bold text-blue-600">{order.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">{order.item}</td>
                  <td className="px-6 py-4 font-bold text-gray-700">৳{order.price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-gray-500">{order.trxId}</td>
                  <td className="px-6 py-4">
                    <button className="text-[#3b5d50] hover:scale-110 transition"><FaDownload /></button>
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