import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import axios from "axios";
import Image from "next/image";
import React from "react";

type OrderItemType = {
    productId: number;
    product_name: string;
    images: string;
    quantity: number;
};

const OrderItem = ({ item }: { item: OrderItemType }) => {
    // fetch data from server
    const { data: singleProductImages, isLoading } = useQuery({
        queryKey: ["SingleProductImages", item?.productId],
        queryFn: async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/images-and-name/${item?.productId}`
            );
            return res?.data?.data;
        },
        retry: 2,
        refetchOnWindowFocus: false,
        enabled: item?.productId ? true : false,
    });

    console.log("images", singleProductImages);
    return (
        <div className="flex items-center gap-3 bg-gray-100 rounded-xl mt-2 p-2">
            {isLoading ? (
                <Spin size="small" />
            ) : (
                <>
                    <Image
                        className="w-[55px] h-[55px] rounded-lg"
                        width={500}
                        height={500}
                        src={singleProductImages?.images[0]}
                        alt="item-image"
                    />
                    <div className="flex flex-col justify-center">
                        <h3 className="text-[12px] font-semibold">
                            {singleProductImages?.product_name}
                        </h3>
                        <p>
                            <span className="text-[10px] font-semibold">
                                Quantity:
                            </span>{" "}
                            {item?.quantity}
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

export default OrderItem;
