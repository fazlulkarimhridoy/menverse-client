"use client";

import OrderRow from "@/components/dashboard/OrderRow";
import { useQuery } from "@tanstack/react-query";
import { Empty, Input, Spin } from "antd";
import { SearchProps } from "antd/es/input";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

// types
const { Search } = Input;

type OrderType = {
    id: number;
    customerId: number;
    totalPrice: number;
    orderStatus: string;
    orderDate: string;
    orderTime: string;
    paymentMethod: string;
    items: string[];
    customer: {
        name: string;
        phone: string;
        address: string;
        customerId: string;
    };
    note: string;
};

const Orders = () => {
    const [loading, setLoading] = useState(false);
    // check if user is logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
        }
    }, []);
    // states and calls
    const [searchText, setSearchText] = useState("");

    // fetch category from server
    const {
        data: allOrders = [],
        isLoading,
        refetch,
        isRefetching,
    } = useQuery<OrderType[]>({
        queryKey: ["allOrders"],
        queryFn: async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/all-order`
            );
            return res.data.data;
        },
        retry: 2,
        refetchOnWindowFocus: false,
    });

    // Handle product filter for search
    const filteredOrders =
        allOrders?.length > 0
            ? allOrders?.filter((order) => {
                  if (searchText) {
                      const searchString = searchText.toLowerCase();

                      // Check product name, category (strings), and productId (number)
                      const isCustomerMatch =
                          order?.customer.name
                              ?.toLowerCase()
                              ?.includes(searchString) ||
                          order?.customer.phone
                              ?.toString()
                              ?.toLowerCase()
                              ?.includes(searchString) ||
                          order?.customerId
                              ?.toString()
                              ?.toLowerCase()
                              ?.includes(searchString);

                      // Format and filter by orderDate
                      let isDateMatch = false;
                      if (order?.orderDate) {
                          try {
                              // Convert orderDate string to a comparable format (YYYY-MM-DD)
                              const formattedOrderDate = new Date(
                                  order.orderDate
                              )
                                  .toISOString()
                                  .split("T")[0];
                              isDateMatch =
                                  formattedOrderDate.includes(searchString);
                          } catch (e) {
                              console.error(
                                  "Error parsing orderDate:",
                                  order?.orderDate,
                                  e
                              );
                          }
                      }

                      return isCustomerMatch || isDateMatch;
                  }
                  return true; // If no searchText, return all products
              })
            : [];

    const handleOrderStatus = async (id: any, status: any) => {
        console.log("id", id);
        console.log("status", status);
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
                if (data?.data?.status == "success") {
                    refetch();
                    setLoading(false);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `ORDER ${status}`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
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

    // handle search filed value
    const onSearch: SearchProps["onSearch"] = (value) => {
        setSearchText(value);
    };

    // checking if loading
    if (isLoading) {
        return (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <progress className="progress w-56 bg-blue-200 h-4 lg:h-8 lg:w-80"></progress>
            </div>
        );
    }

    // show loader if uploads takes time
    if (loading || isRefetching) {
        return (
            <Spin fullscreen={true} style={{ color: "white" }} size="large" />
        );
    }

    return (
        <div className="relative">
            <div>
                <h3 className="text-center pt-4 text-blue-200 text-4xl font-bold">
                    Orders <span className="text-sm text-red-200 -ml-2">{filteredOrders?.length}</span>
                </h3>
                <div className="mt-5 w-full xl:w-1/2 mx-auto">
                    <Search
                        placeholder="search by name, number, email...."
                        allowClear
                        enterButton="Search"
                        size="large"
                        onSearch={onSearch}
                        onKeyDown={(e: any) => {
                            if (e.key === "Enter") {
                                setSearchText(e.target.value);
                            }
                        }}
                    />
                </div>
            </div>
            <div
                // style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                className="overflow-auto scroll-smooth bg-blue-50 mt-5 mb-5 md:mb-0"
            >
                <table className="table whitespace-nowrap">
                    {/* head */}
                    <thead>
                        <tr className="bg-gray-200">
                            <th>Customer Id</th>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Total Price</th>
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
                            filteredOrders?.map((data) => (
                                <OrderRow
                                    key={data.id}
                                    categoryData={data}
                                    handleOrderStatus={handleOrderStatus}
                                ></OrderRow>
                            ))
                        ) : (
                            <Empty
                                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                description="No customer found!"
                            />
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;
