import Link from "next/link";
import React from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

interface CartTotalProps {
    show: boolean;
    calculateTotal: Function;
}

const CartTotal: React.FC<CartTotalProps> = ({ calculateTotal, show }) => {
    const total = calculateTotal();

    return (
        <div className="font-outfit border-2 border-[rgb(162,182,195)] p-2 space-y-4 w-full font-outfit rounded-xl">
            <h1 className="text-xl font-semibold text-fade-black">
                Cart Totals
            </h1>
            <h1 className="text-lg font-semibold text-fade-black flex justify-between">
                <span>Sub total:</span>{" "}
                <span className="flex items-center">
                    <p>{total}</p>
                    <FaBangladeshiTakaSign className="text-sm" />
                </span>{" "}
            </h1>
            <div className="text-lg font-semibold text-fade-black flex justify-between">
                <span>Total:</span>{" "}
                <span className="flex items-center">
                    <p>{total}</p>
                    <FaBangladeshiTakaSign className="text-sm" />
                </span>{" "}
            </div>
            {show && (
                <div>
                    <Link href="/purchaseOrder">
                        <button className="text-white bg-[#7a71b1] w-full p-2 rounded-lg btn">
                            Purchase Order
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default CartTotal;
