"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../Home/ProductCard";
import { Empty, message, Spin } from "antd";
import { useCategory } from "@/context/CategoryContext";
import { useSearchText } from "@/context/SearchTextContext";
import Swal from "sweetalert2";
import { useCart } from "@/context/CartProvider";

interface ProductType {
    id: number;
    product_id: number;
    images: string[];
    product_name: string;
    price: number;
    discount_price: number;
    description: string;
    rating: number;
    category: string;
    quantity: number;
    size: string
}

const AllProducts = () => {
    const { categoryName } = useCategory();
    const { searchText } = useSearchText();
    const {modal1Open, setModal1Open} = useCart();

    // fetch all products froom server
    const { data: shopProducts = [], isLoading } = useQuery<ProductType[]>({
        queryKey: ["featuredProducts"],
        queryFn: async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/all-products`
            );
            return res.data.data;
        },
        retry: 2,
        refetchOnWindowFocus: false,
    });

    // Handle product filter for search
    const filteredProducts =
        shopProducts?.length > 0
            ? shopProducts?.filter((product) => {
                  const searchingText = categoryName || searchText;
                  if (searchingText) {
                      const searchString = searchingText.toLowerCase();

                      // Check product name, category (strings), and productId (number)
                      return (
                          product?.category
                              ?.toLowerCase()
                              ?.includes(searchString) ||
                          product?.product_name
                              ?.toLowerCase()
                              ?.includes(searchString) ||
                          product?.description
                              ?.toLowerCase()
                              ?.includes(searchString)
                      );
                  }
                  return true; // If no searchText, return all products
              })
            : [];

 
    return (
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-10 my-3 px-1 md:my-20 md:px-5">
            {isLoading ? (
                <Spin size="large" />
            ) : shopProducts?.length > 0 ? (
                filteredProducts?.length > 0 ? (
                    filteredProducts?.map((item) => (
                        <ProductCard
                            key={item?.id}
                            item={item}
                            modal1Open={modal1Open}
                            setModal1Open={setModal1Open}
                        />
                    ))
                ) : (
                    <Empty description="No product for this category!" />
                )
            ) : (
                <Empty description="No product added yet!" />
            )}
        </div>
    );
};

export default AllProducts;
