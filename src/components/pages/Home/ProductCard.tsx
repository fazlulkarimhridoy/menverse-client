"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Modal } from 'antd';
import { FaCheckCircle } from "react-icons/fa";
import { useCart } from "@/context/CartProvider";
import { TbCurrencyTaka } from "react-icons/tb";

interface Item {
    id: number;
    product_id: number;
    images: string[];
    product_name: string;
    price: number;
    discount_price: number;
    description: string;
    rating: number;
    quantity: number;
    size: string;
}

interface ProductCardProps {
    item: Item;
    modal1Open: boolean;
    setModal1Open: Function;
}

const ProductCard: React.FC<ProductCardProps> = ({ item, modal1Open, setModal1Open }) => {



    const { addToCart } = useCart()

    const itemObject = {
        id: item?.id,
        product_name: item?.product_name,
        image: item?.images[0],
        price: item?.price,
        quantity: item?.quantity,
        discount_price: item?.discount_price,
        size: item?.size

    }

    return (
        <div className="min-h-[200px] w-[250px] flex flex-col items-stretch text-center justify-center gap-4 px-4 pt-4 pb-8 rounded-xl amoled-shadow bg-white lg:bg-none">
            <Link href={`/products/${item.id}`}>
                <div className="p-4">
                    <Image
                        src={item?.images[0]}
                        alt={`Image`}
                        width={120}
                        height={100}
                        className="w-[200px] h-[210px] rounded-lg"
                    />
                </div>
                <div className="border-[#194464] flex flex-col gap-2">
                    <p className="truncate font-outfit text-base font-bold text-[#194464]">
                        {item?.product_name}
                    </p>
                    <p className="font-outfit text-sm text-[#194464] max-h-14 overflow-hidden">
                        {item?.description}
                    </p>
                    {/* price ...............................*/}
                    <div className="flex flex-col items-center font-semibold text-xl">
                        <div
                            className={`flex flex-col-reverse ${item.discount_price
                                ? "flex-row-reverse justify-end items-center "
                                : ""
                                }`}
                        >
                            <div className="text-center rounded-lg  text-[#184364] font-bold text-lg flex justify-center items-center">
                                <span
                                    className={`${item?.discount_price
                                        ? "line-through text-red-500 text-xl"
                                        : ""
                                        } text-lg font-semibold`}
                                >
                                    {item?.price}
                                </span>{" "}
                                <span>
                                    {" "}
                                    <TbCurrencyTaka />
                                </span>
                            </div>
                            {item?.discount_price ? (
                                <div className="t text-center rounded-lg  text-[#184364] font-bold text-xl flex justify-center items-center">
                                    Price : {item?.discount_price}{" "}
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
                </div>
            </Link>

            <div>
                <button
                    onClick={() =>
                        addToCart(itemObject)
                    }
                    className="btn border-2 border-[#194464] px-2 py-2 rounded-xl text-base font-semibold font-outfit bg-[#194464] text-white transition-colors duration-300 text-center"
                >
                    Add to cart
                </button>

                <Modal
                    key={item?.id}
                    footer={[
                        <div key={item?.id} className="flex gap-2 justify-end">
                            <Link href={`/cart`}>
                                <button className="border-2 border-[#194464] px-2 py-2 rounded-xl text-base font-semibold font-outfit hover:bg-[#194464] hover:text-white transition-colors duration-300 text-center" >
                                    View cart
                                </button>
                            </Link>
                            <Link href={`/purchaseOrder`}>
                                <button className="border-2 border-[#194464] px-2 py-2 rounded-xl text-base font-semibold font-outfit hover:bg-[#194464] hover:text-white transition-colors duration-300 text-center" >
                                    Purchase
                                </button>
                            </Link>
                        </div>
                    ]}
                    closeIcon
                    mask={false}
                    title={null}
                    style={{ top: 20 }}
                    open={modal1Open}
                    onCancel={() => setModal1Open(false)}
                    okText="View cart"
                    className="h-[400px]"
                >
                    <div className="flex gap-4">
                        {/* <figure>
                            <Image width={150} height={150} src={item?.images[0]} alt="flower" />
                        </figure> */}
                        <div className="flex space-y-8">
                            <div className="space-y-4">
                                <h1 className="font-outfit md:text-2xl font-semibold">{item?.product_name}</h1>
                                <h1 className="flex items-center gap-2 md:text-xl font-bold"><FaCheckCircle className="text-xl" /> Added to cart successfully!</h1>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default ProductCard;
