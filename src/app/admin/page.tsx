/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import RecentOrders from "@/components/dashboard/RecentOrders";
import { useQuery } from "@tanstack/react-query";
import { Statistic, StatisticProps, Tooltip } from "antd";
import axios from "axios";
import { useEffect } from "react";
import CountUp from "react-countup";

const formatter: StatisticProps["formatter"] = (value) => (
  <CountUp end={value as number} separator="," />
);

// Define the type for the data array
interface DataItem {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}

type statistic = {
  orderStatistic: {
    _sum: {
      totalPrice: number;
      _count: number;
    };
    _count: number;
  };
  customerStatistic: {
    _count: number;
  };
  productStatistic: {
    _count: number;
  };
};

const AdminDashboard = () => {
  // check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);
  // fetch order statistics
  const { data, isLoading } = useQuery<statistic>({
    queryKey: ["statistics"],
    queryFn: async () => {
      const res1 = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/statistic`
      );
      const res2 = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/customer/statistic`
      );
      const res3 = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/statistic`
      );
      return {
        orderStatistic: res1?.data?.data,
        customerStatistic: res2?.data?.data,
        productStatistic: res3?.data?.data,
      };
    },
    retry: 2,
    refetchOnWindowFocus: false,
  });

  // checking if loading
  if (isLoading) {
    return (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <progress className="progress w-56 bg-blue-200 h-4 lg:h-8 lg:w-80"></progress>
      </div>
    );
  }

  return (
    <div>
      {/* header */}
      <div>
        <h3 className="text-center pt-4 text-blue-200 text-4xl font-bold">
          Dashboard
        </h3>
      </div>
      {/* statistics */}
      <div className="mt-10 px-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-5 lg:gap-10">
        <div>
          <Statistic
            className="bg-blue-200 p-5 text-center font-bold rounded-2xl"
            title="Total Balance (BDT)"
            value={data?.orderStatistic?._sum?.totalPrice}
            precision={2}
            formatter={formatter}
          />
        </div>
        <div>
          <Statistic
            className="bg-blue-200 p-5 text-center font-bold rounded-2xl"
            title="Total Orders"
            value={data?.orderStatistic?._count}
            formatter={formatter}
          />
        </div>
        <div>
          <Statistic
            className="bg-blue-200 p-5 text-center font-bold rounded-2xl"
            title="Total Customers"
            value={data?.customerStatistic?._count}
            formatter={formatter}
          />
        </div>
        <div>
          <Statistic
            className="bg-blue-200 p-5 text-center font-bold rounded-2xl"
            title="Total Products"
            value={data?.productStatistic?._count}
            precision={2}
            formatter={formatter}
          />
        </div>
      </div>
      {/* chartbar */}
      <div
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        className="overflow-x-scroll"
      >
        <h3 className="text-center my-5 text-sm italic font-thin text-gray-400">
          Recent Orders
        </h3>
        <RecentOrders />
      </div>
    </div>
  );
};

export default AdminDashboard;
