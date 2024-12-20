"use client";

import { useCart } from "@/context/CartProvider";
import React, { useState } from "react";
import { FaShippingFast, FaTrash, FaUser } from "react-icons/fa";
import {
    Button,
    Input,
    Radio,
    RadioChangeEvent,
    Space,
    Spin,
} from "antd";
import { FaMobileAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GiNotebook } from "react-icons/gi";
import CartTotal from "@/components/pages/Cart/CartTotal";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Page = () => {
    const {
        cartData,
        removeFromCart,
        clearCart,
        updateCartItemQuantity,
        setCartData,
    } = useCart();
    const [name, setname] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { push } = router;
    const [value, setValue] = useState(60);

    const onChange = (e: RadioChangeEvent) => {
        console.log("radio checked", e.target.value);
        setValue(e.target.value);
    };

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

    const { TextArea } = Input;

    const onChangeNote = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setNote(e.target.value);
        console.log(e.target.value);
    };

    // handle full name
    const handleCustomerNameChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setname(e.target.value);
        console.log(e.target.value);
    };

    // handle phone
    const handlePhoneNumberChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPhone(e.target.value);
        console.log(e.target.value);
    };

    // handle address
    const handleAddressChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setAddress(e.target.value);
        console.log(e.target.value);
    };

    const handleSubmitData = async () => {
        console.log("number", phone);
        setLoading(true);

        if (cartData.length === 0) {
            setLoading(false);
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Your cart is empty.",
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }

        if (!name || !phone || !address || !cartData) {
            setLoading(false);
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Please fill in all required fields.",
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }

        // if size not found in cart data then show error
        if (cartData.some((item) => !item.size || item.size.trim() === "")) {
            setLoading(false);
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Please select a size.",
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }

        if (phone.length !== 11) {
            setLoading(false);
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Number must be of 11 digits.",
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }

        if (!phone.startsWith("01")) {
            setLoading(false);
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Invalid Number.",
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }

        try {
            // Create customer
            const customerResponse = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/customer/add-customer`,
                {
                    name,
                    phone,
                    address,
                }
            );

            if (customerResponse.data.status !== "success") {
                setLoading(false);
                throw new Error("Failed to create customer.");
            }

            const customerId = customerResponse.data.data.id;
            const total = calculateTotal();

            // Create order
            const orderResponse = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/add-order`,
                {
                    customerId,
                    totalPrice: total,
                    deliveryCharge: value,
                    orderStatus: "PENDING",
                    items: cartData.map((item) => ({
                        productId: item.id,
                        quantity: item.quantity,
                        size: item.size,
                        price: item.price,
                        discount_price: item.discount_price,
                    })),
                    paymentMethod: "CASHON",
                    note,
                }
            );

            if (orderResponse.data.status !== "success") {
                setLoading(false);
                throw new Error("Failed to create order.");
            }

            localStorage.removeItem("cartItem");
            clearCart();
            push("/success");
            setLoading(false);
        } catch (error: any) {
            console.error(error);
            setLoading(false);
            Swal.fire({
                position: "center",
                icon: "error",
                title: `${
                    error.message ||
                    "An error occurred while placing the order."
                }`,
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    // show loader if data loads
    if (loading) {
        return (
            <Spin fullscreen={true} style={{ color: "white" }} size="large" />
        );
    }

    return (
        <div className="bg-[#f2f6f9] p-4 space-y-4">
            <h1 className="text-4xl font-outfit text-center font-semibold">
                Place your order
            </h1>
            <div className=" w-full p-2 font-outfit space-y-4 gap-4 bg-white rounded-xl box-shadow flex flex-col lg:flex-row-reverse justify-center relative ">
                <div>
                    {/* Product information */}
                    <p className="p-2 flex justify-between items-center transition-all">
                        Show order summary
                    </p>
                    <div className="overflow-x-auto scroll-smooth pt-4 mb-5 md:mb-0">
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
                                    <th>Delete</th>
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
                                                                width={500}
                                                                height={500}
                                                                src={
                                                                    data?.image
                                                                }
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
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        className="bg-gray-200 px-3 py-1 rounded-md text-lg"
                                                        onClick={() =>
                                                            updateCartItemQuantity(
                                                                data.uid,
                                                                data.quantity -
                                                                    1
                                                            )
                                                        }
                                                        disabled={
                                                            data.quantity <= 1
                                                        }
                                                    >
                                                        -
                                                    </Button>
                                                    <span className="text-lg">
                                                        {data?.quantity}
                                                    </span>
                                                    <Button
                                                        className="bg-gray-200 px-3 py-1 rounded-md text-lg"
                                                        onClick={() =>
                                                            updateCartItemQuantity(
                                                                data.uid,
                                                                data.quantity +
                                                                    1
                                                            )
                                                        }
                                                    >
                                                        +
                                                    </Button>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex gap-2">
                                                    {[
                                                        "M",
                                                        "L",
                                                        "XL",
                                                        "XXL",
                                                    ].map((size) => (
                                                        <Button
                                                            key={size}
                                                            className={`px-3 py-1 border rounded-md ${
                                                                data?.size ===
                                                                size
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
                                                    ))}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="text-gray-600 font-bold">
                                                    {data?.discount_price *
                                                        data?.quantity}
                                                </div>
                                            </td>

                                            <td>
                                                <Button
                                                    onClick={() =>
                                                        removeFromCart(
                                                            data?.uid
                                                        )
                                                    }
                                                    className="btn btn-circle btn-outline btn-sm"
                                                >
                                                    <FaTrash className="text-red-600"></FaTrash>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-2 md:p-0">
                        <CartTotal
                            mobileWidth={"w-full"}
                            largeWidth={"w-full"}
                            calculateTotal={calculateTotal}
                            deliveryCharge={value}
                            show={false}
                        ></CartTotal>
                    </div>
                </div>
                <div className="md:border-r-2 md:border-black">
                    {/* Submit Form Section */}
                    <div className="p-4 space-y-8 w-full xl:w-[500px]">
                        {/*Customer name */}
                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-xl flex gap-2 items-center text-[#3d4349]">
                                {" "}
                                <FaUser /> নামঃ
                            </label>
                            <Input
                                size="large"
                                required
                                type="string"
                                maxLength={100}
                                placeholder="নাম লিখুন"
                                onChange={handleCustomerNameChange}
                            />
                        </div>
                        {/*Customer mobile number */}
                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-xl flex gap-2 items-center text-[#3d4349]">
                                {" "}
                                <FaMobileAlt /> মোবাইল নাম্বারঃ
                            </label>
                            <Input
                                type="number"
                                style={{ width: "100%" }}
                                size="large"
                                required
                                maxLength={11}
                                placeholder="নাম্বার লিখুন"
                                onChange={handlePhoneNumberChange}
                            />
                        </div>
                        {/* Delivery address */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xl flex gap-2 items-center text-[#3d4349]">
                                {" "}
                                <FaLocationDot /> সম্পূর্ণ ঠিকানাঃ
                            </label>
                            <TextArea
                                required
                                maxLength={100}
                                placeholder="বাড়ি, রোড, এলাকা, থানা, জেলা লিখুন"
                                onChange={handleAddressChange}
                                style={{ height: 80, resize: "none" }}
                            />
                        </div>
                        {/* Customer Notes for gifts */}
                        <div className="flex flex-col gap-4 ">
                            <div>
                                <label
                                    htmlFor=""
                                    className="text-xl flex gap-2 items-center text-[#3d4349]"
                                >
                                    {" "}
                                    <GiNotebook /> বিশেষ নোটঃ{" "}
                                    <span className="text-sm text-gray-300">
                                        (Optional)
                                    </span>
                                </label>
                                <TextArea
                                    className="w-full"
                                    showCount
                                    maxLength={100}
                                    onChange={onChangeNote}
                                    placeholder="বিশেষ নোট লিখুন"
                                    style={{ height: 80, resize: "none" }}
                                />
                            </div>
                        </div>

                        {/* Delivery charge */}
                        <div>
                            <div className="flex items-center gap-2 text-xl">
                                <FaShippingFast /> <h2>ডেলিভারি চার্জঃ</h2>
                            </div>
                            <Radio.Group
                                onChange={onChange}
                                value={value}
                                className="mt-2"
                            >
                                <Space direction="vertical">
                                    <Radio value={60}>
                                        ঢাকা সিটি (৬০ টাকা)
                                    </Radio>
                                    <Radio value={130}>
                                        ঢাকার বাহিরে (১৩০ টাকা)
                                    </Radio>
                                </Space>
                            </Radio.Group>
                        </div>

                        <div className="space-y-4 ">
                            <button
                                onClick={handleSubmitData}
                                type="submit"
                                className=" w-full bg-[#7a71b1] border-2 hover:bg-[#a29bd3] border-[#7a71b1] px-3 py-2 text-white text-xl rounded-md flex items-center justify-center gap-2 text-center btn"
                            >
                                Complete order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
