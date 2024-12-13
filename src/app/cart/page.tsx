"use client";

import { Button, Empty } from "antd";
import { FaTrash } from "react-icons/fa";
import CartTotal from "@/components/pages/Cart/CartTotal";
import Image from "next/image";
import { useCart } from "@/context/CartProvider";

const Cart: React.FC = () => {
    const { cartData, updateCartItemQuantity, removeFromCart, setCartData } =
        useCart();

    const handleSizeChange = (id: number, size: string) => {
        setCartData((prevCart) =>
            prevCart.map((item) => (item.uid === id ? { ...item, size } : item))
        );
    };

    // calculate cart data price total
    const calculateTotal = () => {
        return cartData.reduce(
            (total, item) => total + item.discount_price * item.quantity,
            0
        );
    };

    return (
        <div className="w-full lg:w-[70%] mx-auto px-2 lg:px-0 py-4">
            <div
                className="overflow-x-auto scroll-smooth pt-4 mb-5 md:mb-0 "
            >
                <table className="table whitespace-nowrap">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Size</th>
                            <th>Price</th>
                            <th className="text-right">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* rows */}
                        {cartData?.length > 0 &&
                            cartData?.map((data, index) => (
                                <tr key={data?.uid}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-10 h-10">
                                                    <Image
                                                        width={300}
                                                        height={300}
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
                                    <td>
                                        {/* quantity select */}
                                        <div className="flex items-center gap-2">
                                            <Button
                                                className="bg-gray-200 px-3 py-1 rounded-md text-lg font-bold"
                                                onClick={() =>
                                                    updateCartItemQuantity(
                                                        data.uid,
                                                        data.quantity - 1
                                                    )
                                                }
                                                disabled={data.quantity <= 1}
                                            >
                                                -
                                            </Button>
                                            <span className="text-lg">
                                                {data?.quantity}
                                            </span>
                                            <Button
                                                className="bg-gray-200 px-3 py-1 rounded-md text-lg font-bold"
                                                onClick={() =>
                                                    updateCartItemQuantity(
                                                        data.uid,
                                                        data.quantity + 1
                                                    )
                                                }
                                            >
                                                +
                                            </Button>
                                        </div>
                                    </td>
                                    <td>
                                        {/* size select */}
                                        <div className="flex gap-2">
                                            {["M", "L", "XL", "XXL"].map(
                                                (size) => (
                                                    <Button
                                                        key={size}
                                                        className={`px-3 py-1 border rounded-md ${
                                                            data?.size === size
                                                                ? "bg-black text-white border-black"
                                                                : "bg-gray-200 text-gray-700 border-gray-300"
                                                        }`}
                                                        onClick={() =>
                                                            handleSizeChange(
                                                                data.uid,
                                                                size
                                                            )
                                                        }
                                                    >
                                                        {size}
                                                    </Button>
                                                )
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="text-gray-600 font-bold">
                                            {data?.discount_price *
                                                data?.quantity}
                                        </div>
                                    </td>

                                    <td className="text-right">
                                        <Button
                                            onClick={() =>
                                                removeFromCart(data?.uid)
                                            }
                                            className="btn btn-sm btn-circle"
                                        >
                                            <FaTrash className="text-red-600"></FaTrash>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        {cartData?.length < 1 && (
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    {" "}
                                    <Empty
                                        className="my-[46.5px]"
                                        description="No items in cart."
                                    />
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            <div className="flex flex-col md:flex-row justify-center gap-10 my-[34px]">
                {cartData?.length > 0 && (
                    <CartTotal
                        deliveryCharge={60}
                        calculateTotal={calculateTotal}
                        show={true}
                    />
                )}
            </div>
        </div>
    );
};

export default Cart;
