"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button, Modal } from "antd";
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
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
    const { addToCart, updateCartItemQuantity, setCartData } = useCart();
    const [modalData, setModalData] = useState<Item | null>(null);
    const [quantity, setQuantity] = useState(1);
    // const [size, setSize] = useState("");
    const [uniqueId, setUniqueId] = useState<number>(0);
    const [activeSizeButton, setActiveSizeButton] = useState<number | null>(null);

    // handle cart data
    const handleAddToCart = () => {
        const randomId = Math.ceil(Math.random() * 999);
        setUniqueId(randomId);
        const itemObject = {
            id: item?.id,
            product_name: item?.product_name,
            image: item?.images[0],
            price: item?.price,
            quantity: item?.quantity,
            discount_price: item?.discount_price,
            size: item?.size,
            uid: randomId,
        };

        addToCart(itemObject);
        setModalData(item); // Pass the current product to the modal
    };

    // handle quantity changes
    const handleQuantityChange = (newQuantity: number) => {
        setQuantity(newQuantity);
        updateCartItemQuantity(uniqueId, newQuantity);
    };

    // handle size changes
    const handleSizeChange = (id: number, size: string) => {
        setCartData((prevCart) =>
            prevCart.map((item) => (item.uid === id ? { ...item, size } : item))
        );
    };

    return (
        <div className="w-[170px] md:w-[250px] flex flex-col items-stretch text-center justify-center gap-1 md:gap-4 p-3 md:px-4 lg:pt-4 md:pb-8 rounded-xl amoled-shadow bg-white hover:bg-sky-50 transition-all duration-200 lg:bg-none">
            <Link href={`/products/${item.id}`}>
                <div className="md:p-4">
                    <Image
                        src={item?.images[0]}
                        alt={`Image`}
                        width={500}
                        height={500}
                        className="w-full h-[150px] md:w-[200px] md:h-[200px] rounded-lg"
                    />
                </div>
                <div className="border-[#194464] flex flex-col gap-1 md:px-4 mt-2">
                    <p className="md:truncate font-outfit text-sm lg:text-base font-bold text-[#194464]">
                        {item?.product_name}
                    </p>
                    <p className="font-outfit text-xs md:text-sm text-[#194464] max-h-14 overflow-hidden truncate md:whitespace-normal">
                        {item?.description}
                    </p>
                    <div className="flex flex-col items-center font-semibold text-xl">
                        <div
                            className={`flex flex-row-reverse ${
                                item.discount_price
                                    ? "flex-row-reverse justify-end items-center "
                                    : ""
                            }`}
                        >
                            <div className="text-center rounded-lg text-[#184364] font-bold text-lg flex justify-center items-center">
                                <span
                                    className={`${
                                        item?.discount_price
                                            ? "line-through text-red-500 text-xl"
                                            : ""
                                    } text-lg font-semibold`}
                                >
                                    {item?.price}
                                </span>
                                <span>
                                    <TbCurrencyTaka />
                                </span>
                            </div>
                            {item?.discount_price && (
                                <div className="text-center rounded-lg text-[#184364] font-bold text-xl flex justify-center items-center">
                                    {item?.discount_price}
                                    <TbCurrencyTaka />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Link>

            <div className="md:px-4">
                <button
                    onClick={handleAddToCart}
                    className="w-full btn btn-sm md:btn-md border-2 border-[#194464] p-1 md:p-2 rounded-lg md:rounded-xl text-sm md:text-base font-semibold font-outfit bg-[#194464] text-white transition-colors duration-300 text-center"
                >
                    Add to cart
                </button>

                <Modal
                    footer={[
                        <div
                            key="footer-buttons"
                            className="flex gap-2 justify-end"
                        >
                            <Link href={`/cart`}>
                                <button className="border-2 border-[#194464] px-4 py-2 rounded-xl text-sm md:text-base font-semibold font-outfit bg-[#def0ff] hover:bg-[#194464] hover:text-white transition-colors duration-300 text-center">
                                    View cart
                                </button>
                            </Link>
                            <Link href={`/purchaseOrder`}>
                                <button className="border-2 border-[#194464] px-4 py-2 rounded-xl text-sm md:text-base font-semibold font-outfit bg-[#deffe5] hover:bg-[#194464] hover:text-white transition-colors duration-300 text-center">
                                    Purchase
                                </button>
                            </Link>
                        </div>,
                    ]}
                    closeIcon
                    mask={false}
                    title={null}
                    style={{ top: 20 }}
                    open={!!modalData}
                    onCancel={() => setModalData(null)}
                >
                    {modalData && (
                        <div id={`${modalData.id}`} className="flex gap-4">
                            <Image
                                width={300}
                                height={300}
                                src={item?.images[0]}
                                alt="cart-tshirt"
                                className="w-[30%] h-[30%] rounded-lg"
                            />
                            <div className="flex">
                                <div className="space-y-1 md:space-y-2">
                                    <h1 className="font-outfit md:text-2xl font-semibold">
                                        {modalData.product_name}
                                    </h1>
                                    {/* quantity selection */}
                                    <div className="flex items-center gap-2">
                                        <Button
                                            onClick={() => {
                                                const newQuantity =
                                                    quantity > 1
                                                        ? quantity - 1
                                                        : quantity;
                                                handleQuantityChange(
                                                    newQuantity
                                                );
                                            }}
                                            className="bg-gray-200 px-3 py-1 rounded-md text-lg font-bold"
                                            disabled={quantity <= 1}
                                        >
                                            -
                                        </Button>
                                        <span className="text-lg">
                                            {quantity}
                                        </span>
                                        <Button
                                            onClick={() => {
                                                const newQuantity =
                                                    quantity + 1;
                                                handleQuantityChange(
                                                    newQuantity
                                                );
                                            }}
                                            className="bg-gray-200 px-3 py-1 rounded-mdtext-lg font-bold"
                                        >
                                            +
                                        </Button>
                                    </div>
                                    {/* size selection */}
                                    <div className="flex gap-2">
                                        {["M", "L", "XL", "XXL"].map(
                                            (size, index) => (
                                                <Button
                                                    key={size}
                                                    className={`px-3 py-1 border rounded-md ${
                                                        activeSizeButton === index
                                                            ? "bg-black text-white border-black"
                                                            : "bg-gray-200 text-gray-700 border-gray-300"
                                                    }`}
                                                    onClick={() => {
                                                        handleSizeChange(
                                                            uniqueId,
                                                            size
                                                        );
                                                        setActiveSizeButton(index);
                                                    }}
                                                >
                                                    {size}
                                                </Button>
                                            )
                                        )}
                                    </div>
                                    <h1 className="flex items-center gap-2 md:text-xl font-bold text-nowrap">
                                        <FaCheckCircle
                                            color="green"
                                            className="text-xl"
                                        />{" "}
                                        Added to cart successfully!
                                    </h1>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </div>
    );
};

export default ProductCard;
