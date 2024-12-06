"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TbCurrencyTaka } from "react-icons/tb";
import { PiFlowerFill } from "react-icons/pi";
import { Flex, Rate } from "antd";
import { Spin } from "antd";
import ImageDetails from "@/components/pages/DetailsPage/ImageDetails";
import { useRouter } from "next/navigation";
import { FaThumbsUp, FaTshirt } from "react-icons/fa";
import { useCart } from "@/context/CartProvider";
import Suggetions from "@/components/pages/DetailsPage/Suggetions";

const desc: string[] = ["terrible", "bad", "normal", "good", "wonderful"];

interface ProductType {
    id: number;
    productId: number;
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

const Page = ({ params }: { params: { slug: string } }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { addToCart } = useCart();
    const router = useRouter();
    const { push } = router;

    const {
        data: singleProduct,
        isLoading,
        isSuccess,
    } = useQuery<ProductType>({
        queryKey: ["singleProduct"],
        queryFn: async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/details/${params.slug}`
            );
            return res.data.data;
        },
        retry: 2,
        refetchOnWindowFocus: false,
    });

    const singleObj = {
        id: singleProduct?.id ?? 0,
        product_name: singleProduct?.product_name ?? "",
        image: singleProduct?.images[0] ?? "",
        price: singleProduct?.discount_price ?? 0,
        quantity: singleProduct?.quantity ?? 0,
        discount_price: singleProduct?.discount_price ?? 0,
        size: singleProduct?.size ?? "",
        uid: Math.ceil(Math.random() * 999),
    };

    // handle cart click
    const handleAddToCart = () => {
        addToCart(singleObj);
        push("/cart");
    };

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className=" md:w-[90%] mx-auto lg:p-4">
            {isLoading ? (
                <div className="flex items-center justify-center my-60">
                    <Spin size="large" />
                </div>
            ) : (
                singleProduct && (
                    <div className="rounded-xl border-[#f472b6] lg:flex justify-start gap-4 md:gap-10 w-full lg:w-[83%] mx-auto p-6">
                        {/* image component */}
                        <div>
                            <ImageDetails srcList={singleProduct?.images} />
                        </div>
                        {/* details */}
                        <div className="mt-3 space-y-4">
                            <h1 className="text-left text-sm font-thin italic text-gray-600">
                                Menverse 👕
                            </h1>
                            <div className="space-y-3">
                                <h1 className="text-3xl md:text-4xl font-semibold font-outfit text-[#0b0f3b]">
                                    {singleProduct?.product_name}
                                </h1>
                                {/* price ...............................*/}
                                <div className="flex items-center font-semibold text-2xl">
                                    <div
                                        className={`max-w-52 flex gap-2 ${
                                            singleProduct.discount_price
                                                ? "flex-row-reverse justify-end items-center "
                                                : ""
                                        }`}
                                    >
                                        <div className="text-center rounded-lg py-4 text-[#184364] font-bold text-xl flex justify-center items-center">
                                            <span
                                                className={`${
                                                    singleProduct?.discount_price
                                                        ? "line-through text-red-500 text-xl"
                                                        : ""
                                                } text-3xl font-semibold`}
                                            >
                                                {singleProduct?.price}
                                            </span>{" "}
                                            <span>
                                                {" "}
                                                <TbCurrencyTaka />
                                            </span>
                                        </div>
                                        {singleProduct?.discount_price ? (
                                            <div className="t text-center rounded-lg py-4 text-[#184364] font-bold text-4xl flex justify-center items-center">
                                                {singleProduct?.discount_price}{" "}
                                                <span>
                                                    {" "}
                                                    <TbCurrencyTaka />
                                                </span>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                                <div className="text-xl font-outfit font-semibold max-w-[600px] text-wrap">
                                    {isExpanded
                                        ? singleProduct?.description
                                        : `${singleProduct?.description.slice(
                                              0,
                                              150
                                          )}...`}
                                    <button
                                        onClick={toggleReadMore}
                                        className="text-gray-400 ml-2 !text-lg"
                                    >
                                        {isExpanded ? "See Less" : "See More"}
                                    </button>
                                </div>
                                <p className=""></p>
                                <div className="flex items-center gap-2 mt-2 w-full">
                                    <FaThumbsUp />
                                    <Flex gap="middle">
                                        <Rate
                                            className="flex items-center justify-center text-base text-pink-600"
                                            tooltips={desc}
                                            value={singleProduct?.rating}
                                        />
                                    </Flex>
                                </div>
                                <p className="flex items-center gap-2 text-xl font-semibold">
                                    <span>
                                        <FaTshirt />{" "}
                                    </span>
                                    {singleProduct?.category}
                                </p>
                            </div>
                            <div className="space-y-4 max-w-[400px] ">
                                <div className="flex  gap-2">
                                    <div
                                        onClick={handleAddToCart}
                                        className="btn w-full lg:w-36 border-2 flex-shrink-0 border-[#0b0f3b] rounded-lg hover:text-white bg-[#0b0f3b]   text-white px-2 font-bold flex items-center"
                                    >
                                        <button>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}
            <div>
                <Suggetions isSuccess={isSuccess} />
            </div>
        </div>
    );
};

export default Page;
