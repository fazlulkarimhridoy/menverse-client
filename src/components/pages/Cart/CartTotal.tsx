import Link from "next/link";
import React from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

interface CartTotalProps {
    show: boolean;
    calculateTotal: Function;
    deliveryCharge: number;
    mobileWidth: string;
    largeWidth: string;
}

const CartTotal: React.FC<CartTotalProps> = ({ calculateTotal, show, deliveryCharge, mobileWidth, largeWidth }) => {
    const total = calculateTotal();

    return (
        <div className={`flex flex-col justify-between gap-1 font-outfit border-2 border-[rgb(162,182,195)] p-5 xl:p-10 ${mobileWidth} md:${largeWidth} font-outfit rounded-xl`}>
            <h1 className="font-semibold text-fade-black">
                Cart Totals
            </h1>
            <h1 className="text-lg font-semibold text-fade-black flex justify-between">
                <span>Sub Total:</span>{" "}
                <span className="flex items-center">
                    <p>{total}</p>
                    <FaBangladeshiTakaSign className="text-sm" />
                </span>{" "}
            </h1>
            <h1 className="text-lg font-semibold text-fade-black flex justify-between">
                <span>Delivery Charge:</span>{" "}
                <span className="flex items-center">
                    <p>{deliveryCharge}</p>
                    <FaBangladeshiTakaSign className="text-sm" />
                </span>{" "}
            </h1>
            <div className="text-lg font-semibold text-fade-black flex justify-between">
                <span>Total:</span>{" "}
                <span className="flex items-center">
                    <p>{total+deliveryCharge}</p>
                    <FaBangladeshiTakaSign className="text-sm" />
                </span>{" "}
            </div>
            {show && (
                <div>
                    <Link href="/purchaseOrder">
                        <button className="text-white bg-[#7a71b1] w-full rounded-lg btn">
                            Purchase Order
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default CartTotal;
