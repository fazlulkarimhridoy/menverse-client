"use client";
// import ProductImage from "@/components/pages/DetailsPage/productImage";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TbCurrencyTaka } from "react-icons/tb";
import Link from "next/link";

import { Flex, Rate } from "antd";
import { Spin } from "antd";
import ImageDetails from "@/components/pages/DetailsPage/ImageDetails";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { MdCategory } from "react-icons/md";
import { FaThumbsUp } from "react-icons/fa";

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
}

interface CartItem {
    id: number;
    product_name: string;
    images: string;
    price: number;
}

const Page = ({ params }: { params: { slug: string } }) => {
    const router = useRouter();
    const { push } = router;
    const [modal1Open, setModal1Open] = useState(false);
    const [activeButton, setActiveButton] = useState<number | null>(null);
    // const [singleProduct , setSingleProduct] = useState<Array<string>>([])
    // const [quantity, setQuantity] = useState(10)
    const [price, setPrice] = useState(250);

    const handlePrice = (quantity: number) => {
        if (price > 0) {
            setPrice(0);
        }
        setPrice(quantity * 250);
    };

    const handleClick = (buttonIndex: number): void => {
        setActiveButton(buttonIndex);
        handlePrice(buttonIndex);
    };

    const { data: singleProduct, isLoading } = useQuery<ProductType>({
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

    const [cartData, setCartData] = useState<CartItem[]>([]);

    useEffect(() => {
        // Load cart data from localStorage
        const storedData = localStorage.getItem("cartItem");
        if (storedData) {
            setCartData(JSON.parse(storedData));
        }
    }, []);

    const handleCart = async (
        id: number,
        product_name: string,
        images: string,
        price: number
    ) => {
        const existingProduct = cartData.find((item) => item.id === id);
        if (!existingProduct) {
            setCartData((prevCardData) => [
                ...prevCardData,
                { product_name, images, price, id },
            ]);
            localStorage.setItem("cartItem", JSON.stringify(cartData));
            setModal1Open(true);
        } else {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Product already in the cart!",
                showConfirmButton: false,
                timer: 1500,
            });
        }
        // Use functional state update to ensure you're working with the latest state
    };
    // Synchronize localStorage whenever the cardData state changes
    useEffect(() => {
        // Store the entire updated cart into localStorage
        localStorage.setItem("cartItem", JSON.stringify(cartData));
    }, [cartData]);

    // handle cart clikc
    const handleAddToCart = () => {
        handleCart(
            singleProduct?.id ?? 0,
            singleProduct?.product_name ?? "",
            singleProduct?.images[0] ?? "",
            singleProduct?.discount_price ?? (singleProduct?.price || 0)
        );
        push("/cart");
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
                                Floral Radiance 🌹
                            </h1>
                            <div className="space-y-3">
                                <h1 className="text-4xl font-semibold font-outfit text-[#0b0f3b]">
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
                                <p className="text-xl font-outfit font-semibold ">
                                    {singleProduct?.description}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                    <FaThumbsUp />
                                    <Flex gap="middle">
                                        <Rate
                                            className="flex items-center justify-center text-base text-pink-600"
                                            tooltips={desc}
                                            value={singleProduct?.rating}
                                        />
                                    </Flex>
                                </div>
                                <p className="flex items-center gap-2 text-2xl font-semibold">
                                    <span>
                                        <MdCategory />{" "}
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
        </div>
    );
};

export default Page;
