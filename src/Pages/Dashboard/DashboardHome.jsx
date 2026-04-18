import React, { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { IoCopyOutline } from "react-icons/io5";
import { CiSquareChevRight } from "react-icons/ci";
import { BsCurrencyDollar } from "react-icons/bs";
import { CiMoneyCheck1 } from "react-icons/ci";
import DonutChart from "./utill/DonutChart";
import DonutChart2 from "./utill/DonutChart2";
import Layout3 from "./utill/Layout3";
const DashboardHome = () => {
  const { users, allorders, allposts } = useContext(AuthContext);
  return (
    <div>
      <div className="flex items-center justify-between mb-10 px-2">
        <div>
          <h3 className="text-black text-[24px] font-bold">ANALYTIC</h3>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid md:grid-cols-2 2xl:grid-cols-4 gap-6">
        <div className="grid  gap-4">
          <div className="bg-[#1c1c2e] w-[310px] xl:w-[418px] 2xl:w-[310px] mx-auto rounded-xl p-6 flex justify-between h-[165px]">
            <div>
              <h4 className="text-gray-400 text-sm mb-3">Users</h4>
              <p className="text-white text-3xl font-bold mb-3">
                {users?.length}
              </p>
              <p className="text-green-400 text-xs">↑ 8.2% since last month</p>
            </div>
            <div>
              <IoCopyOutline className="text-white w-[50px] h-[50px]" />
            </div>
          </div>

          {/* Month total */}
          <div className="bg-[#1c1c2e] w-[310px] xl:w-[418px] 2xl:w-[310px] mx-auto rounded-xl p-6 flex justify-between h-[165px]">
            <div className="">
              <h4 className="text-gray-400 text-sm  mb-3">Month total</h4>
              <p className="text-white text-3xl font-bold mb-3">$25,410</p>
              <p className="text-red-400 text-xs ">↓ 0.2% since last month</p>
            </div>
            <div>
              <BsCurrencyDollar className="text-white w-[50px] h-[50px]" />
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="bg-[#1c1c2e] w-[310px] xl:w-[418px] 2xl:w-[310px] mx-auto rounded-xl p-6 flex justify-between h-[165px]">
            <div className="">
              <h4 className="text-gray-400 text-sm mb-3">Approved</h4>
              <p className="text-white text-3xl font-bold mb-3">
                {users.length - 1}
              </p>
              <p className="text-green-400 text-xs ">↑ 3.4% since last month</p>
            </div>
            <div>
              <CiSquareChevRight className="text-white w-[50px] h-[50px]" />
            </div>
          </div>

          {/* Revenue */}
          <div className="bg-[#1c1c2e] w-[310px] xl:w-[418px] 2xl:w-[310px] mx-auto rounded-xl p-6 flex justify-between h-[165px]">
            <div>
              <h4 className="text-gray-400 text-sm mb-3">Revenue</h4>
              <p className="text-white text-3xl font-bold mb-3">$1,352</p>
              <p className="text-red-400 text-xs mt-2">
                ↓ 1.2% since last month
              </p>
            </div>
            <div>
              <CiMoneyCheck1 className="text-white w-[50px] h-[50px]" />
            </div>
          </div>
        </div>

        <div className="bg-[#1c1c2e] rounded-xl p-6 w-[310px] xl:w-[418px] 2xl:w-[310px] mx-auto items-center justify-center h-[346px]">
          <h4 className="text-gray-400 text-sm mb-3">Orders</h4>
          <p className="text-white text-3xl font-bold">{allorders?.length}</p>
          <DonutChart></DonutChart>
          <div className="flex gap-4 mt-3 text-gray-300 text-xs">
            <p>
              <span className="text-yellow-400">●</span> 62% Done{" "}
            </p>
            <p>
              <span className="text-orange-400">●</span> 30% Pending
            </p>
            <p>
              <span className="text-yellow-200">●</span> 8% Cancel
            </p>
          </div>
        </div>

        <div className="bg-[#1c1c2e] rounded-xl p-6 w-[310px] xl:w-[418px] 2xl:w-[310px] mx-auto items-center justify-center h-[346px]">
          <h4 className="text-gray-400 text-sm mb-3">Total Posts</h4>
          <p className="text-white text-3xl font-bold mb-2">
            {allposts?.length}
          </p>
          <DonutChart2></DonutChart2>
        </div>
      </div>

      <Layout3></Layout3>
    </div>
  );
};

export default DashboardHome;
