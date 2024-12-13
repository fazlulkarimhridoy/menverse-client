"use client";

import React from "react";
import ProductCard from "../Home/ProductCard";
import { Empty, Spin } from "antd";
import { useCategory } from "@/context/CategoryContext";
import { useSearchText } from "@/context/SearchTextContext";

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
    size: string;
}

const AllProducts = ({ shopProducts, isLoading }: { shopProducts: any, isLoading: Boolean }) => {
    const { categoryName } = useCategory();
    const { searchText } = useSearchText();

    // Handle product filter for search
    const filteredProducts =
        shopProducts?.length > 0
            ? shopProducts?.filter((product: any) => {
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
                    filteredProducts?.map((item: ProductType) => (
                        <ProductCard
                            key={item?.id}
                            item={item}
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
