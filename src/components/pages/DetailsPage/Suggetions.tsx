"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Empty, Spin } from "antd";
import ProductCard from "../Home/ProductCard";

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
    stock: string;
}

export default function Suggetions({ isSuccess }: { isSuccess: any }) {
    const [randomProducts, setRandomProducts] = useState<ProductType[]>([]);


    // fetch all products froom server
    const { data: recentProducts = [], isLoading } = useQuery<ProductType[]>({
        queryKey: ["recentProducts"],
        queryFn: async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/all-products`
            );
            return res.data.data;
        },
        enabled: isSuccess,
        retry: 2,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (!isLoading && recentProducts.length > 0) {
            const shuffledArray = [...recentProducts];
            for (let i = shuffledArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
            }
            setRandomProducts(shuffledArray.slice(0, 4));
        }
    }, [recentProducts]);

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
                        randomProducts?.map((item) => (
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
        </div>
    );
}
