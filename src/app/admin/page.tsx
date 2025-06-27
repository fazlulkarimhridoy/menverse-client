/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import RecentOrders from "@/components/dashboard/RecentOrders";
import { useQuery } from "@tanstack/react-query";
import { Spin, Statistic, StatisticProps } from "antd";
import axios from "axios";
import { useEffect } from "react";
import CountUp from "react-countup";
import { FaDollarSign } from "react-icons/fa";

const formatter: StatisticProps["formatter"] = (value) => (
    <div className="flex items-center justify-center gap-1 text-gray-600 font-semibold">
        <FaDollarSign className="text-xl mt-0.5" />
        <CountUp end={value as number} separator="," />
    </div>
);

type statistic = {
    orderStatistic: {
        _sum: {
            totalPrice: number;
            _count: number;
        };
        _count: number;
    };
    productStatistic: {
        _count: number;
    };
    courierBalance: number;
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
    const { data, isLoading, isSuccess } = useQuery<statistic>({
        queryKey: ["statistics"],
        queryFn: async () => {
            const res1 = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/order/statistic`);
            const res2 = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/statistic`);
            const res3 = await axios.get(`${process.env.NEXT_PUBLIC_COURIER_BASE_URL}/get_balance`, {
                headers: {
                    "Api-Key": `${process.env.NEXT_PUBLIC_COURIER_API_KEY}`,
                    "Secret-Key": `${process.env.NEXT_PUBLIC_COURIER_SECRET_KEY}`,
                    "Content-Type": "application/json",
                },
            });
            return {
                orderStatistic: res1?.data?.data,
                productStatistic: res2?.data?.data,
                courierBalance: res3?.data?.current_balance,
            };
        },
        retry: 2,
        refetchOnWindowFocus: false,
    });

    // checking if loading
    if (isLoading) {
        return <Spin size="large" className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />;
    }

    return (
        <div>
            {/* header */}
            <div>
                <h3 className="hidden md:block text-center pt-4 text-blue-200 text-4xl font-bold">MENVERSE</h3>
            </div>
            {/* statistics */}
            <div className="text-nowrap mt-5 md:mt-10 px-2 grid grid-cols-2 xl:grid-cols-4 gap-3 md:gap-5 lg:gap-10">
                <Statistic
                    className="bg-green-500/10 p-5 rounded-lg"
                    title="Total Balance (BDT)"
                    value={data?.orderStatistic?._sum?.totalPrice}
                    precision={2}
                    formatter={formatter}
                />
                <Statistic
                    className="bg-indigo-500/10 p-5 rounded-lg"
                    title="Courier Balance"
                    value={data?.courierBalance}
                    formatter={formatter}
                />
                <Statistic
                    className="bg-lime-500/10 p-5 rounded-lg"
                    title="Total Orders"
                    value={data?.orderStatistic?._count}
                    formatter={formatter}
                />

                <Statistic
                    className="bg-blue-500/10 p-5 rounded-lg"
                    title="Total Products"
                    value={data?.productStatistic?._count}
                    precision={2}
                    formatter={formatter}
                />
            </div>
            {/* chartbar */}
            <div style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} className="overflow-x-scroll">
                <h3 className="text-center my-5 text-sm italic font-thin text-gray-400">Recent Orders</h3>
                <RecentOrders isSuccess={isSuccess} />
            </div>
        </div>
    );
};

export default AdminDashboard;
