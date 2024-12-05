"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Empty, Spin } from "antd";
import ProductCard from "../Home/ProductCard";
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
    size: string;
}

export default function Suggetions({ isSuccess }: { isSuccess: any }) {
    const { modal1Open, setModal1Open } = useCart();

    // fetch all products froom server
    const { data: recentProducts = [], isLoading } = useQuery<ProductType[]>({
        queryKey: ["recentProducts"],
        queryFn: async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/recent-products`
            );
            return res.data.data;
        },
        enabled: isSuccess,
        retry: 2,
        refetchOnWindowFocus: false,
    });
    return (
        <div className="border-t py-4">
            <h1 className="text-center text-3xl font-semibold md:text-4xl font-outfit ">
                You may also like
            </h1>
            <div className="flex flex-wrap justify-center items-center gap-2 md:gap-10 my-5 px-1 md:my-20 md:px-5">
                {isLoading ? (
                    <Spin size="large" />
                ) : recentProducts?.length > 0 ? (
                    recentProducts?.length > 0 ? (
                        recentProducts?.map((item) => (
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
        </div>
    );
}
