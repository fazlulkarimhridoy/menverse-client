"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button, Modal, Skeleton } from "antd";
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
    const [activeSizeButton, setActiveSizeButton] = useState<number | null>(
        null
    );

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
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/4QCeRXhpZgAASUkqAAgAAAAEAA4BAgA0AAAAPgAAAJiCAgAUAAAAcgAAABoBBQABAAAAhgAAABsBBQABAAAAjgAAAAAAAABTbW9vdGggQmx1ZSAvIFNreSBCbHVlIHNvbGlkIGNvbG9yIEJhY2tncm91bmQgaW1hZ2UuU2hvb3Rlcl9TaW5oYV9JbWFnZXMsAQAAAQAAACwBAAABAAAA/+EF22h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyI+Cgk8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgoJCTxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6SXB0YzR4bXBDb3JlPSJodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wQ29yZS8xLjAveG1sbnMvIiAgIHhtbG5zOkdldHR5SW1hZ2VzR0lGVD0iaHR0cDovL3htcC5nZXR0eWltYWdlcy5jb20vZ2lmdC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBsdXM9Imh0dHA6Ly9ucy51c2VwbHVzLm9yZy9sZGYveG1wLzEuMC8iICB4bWxuczppcHRjRXh0PSJodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wRXh0LzIwMDgtMDItMjkvIiB4bWxuczp4bXBSaWdodHM9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9yaWdodHMvIiBkYzpSaWdodHM9IlNob290ZXJfU2luaGFfSW1hZ2VzIiBwaG90b3Nob3A6Q3JlZGl0PSJHZXR0eSBJbWFnZXMvaVN0b2NrcGhvdG8iIEdldHR5SW1hZ2VzR0lGVDpBc3NldElEPSI1NDA1MzM3MzgiIHhtcFJpZ2h0czpXZWJTdGF0ZW1lbnQ9Imh0dHBzOi8vd3d3LmlzdG9ja3Bob3RvLmNvbS9sZWdhbC9saWNlbnNlLWFncmVlbWVudD91dG1fbWVkaXVtPW9yZ2FuaWMmYW1wO3V0bV9zb3VyY2U9Z29vZ2xlJmFtcDt1dG1fY2FtcGFpZ249aXB0Y3VybCIgcGx1czpEYXRhTWluaW5nPSJodHRwOi8vbnMudXNlcGx1cy5vcmcvbGRmL3ZvY2FiL0RNSS1QUk9ISUJJVEVELUVYQ0VQVFNFQVJDSEVOR0lORUlOREVYSU5HIiA+CjxkYzpjcmVhdG9yPjxyZGY6U2VxPjxyZGY6bGk+U2hvb3Rlcl9TaW5oYV9JbWFnZXM8L3JkZjpsaT48L3JkZjpTZXE+PC9kYzpjcmVhdG9yPjxkYzpkZXNjcmlwdGlvbj48cmRmOkFsdD48cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiPlNtb290aCBCbHVlIC8gU2t5IEJsdWUgc29saWQgY29sb3IgQmFja2dyb3VuZCBpbWFnZS48L3JkZjpsaT48L3JkZjpBbHQ+PC9kYzpkZXNjcmlwdGlvbj4KPHBsdXM6TGljZW5zb3I+PHJkZjpTZXE+PHJkZjpsaSByZGY6cGFyc2VUeXBlPSdSZXNvdXJjZSc+PHBsdXM6TGljZW5zb3JVUkw+aHR0cHM6Ly93d3cuaXN0b2NrcGhvdG8uY29tL3Bob3RvL2xpY2Vuc2UtZ201NDA1MzM3MzgtP3V0bV9tZWRpdW09b3JnYW5pYyZhbXA7dXRtX3NvdXJjZT1nb29nbGUmYW1wO3V0bV9jYW1wYWlnbj1pcHRjdXJsPC9wbHVzOkxpY2Vuc29yVVJMPjwvcmRmOmxpPjwvcmRmOlNlcT48L3BsdXM6TGljZW5zb3I+CgkJPC9yZGY6RGVzY3JpcHRpb24+Cgk8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJ3Ij8+Cv/tAKRQaG90b3Nob3AgMy4wADhCSU0EBAAAAAAAiBwCUAAUU2hvb3Rlcl9TaW5oYV9JbWFnZXMcAngANFNtb290aCBCbHVlIC8gU2t5IEJsdWUgc29saWQgY29sb3IgQmFja2dyb3VuZCBpbWFnZS4cAnQAFFNob290ZXJfU2luaGFfSW1hZ2VzHAJuABhHZXR0eSBJbWFnZXMvaVN0b2NrcGhvdG//2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wgARCAHLAmQDASEAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAECBf/EABcBAQEBAQAAAAAAAAAAAAAAAAABBAX/2gAMAwEAAhADEAAAAes18qihQAUBQACgAAAFoRKUAlIARARURApIBApIC0ChQAoCgAoAAUgoFAQUAAIBIVECCKSCkgEA0FFAoBVEFUEAAoAAAAAAFBASBAIEoICIACihRQAoFUABAoAAABQABBQRAQCCBKBAEgCqiiigFBVQURVAQAFEABQAAAAgRBYRAqAIECCrYCihQUSlEFoAAUIAEpSEFAAARFEhUQqIiggCIKtgKKFUFAUEFAKCAKAACASlQAQWEQCCKQCAICKqooUVRApaBBQUIAAAogoJQCEoQWECFgSwIEAgCihYFpKFAoAUKgAAAACgACEoAQBERSoRAIEAoUUWCqhQKAVRCUAAAACgACASgCBAshUkKggQChRQKKhRQAqUogAAAAAKAAISgQAIRFCLIEAgoUCiiooUBVJC0gKAAAlIAKACIoEAEhUoRBBAIWkoC0CooUFVAJQUAAAACAAKBAEACEKQQQCFhLQFFAqKFAVSQWgAAAAACUQAqAEAEQKQCCCFCkUChRQigKlAKAAAAAAABApAEAEQKQCBBALQFAoWAoClIoAAABRAAAAICoAgEQKCBBBANBQFFgFBVAIoAABSUCAAAAQKQBARKBAEEAg0KFAqAoVQIoAAoAUQAFRAAAgSgQAIoSBBAIXVQKFgKUKgFAAFAAlAsFIKRBRAgKQCAIoSBAIINUIoVQoCoCgACgAIAoBQERRAQKQBAIoIRBAIXVkVQpBaKCAoABaQUQlACwCUCoQAQKgQCLEAQQCDaFUKAoUIUAAVRBSBBQAAAqEAECkAghEtEQQCDaBaKFAoIUAAqC0gAUQsAAChIAQKQCBBKEQCCDVgKKFUKCFAAKlEAUSlAEAAoEBECkAgQShIEAg1YChQKVQhQACglEFoAACAAKCECAqBBAqEgQCDVlEooClCoUAAqCiUKAAABACghAgKgQSwWCEgQDVBakoFoCoUAFAIFCgAAAQACoQECoEEsCFhIEA1QKihQBagKACglEFUAAAIAApARApBBLBYSFhEUTVhaIoUFEqWgACggFUAAAlIAAqEBAqBBBKEhYRAXVkWiKFAUJaAAKCBVAAAAIAKCECAqBBBKEgghQ1UWAoUBVIoAAoIFoAAAAgKAIQICoEECoSCCFE1QihRQFUigACglUAAAAQAoBIAgSgQCKhIWCATQooWAoVSKAAKCUKAAACACgRACBKBBBLEBYIBNFVFCKKFUhQACglUAAAAgKCEAAgigQQSkEBIWE1RQKKigKloAAoFWAAABACxAACAqAIEEpBAIINEoooqFUSglUAKAWUAAAQAqAQECkAQCKQQQQCDQoVFFgKFAJaAUBZQAELACkBACApAIECkERFQQDRKVUUCoVQoIUBQUiiAAAoEBAQKQBAECoERFQRBdEooUBYClVBSKAoFIAoAAIQAQKgBAIoIEEEEBNFpFFACopQoIUCggoUBBQRAAICoEACKCBBBERRNChQKAoJaAoWAUAVEAAAABApAEASgQCCCBATRVRQFUFQilCghQAAAAAAASggBAIoEEAggQDRFFAUFVCFUFAWAAAAogABAoIAgKgCBAIshYgrSFBKFAUIFoCghQACAoKgAQKQAIEoEAgQRBYAtFBFAoCgloBQCKJSAoAIAoAgBAEoEAggQQCLNWUKAoVAUIFoCgCAKAAAABAAgCKCBAIIEECtIoUEpQoVCAVQCgAAAAABAAQAqBAIEEAgQDQUUBUFpAUIFoBQABAACiAAQAEoIAgggQCAS0FooCkUFVCBVQUKIQUAAAAAgAIpAIEAgQQKIoooUBUFoEUIFUAAAAAAAEABKBAIIEAgQQDQoUCgSlCkCoAWgAAAAAAICkACBBAIEEAgKthQFFBFUFQUKQgVQAAAAEABKAIAgQQCBAqAKiihQFAUBUFEVSQWgAQAAACoAQCAIEAggSiIs0loUCgKBKBaAEoJVEAAAAASgQBAIAgQCBBALUVQoUBQFABQAoIAAAAKQAIEAQCBAECohALUFoUCgKAUAAoBQgCkBBQAIEASiEAgQBAIApKVQKFAC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"
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
                    onCancel={() => {
                        setModalData(null);
                        setQuantity(1); // Reset quantity
                        setActiveSizeButton(null); // Reset size selection
                    }}
                >
                    {modalData && (
                        <div id={`${modalData.id}`} className="flex gap-4">
                            {/* show skeleton image if the image takes time to load in viewport */}
                            <Image
                                placeholder="blur"
                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/4QCeRXhpZgAASUkqAAgAAAAEAA4BAgA0AAAAPgAAAJiCAgAUAAAAcgAAABoBBQABAAAAhgAAABsBBQABAAAAjgAAAAAAAABTbW9vdGggQmx1ZSAvIFNreSBCbHVlIHNvbGlkIGNvbG9yIEJhY2tncm91bmQgaW1hZ2UuU2hvb3Rlcl9TaW5oYV9JbWFnZXMsAQAAAQAAACwBAAABAAAA/+EF22h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyI+Cgk8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgoJCTxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6SXB0YzR4bXBDb3JlPSJodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wQ29yZS8xLjAveG1sbnMvIiAgIHhtbG5zOkdldHR5SW1hZ2VzR0lGVD0iaHR0cDovL3htcC5nZXR0eWltYWdlcy5jb20vZ2lmdC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBsdXM9Imh0dHA6Ly9ucy51c2VwbHVzLm9yZy9sZGYveG1wLzEuMC8iICB4bWxuczppcHRjRXh0PSJodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wRXh0LzIwMDgtMDItMjkvIiB4bWxuczp4bXBSaWdodHM9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9yaWdodHMvIiBkYzpSaWdodHM9IlNob290ZXJfU2luaGFfSW1hZ2VzIiBwaG90b3Nob3A6Q3JlZGl0PSJHZXR0eSBJbWFnZXMvaVN0b2NrcGhvdG8iIEdldHR5SW1hZ2VzR0lGVDpBc3NldElEPSI1NDA1MzM3MzgiIHhtcFJpZ2h0czpXZWJTdGF0ZW1lbnQ9Imh0dHBzOi8vd3d3LmlzdG9ja3Bob3RvLmNvbS9sZWdhbC9saWNlbnNlLWFncmVlbWVudD91dG1fbWVkaXVtPW9yZ2FuaWMmYW1wO3V0bV9zb3VyY2U9Z29vZ2xlJmFtcDt1dG1fY2FtcGFpZ249aXB0Y3VybCIgcGx1czpEYXRhTWluaW5nPSJodHRwOi8vbnMudXNlcGx1cy5vcmcvbGRmL3ZvY2FiL0RNSS1QUk9ISUJJVEVELUVYQ0VQVFNFQVJDSEVOR0lORUlOREVYSU5HIiA+CjxkYzpjcmVhdG9yPjxyZGY6U2VxPjxyZGY6bGk+U2hvb3Rlcl9TaW5oYV9JbWFnZXM8L3JkZjpsaT48L3JkZjpTZXE+PC9kYzpjcmVhdG9yPjxkYzpkZXNjcmlwdGlvbj48cmRmOkFsdD48cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiPlNtb290aCBCbHVlIC8gU2t5IEJsdWUgc29saWQgY29sb3IgQmFja2dyb3VuZCBpbWFnZS48L3JkZjpsaT48L3JkZjpBbHQ+PC9kYzpkZXNjcmlwdGlvbj4KPHBsdXM6TGljZW5zb3I+PHJkZjpTZXE+PHJkZjpsaSByZGY6cGFyc2VUeXBlPSdSZXNvdXJjZSc+PHBsdXM6TGljZW5zb3JVUkw+aHR0cHM6Ly93d3cuaXN0b2NrcGhvdG8uY29tL3Bob3RvL2xpY2Vuc2UtZ201NDA1MzM3MzgtP3V0bV9tZWRpdW09b3JnYW5pYyZhbXA7dXRtX3NvdXJjZT1nb29nbGUmYW1wO3V0bV9jYW1wYWlnbj1pcHRjdXJsPC9wbHVzOkxpY2Vuc29yVVJMPjwvcmRmOmxpPjwvcmRmOlNlcT48L3BsdXM6TGljZW5zb3I+CgkJPC9yZGY6RGVzY3JpcHRpb24+Cgk8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJ3Ij8+Cv/tAKRQaG90b3Nob3AgMy4wADhCSU0EBAAAAAAAiBwCUAAUU2hvb3Rlcl9TaW5oYV9JbWFnZXMcAngANFNtb290aCBCbHVlIC8gU2t5IEJsdWUgc29saWQgY29sb3IgQmFja2dyb3VuZCBpbWFnZS4cAnQAFFNob290ZXJfU2luaGFfSW1hZ2VzHAJuABhHZXR0eSBJbWFnZXMvaVN0b2NrcGhvdG//2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wgARCAHLAmQDASEAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAECBf/EABcBAQEBAQAAAAAAAAAAAAAAAAABBAX/2gAMAwEAAhADEAAAAes18qihQAUBQACgAAAFoRKUAlIARARURApIBApIC0ChQAoCgAoAAUgoFAQUAAIBIVECCKSCkgEA0FFAoBVEFUEAAoAAAAAAFBASBAIEoICIACihRQAoFUABAoAAABQABBQRAQCCBKBAEgCqiiigFBVQURVAQAFEABQAAAAgRBYRAqAIECCrYCihQUSlEFoAAUIAEpSEFAAARFEhUQqIiggCIKtgKKFUFAUEFAKCAKAACASlQAQWEQCCKQCAICKqooUVRApaBBQUIAAAogoJQCEoQWECFgSwIEAgCihYFpKFAoAUKgAAAACgACEoAQBERSoRAIEAoUUWCqhQKAVRCUAAAACgACASgCBAshUkKggQChRQKKhRQAqUogAAAAAKAAISgQAIRFCLIEAgoUCiiooUBVJC0gKAAAlIAKACIoEAEhUoRBBAIWkoC0CooUFVAJQUAAAACAAKBAEACEKQQQCFhLQFFAqKFAVSQWgAAAAACUQAqAEAEQKQCCCFCkUChRQigKlAKAAAAAAABApAEAEQKQCBBALQFAoWAoClIoAAABRAAAAICoAgEQKCBBBANBQFFgFBVAIoAABSUCAAAAQKQBARKBAEEAg0KFAqAoVQIoAAoAUQAFRAAAgSgQAIoSBBAIXVQKFgKUKgFAAFAAlAsFIKRBRAgKQCAIoSBAIINUIoVQoCoCgACgAIAoBQERRAQKQBAIoIRBAIXVkVQpBaKCAoABaQUQlACwCUCoQAQKgQCLEAQQCDaFUKAoUIUAAVRBSBBQAAAqEAECkAghEtEQQCDaBaKFAoIUAAqC0gAUQsAAChIAQKQCBBKEQCCDVgKKFUKCFAAKlEAUSlAEAAoEBECkAgQShIEAg1YChQKVQhQACglEFoAACAAKCECAqBBAqEgQCDVlEooClCoUAAqCiUKAAABACghAgKgQSwWCEgQDVBakoFoCoUAFAIFCgAAAQACoQECoEEsCFhIEA1QKihQBagKACglEFUAAAIAApARApBBLBYSFhEUTVhaIoUFEqWgACggFUAAAlIAAqEBAqBBBKEhYRAXVkWiKFAUJaAAKCBVAAAAIAKCECAqBBBKEgghQ1UWAoUBVIoAAoIFoAAAAgKAIQICoEECoSCCFE1QihRQFUigACglUAAAAQAoBIAgSgQCKhIWCATQooWAoVSKAAKCUKAAACACgRACBKBBBLEBYIBNFVFCKKFUhQACglUAAAAgKCEAAgigQQSkEBIWE1RQKKigKloAAoFWAAABACxAACAqAIEEpBAIINEoooqFUSglUAKAWUAAAQAqAQECkAQCKQQQQCDQoVFFgKFAJaAUBZQAELACkBACApAIECkERFQQDRKVUUCoVQoIUBQUiiAAAoEBAQKQBAECoERFQRBdEooUBYClVBSKAoFIAoAAIQAQKgBAIoIEEEEBNFpFFACopQoIUCggoUBBQRAAICoEACKCBBBERRNChQKAoJaAoWAUAVEAAAABApAEASgQCCCBATRVRQFUFQilCghQAAAAAAASggBAIoEEAggQDRFFAUFVCFUFAWAAAAogABAoIAgKgCBAIshYgrSFBKFAUIFoCghQACAoKgAQKQAIEoEAgQRBYAtFBFAoCgloBQCKJSAoAIAoAgBAEoEAggQQCLNWUKAoVAUIFoCgCAKAAAABAAgCKCBAIIEECtIoUEpQoVCAVQCgAAAAABAAQAqBAIEEAgQDQUUBUFpAUIFoBQABAACiAAQAEoIAgggQCAS0FooCkUFVCBVQUKIQUAAAAAgAIpAIEAgQQKIoooUBUFoEUIFUAAAAAAAEABKBAIIEAgQQDQoUCgSlCkCoAWgAAAAAAICkACBBAIEEAgKthQFFBFUFQUKQgVQAAAAEABKAIAgQQCBAqAKiihQFAUBUFEVSQWgAQAAACoAQCAIEAggSiIs0loUCgKBKBaAEoJVEAAAAASgQBAIAgQCBBALUVQoUBQFABQAoIAAAAKQAIEAQCBAECohALUFoUCgKAUAAoBQgCkBBQAIEASiEAgQBAIApKVQKFAC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"
                                width={500}
                                height={500}
                                src={modalData?.images[0]}
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
                                                        activeSizeButton ===
                                                        index
                                                            ? "bg-black text-white border-black"
                                                            : "bg-gray-200 text-gray-700 border-gray-300"
                                                    }`}
                                                    onClick={() => {
                                                        handleSizeChange(
                                                            uniqueId,
                                                            size
                                                        );
                                                        setActiveSizeButton(
                                                            index
                                                        );
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
