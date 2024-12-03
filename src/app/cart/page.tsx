"use client";

import { useEffect, useState } from "react";
import { Button } from "antd";
import { FaTrash } from "react-icons/fa";
import ShipmentCalculator from "@/components/pages/Cart/ShipmentCalculator";
import CartTotal from "@/components/pages/Cart/CartTotal";
import Image from "next/image";
import QuantitySelector from "@/components/pages/Cart/QuantitySelector";
import { useCart } from "@/context/CartProvider";

interface CartItem {
    id: string;
    product_name: string;
    images: string;
    price: number;
    quantity:number;
}


const Cart: React.FC = () => {

    const {cartData, removeFromCart} = useCart()


    const [quantity, setQuantity] = useState(1);

    const handleIncrease = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);

        }
    };



    // calculate cart data price total
    const calculateTotal = () => {
        return cartData.reduce((total, item) => total + item.price, 0);
    };


    return (
        <div className="w-full lg:w-[70%] mx-auto px-2 lg:px-0 py-4">
            <div className="overflow-x-auto scroll-smooth pt-4 mb-5 md:mb-0 ">
                <table className="table whitespace-nowrap">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product & image</th>
                            <th>Name</th>
                            {/* <th>Quantity</th> */}
                            <th>Price</th>
                            <th className="text-right">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* rows */}
                        {cartData?.length > 0 &&
                            cartData?.map((data, index) => (
                                <tr key={data?.id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <Image
                                                        width={500}
                                                        height={500}
                                                        src={data?.image}
                                                        alt="product-image"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="text-gray-600 font-bold">
                                            {data?.product_name}
                                        </div>
                                    </td>
                                    {/* <td>
                                        <div className="flex items-center gap-2">
                                            <button
                                                className="bg-gray-200 px-3 py-1 rounded-md text-lg"
                                                onClick={handleDecrease}
                                            >
                                                -
                                            </button>
                                            <span className="text-lg">{data.quantity}</span>
                                            <button
                                                className="bg-gray-200 px-3 py-1 rounded-md text-lg"
                                                onClick={handleIncrease}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td> */}
                                    <td>
                                        <div className="text-gray-600 font-bold">
                                            {data?.price}
                                        </div>
                                    </td>

                                    <td className="text-right">
                                        <Button
                                            onClick={() =>
                                                removeFromCart(data?.id)
                                            }
                                            className="btn btn-md"
                                        >
                                            <FaTrash
                                                size={20}
                                                className="text-red-600"
                                            ></FaTrash>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-10 my-[22px]">

                {cartData?.length > 0 && (
                    <CartTotal calculateTotal={calculateTotal} show={true} />
                )}
            </div>
        </div>
    );
};

export default Cart;
