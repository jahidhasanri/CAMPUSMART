import React, { useContext, useMemo } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { IoCopyOutline } from "react-icons/io5";
import { CiSquareChevRight } from "react-icons/ci";
import { BsCurrencyDollar } from "react-icons/bs";
import { CiMoneyCheck1 } from "react-icons/ci";
import DonutChart from "./utill/DonutChart";
import DonutChart2 from "./utill/DonutChart2";

const DashboardHome = () => {
  const { users, allorders, allposts } = useContext(AuthContext);

  // -----------------------------
  // 🔥 Month Total Calculation
  // -----------------------------
  const monthTotal = useMemo(() => {
    if (!allorders) return 0;

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    return allorders
      .filter((order) => {
        const date = new Date(order.createdAt);
        return (
          date.getMonth() === currentMonth &&
          date.getFullYear() === currentYear
        );
      })
      .reduce((sum, order) => sum + (order.total || 0), 0);
  }, [allorders]);

  // -----------------------------
  // 🔥 Revenue Calculation
  // -----------------------------
 const revenue = useMemo(() => {
  if (!allorders) return 0;

  return allorders
    .filter((order) => order.orderStatus === "delivered")
    .reduce((sum, order) => sum + (order.total || 0) * 0.1, 0);
}, [allorders]);

  return (
    <div>
      <div className="flex items-center justify-between mb-10 px-2">
        <h3 className="text-black text-[24px] font-bold">ANALYTIC</h3>
      </div>

      {/* Dashboard Cards */}
      <div className="grid md:grid-cols-2 2xl:grid-cols-4 gap-6">

        {/* USERS */}
        <div className="grid gap-4">
          <div className="bg-[#1c1c2e] w-[310px] xl:w-[418px] 2xl:w-[310px] mx-auto rounded-xl p-6 flex justify-between h-[165px]">
            <div>
              <h4 className="text-gray-400 text-sm mb-3">Users</h4>
              <p className="text-white text-3xl font-bold mb-3">
                {users?.length || 0}
              </p>
            </div>
            <IoCopyOutline className="text-white w-[50px] h-[50px]" />
          </div>

          {/* MONTH TOTAL (DYNAMIC) */}
          <div className="bg-[#1c1c2e] w-[310px] xl:w-[418px] 2xl:w-[310px] mx-auto rounded-xl p-6 flex justify-between h-[165px]">
            <div>
              <h4 className="text-gray-400 text-sm mb-3">Month total</h4>
              <p className="text-white text-3xl font-bold mb-3">
                ${monthTotal}
              </p>
            
            </div>
            <BsCurrencyDollar className="text-white w-[50px] h-[50px]" />
          </div>
        </div>

        {/* APPROVED + REVENUE */}
        <div className="grid gap-4">

          <div className="bg-[#1c1c2e] w-[310px] xl:w-[418px] 2xl:w-[310px] mx-auto rounded-xl p-6 flex justify-between h-[165px]">
            <div>
              <h4 className="text-gray-400 text-sm mb-3">Approved</h4>
              <p className="text-white text-3xl font-bold mb-3">
                {users?.length ? users.length - 1 : 0}
              </p>
              <p className="text-green-400 text-xs">↑ 3.4% since last month</p>
            </div>
            <CiSquareChevRight className="text-white w-[50px] h-[50px]" />
          </div>

          {/* REVENUE (DYNAMIC) */}
          <div className="bg-[#1c1c2e] w-[310px] xl:w-[418px] 2xl:w-[310px] mx-auto rounded-xl p-6 flex justify-between h-[165px]">
            <div>
              <h4 className="text-gray-400 text-sm mb-3">Revenue</h4>
              <p className="text-white text-3xl font-bold mb-3">
                ${revenue}
              </p>
              <p className="text-red-400 text-xs">↓ 1.2% since last month</p>
            </div>
            <CiMoneyCheck1 className="text-white w-[50px] h-[50px]" />
          </div>
        </div>

        {/* ORDERS */}
        <div className="bg-[#1c1c2e] rounded-xl p-6 w-[310px] xl:w-[418px] 2xl:w-[310px] mx-auto h-[346px]">
          <h4 className="text-gray-400 text-sm mb-3">Orders</h4>
          <p className="text-white text-3xl font-bold">
            {allorders?.length || 0}
          </p>

          <DonutChart />

          <div className="flex gap-4 mt-3 text-gray-300 text-xs">
            <p><span className="text-yellow-400">●</span> 62% Done</p>
            <p><span className="text-orange-400">●</span> 30% Pending</p>
            <p><span className="text-yellow-200">●</span> 8% Cancel</p>
          </div>
        </div>

        {/* POSTS */}
        <div className="bg-[#1c1c2e] rounded-xl p-6 w-[310px] xl:w-[418px] 2xl:w-[310px] mx-auto h-[346px]">
          <h4 className="text-gray-400 text-sm mb-3">Total Posts</h4>
          <p className="text-white text-3xl font-bold mb-2">
            {allposts?.length || 0}
          </p>

          <DonutChart2 />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;