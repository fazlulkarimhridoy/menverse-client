"use client";

import CustomerRow from "@/components/dashboard/CustomerRow";
import { useQuery } from "@tanstack/react-query";
import { Empty, Input } from "antd";
import { SearchProps } from "antd/es/input";
import axios from "axios";
import React, { useEffect, useState } from "react";

type CustomerType = {
    id: number;
    customerId: number;
    name: string;
    email: string;
    phone: string;
    address: string;
};

const { Search } = Input;

const Products = () => {
    // check if user is logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
        }
    }, []);
    // states and calls
    const [searchText, setSearchText] = useState("");

    // fetch all customers
    const {
        data: allCustomers = [],
        isLoading,
        refetch,
    } = useQuery<CustomerType[]>({
        queryKey: ["allCustomers"],
        queryFn: async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/customer/all-customer`
            );
            return res.data.data;
        },
        retry: 2,
        refetchOnWindowFocus: false,
    });

    // Handle product filter for search
    const filteredCustomers =
        allCustomers?.length > 0
            ? allCustomers?.filter((customer) => {
                  if (searchText) {
                      const searchString = searchText.toLowerCase();

                      // Check product name, category (strings), and productId (number)
                      return (
                          customer?.name
                              ?.toLowerCase()
                              ?.includes(searchString) ||
                          customer?.email
                              ?.toLowerCase()
                              ?.includes(searchString) ||
                          customer?.phone
                              ?.toString()
                              ?.toLowerCase()
                              ?.includes(searchString) ||
                          customer?.customerId
                              ?.toString()
                              ?.toLowerCase()
                              ?.includes(searchString)
                      );
                  }
                  return true; // If no searchText, return all products
              })
            : [];

    // handle search filed value
    const onSearch: SearchProps["onSearch"] = (value) => {
        setSearchText(value);
        console.log(filteredCustomers);
    };

    // checking if loading
    if (isLoading) {
        return (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <progress className="progress w-56 bg-blue-200 h-4 lg:h-8 lg:w-80"></progress>
            </div>
        );
    }

    return (
        <div className="relative">
            <div>
                <h3 className="text-center pt-4 text-blue-200 text-4xl font-bold">
                    Manage Customer
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
                            <th>Id</th>
                            <th>Unique Id</th>
                            <th>Name</th>
                            <th>Email Address</th>
                            <th>Phone</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* rows */}
                        {allCustomers.length > 0 ? (
                            filteredCustomers?.map((data) => (
                                <CustomerRow
                                    key={data.id}
                                    customerData={data}
                                ></CustomerRow>
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

export default Products;
