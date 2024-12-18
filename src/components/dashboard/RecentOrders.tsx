"use client";

import OrderRow from "@/components/dashboard/OrderRow";
import { useQuery } from "@tanstack/react-query";
import { Empty, Spin } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

// types

type OrderType = {
  id: number;
  customerId: number;
  totalPrice: number;
  deliveryCharge: number;
  deliveryDate: string;
  deliveryTime: string;
  orderStatus: string;
  orderDate: string;
  orderTime: string;
  paymentMethod: string;
  items: string[];
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    customerId: string;
  };
  note: string;
  transactionId: string;
};

const RecentOrders = ({isSuccess}: {isSuccess: any}) => {
  const [loading, setLoading] = useState(false);

  // check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  // fetch category from server
  const {
    data: allOrders = [],
    isLoading,
    refetch,
    isRefetching,
  } = useQuery<OrderType[]>({
    queryKey: ["recentOrders"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/recent-order`
      );
      return res.data.data;
    },
    retry: 2,
    refetchOnWindowFocus: false,
    enabled: isSuccess
  });

  const handleOrderStatus = async (id: any, status: any) => {
    setLoading(true);
    // update status to server
    await axios
      .patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/update-order/${id}`,
        {
          orderStatus: status,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        if (data.data.status == "success") {
          setLoading(false);
          Swal.fire({
            position: "center",
            icon: "success",
            title: `ORDER ${status}`,
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: `${error.response.data.data.meta.cause}`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  // show loader if uploads takes time
  if (loading || isRefetching) {
    return <Spin fullscreen={true} style={{ color: "white" }} size="large" />;
  }

  return (
    <div className="relative">
      <div
        // style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        className="overflow-auto scroll-smooth bg-blue-50 mt-5 mb-5 md:mb-0"
      >
        {isLoading ? (
          <div className="flex items-center justify-center my-10 md:my-40">
            <Spin style={{ color: "white" }} size="large" />
          </div>
        ) : (
          <table className="table whitespace-nowrap">
            {/* head */}
            <thead>
              <tr className="bg-gray-200">
                <th>Customer Id</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Total Price</th>
                <th>Delivery Charge</th>
                <th>Payment Method</th>
                <th>Order Date</th>
                <th>Details</th>
                <th>Order Status</th>
                <th>Invoice</th>
              </tr>
            </thead>
            <tbody>
              {/* rows */}
              {allOrders.length > 0 ? (
                allOrders?.map((data) => (
                  <OrderRow
                    key={data.id}
                    orderData={data}
                    handleOrderStatus={handleOrderStatus}
                  ></OrderRow>
                ))
              ) : (
                <Empty
                  className="fixed top-[90%] md:top-[75%] xl:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  description="No customer found!"
                />
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RecentOrders;
