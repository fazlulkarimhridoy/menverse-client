"use client";

import { useCart } from "@/context/CartProvider";
import { Button, Empty } from "antd";
import { FaTrash } from "react-icons/fa";
import CartTotal from "@/components/pages/Cart/CartTotal";
import Image from "next/image";
import { FaX } from "react-icons/fa6";
import SizeChart from "@/components/pages/Cart/SizeChart";

const Cart: React.FC = () => {
    const {
        cartData,
        updateCartItemQuantity,
        removeFromCart,
        setCartData,
        clearCart,
    } = useCart();

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
            <div className="overflow-x-auto scroll-smooth pt-4 mb-2 md:mb-5">
                {cartData?.length > 0 ? (
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
                            {cartData?.map((data, index) => (
                                <tr key={data?.uid}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-10 h-10">
                                                    <Image
                                                        placeholder="blur"
                                                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/4QCeRXhpZgAASUkqAAgAAAAEAA4BAgA0AAAAPgAAAJiCAgAUAAAAcgAAABoBBQABAAAAhgAAABsBBQABAAAAjgAAAAAAAABTbW9vdGggQmx1ZSAvIFNreSBCbHVlIHNvbGlkIGNvbG9yIEJhY2tncm91bmQgaW1hZ2UuU2hvb3Rlcl9TaW5oYV9JbWFnZXMsAQAAAQAAACwBAAABAAAA/+EF22h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyI+Cgk8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgoJCTxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6SXB0YzR4bXBDb3JlPSJodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wQ29yZS8xLjAveG1sbnMvIiAgIHhtbG5zOkdldHR5SW1hZ2VzR0lGVD0iaHR0cDovL3htcC5nZXR0eWltYWdlcy5jb20vZ2lmdC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBsdXM9Imh0dHA6Ly9ucy51c2VwbHVzLm9yZy9sZGYveG1wLzEuMC8iICB4bWxuczppcHRjRXh0PSJodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wRXh0LzIwMDgtMDItMjkvIiB4bWxuczp4bXBSaWdodHM9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9yaWdodHMvIiBkYzpSaWdodHM9IlNob290ZXJfU2luaGFfSW1hZ2VzIiBwaG90b3Nob3A6Q3JlZGl0PSJHZXR0eSBJbWFnZXMvaVN0b2NrcGhvdG8iIEdldHR5SW1hZ2VzR0lGVDpBc3NldElEPSI1NDA1MzM3MzgiIHhtcFJpZ2h0czpXZWJTdGF0ZW1lbnQ9Imh0dHBzOi8vd3d3LmlzdG9ja3Bob3RvLmNvbS9sZWdhbC9saWNlbnNlLWFncmVlbWVudD91dG1fbWVkaXVtPW9yZ2FuaWMmYW1wO3V0bV9zb3VyY2U9Z29vZ2xlJmFtcDt1dG1fY2FtcGFpZ249aXB0Y3VybCIgcGx1czpEYXRhTWluaW5nPSJodHRwOi8vbnMudXNlcGx1cy5vcmcvbGRmL3ZvY2FiL0RNSS1QUk9ISUJJVEVELUVYQ0VQVFNFQVJDSEVOR0lORUlOREVYSU5HIiA+CjxkYzpjcmVhdG9yPjxyZGY6U2VxPjxyZGY6bGk+U2hvb3Rlcl9TaW5oYV9JbWFnZXM8L3JkZjpsaT48L3JkZjpTZXE+PC9kYzpjcmVhdG9yPjxkYzpkZXNjcmlwdGlvbj48cmRmOkFsdD48cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiPlNtb290aCBCbHVlIC8gU2t5IEJsdWUgc29saWQgY29sb3IgQmFja2dyb3VuZCBpbWFnZS48L3JkZjpsaT48L3JkZjpBbHQ+PC9kYzpkZXNjcmlwdGlvbj4KPHBsdXM6TGljZW5zb3I+PHJkZjpTZXE+PHJkZjpsaSByZGY6cGFyc2VUeXBlPSdSZXNvdXJjZSc+PHBsdXM6TGljZW5zb3JVUkw+aHR0cHM6Ly93d3cuaXN0b2NrcGhvdG8uY29tL3Bob3RvL2xpY2Vuc2UtZ201NDA1MzM3MzgtP3V0bV9tZWRpdW09b3JnYW5pYyZhbXA7dXRtX3NvdXJjZT1nb29nbGUmYW1wO3V0bV9jYW1wYWlnbj1pcHRjdXJsPC9wbHVzOkxpY2Vuc29yVVJMPjwvcmRmOmxpPjwvcmRmOlNlcT48L3BsdXM6TGljZW5zb3I+CgkJPC9yZGY6RGVzY3JpcHRpb24+Cgk8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJ3Ij8+Cv/tAKRQaG90b3Nob3AgMy4wADhCSU0EBAAAAAAAiBwCUAAUU2hvb3Rlcl9TaW5oYV9JbWFnZXMcAngANFNtb290aCBCbHVlIC8gU2t5IEJsdWUgc29saWQgY29sb3IgQmFja2dyb3VuZCBpbWFnZS4cAnQAFFNob290ZXJfU2luaGFfSW1hZ2VzHAJuABhHZXR0eSBJbWFnZXMvaVN0b2NrcGhvdG//2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wgARCAHLAmQDASEAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAECBf/EABcBAQEBAQAAAAAAAAAAAAAAAAABBAX/2gAMAwEAAhADEAAAAes18qihQAUBQACgAAAFoRKUAlIARARURApIBApIC0ChQAoCgAoAAUgoFAQUAAIBIVECCKSCkgEA0FFAoBVEFUEAAoAAAAAAFBASBAIEoICIACihRQAoFUABAoAAABQABBQRAQCCBKBAEgCqiiigFBVQURVAQAFEABQAAAAgRBYRAqAIECCrYCihQUSlEFoAAUIAEpSEFAAARFEhUQqIiggCIKtgKKFUFAUEFAKCAKAACASlQAQWEQCCKQCAICKqooUVRApaBBQUIAAAogoJQCEoQWECFgSwIEAgCihYFpKFAoAUKgAAAACgACEoAQBERSoRAIEAoUUWCqhQKAVRCUAAAACgACASgCBAshUkKggQChRQKKhRQAqUogAAAAAKAAISgQAIRFCLIEAgoUCiiooUBVJC0gKAAAlIAKACIoEAEhUoRBBAIWkoC0CooUFVAJQUAAAACAAKBAEACEKQQQCFhLQFFAqKFAVSQWgAAAAACUQAqAEAEQKQCCCFCkUChRQigKlAKAAAAAAABApAEAEQKQCBBALQFAoWAoClIoAAABRAAAAICoAgEQKCBBBANBQFFgFBVAIoAABSUCAAAAQKQBARKBAEEAg0KFAqAoVQIoAAoAUQAFRAAAgSgQAIoSBBAIXVQKFgKUKgFAAFAAlAsFIKRBRAgKQCAIoSBAIINUIoVQoCoCgACgAIAoBQERRAQKQBAIoIRBAIXVkVQpBaKCAoABaQUQlACwCUCoQAQKgQCLEAQQCDaFUKAoUIUAAVRBSBBQAAAqEAECkAghEtEQQCDaBaKFAoIUAAqC0gAUQsAAChIAQKQCBBKEQCCDVgKKFUKCFAAKlEAUSlAEAAoEBECkAgQShIEAg1YChQKVQhQACglEFoAACAAKCECAqBBAqEgQCDVlEooClCoUAAqCiUKAAABACghAgKgQSwWCEgQDVBakoFoCoUAFAIFCgAAAQACoQECoEEsCFhIEA1QKihQBagKACglEFUAAAIAApARApBBLBYSFhEUTVhaIoUFEqWgACggFUAAAlIAAqEBAqBBBKEhYRAXVkWiKFAUJaAAKCBVAAAAIAKCECAqBBBKEgghQ1UWAoUBVIoAAoIFoAAAAgKAIQICoEECoSCCFE1QihRQFUigACglUAAAAQAoBIAgSgQCKhIWCATQooWAoVSKAAKCUKAAACACgRACBKBBBLEBYIBNFVFCKKFUhQACglUAAAAgKCEAAgigQQSkEBIWE1RQKKigKloAAoFWAAABACxAACAqAIEEpBAIINEoooqFUSglUAKAWUAAAQAqAQECkAQCKQQQQCDQoVFFgKFAJaAUBZQAELACkBACApAIECkERFQQDRKVUUCoVQoIUBQUiiAAAoEBAQKQBAECoERFQRBdEooUBYClVBSKAoFIAoAAIQAQKgBAIoIEEEEBNFpFFACopQoIUCggoUBBQRAAICoEACKCBBBERRNChQKAoJaAoWAUAVEAAAABApAEASgQCCCBATRVRQFUFQilCghQAAAAAAASggBAIoEEAggQDRFFAUFVCFUFAWAAAAogABAoIAgKgCBAIshYgrSFBKFAUIFoCghQACAoKgAQKQAIEoEAgQRBYAtFBFAoCgloBQCKJSAoAIAoAgBAEoEAggQQCLNWUKAoVAUIFoCgCAKAAAABAAgCKCBAIIEECtIoUEpQoVCAVQCgAAAAABAAQAqBAIEEAgQDQUUBUFpAUIFoBQABAACiAAQAEoIAgggQCAS0FooCkUFVCBVQUKIQUAAAAAgAIpAIEAgQQKIoooUBUFoEUIFUAAAAAAAEABKBAIIEAgQQDQoUCgSlCkCoAWgAAAAAAICkACBBAIEEAgKthQFFBFUFQUKQgVQAAAAEABKAIAgQQCBAqAKiihQFAUBUFEVSQWgAQAAACoAQCAIEAggSiIs0loUCgKBKBaAEoJVEAAAAASgQBAIAgQCBBALUVQoUBQFABQAoIAAAAKQAIEAQCBAECohALUFoUCgKAUAAoBQgCkBBQAIEASiEAgQBAIApKVQKFAC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"
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
                        </tbody>
                    </table>
                ) : (
                    <Empty
                        className="md:my-[99px]"
                        description="No items in cart."
                    />
                )}
            </div>
            {cartData?.length > 0 && (
                <div className="flex items-center justify-end">
                    <Button
                        onClick={() => clearCart()}
                        className="bg-red-100 border-red-100 text-red-500 text-xs flex items-center justify-center gap-0.5"
                    >
                        <FaX size={11} /> Clear Cart
                    </Button>
                </div>
            )}

            {cartData?.length > 0 && (
                <div className="flex flex-col sm:flex-row justify-end gap-10 my-[8px]">
                    <SizeChart />
                    <CartTotal
                        mobileWidth={"w-full"}
                        largeWidth={"w-1/2"}
                        deliveryCharge={60}
                        calculateTotal={calculateTotal}
                        show={true}
                    />
                </div>
            )}
        </div>
    );
};

export default Cart;
