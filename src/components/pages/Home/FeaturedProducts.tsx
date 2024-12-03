"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductCard from "./ProductCard";
import { Empty, message, Spin } from "antd";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useCart } from "@/context/CartProvider";

const desc: string[] = ["terrible", "bad", "normal", "good", "wonderful"];

interface ProductType {
    id: number;
    product_id: number;
    images: string[];
    product_name: string;
    price: number;
    discount_price: number;
    description: string;
    rating: number;
}


const FeaturedProducts = () => {
    const {modal1Open, setModal1Open} = useCart();
    // fetch all products from server
    const { data: featuredProducts = [], isLoading } = useQuery<ProductType[]>({
        queryKey: ["featuredProducts"],
        queryFn: async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/all-products`
            );
            return res?.data?.data;
        },
        retry: 2,
        refetchOnWindowFocus: false,
    });

    return (
        <div className="max-w-[70%] mx-auto my-20 relative ">
            <div className="">
                <h3 className="text-center italic font-medium">
                    Wonderful gifts
                </h3>
                <h1 className="text-center text-5xl font-medium">
                    Featured Products
                </h1>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-10 mt-20">
                {isLoading ? (
                    <Spin style={{ color: "white" }} size="large" />
                ) : featuredProducts?.length > 0 ? (
                    featuredProducts?.map((item) => (
                        <ProductCard
                            key={item?.id}
                            item={item}
                            modal1Open={modal1Open}
                            setModal1Open={setModal1Open}
                        />
                    ))
                ) : (
                    <Empty
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-16"
                        description="No products yet!"
                    />
                )}
            </div>
        </div>
    );
};

export default FeaturedProducts;
