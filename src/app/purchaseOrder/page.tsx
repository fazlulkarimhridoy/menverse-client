"use client";

import React, { useEffect, useState } from "react";
import { FaTrash, FaUser } from "react-icons/fa";
import { Button, Input, Spin } from "antd";
import { FaMobileAlt } from "react-icons/fa";
import { FaBangladeshiTakaSign, FaLocationDot } from "react-icons/fa6";
import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import type { TimePickerProps } from "antd";
import { TimePicker } from "antd";
import { FaCalendar } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import CartTotal from "@/components/pages/Cart/CartTotal";
import { FaAngleDown } from "react-icons/fa";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface CartItem {
    id: number;
    product_name: string;
    images: string;
    price: number;
}

const Page = () => {
    const [cartData, setCartData] = useState<CartItem[]>([]);
    const [showData, setShowData] = useState(true);
    const [name, setname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [deliveryDate, setDeliveryDate] = useState<string | string[]>([]);
    const [deliveryTime, setDeliveryTime] = useState<string | string[]>([]);
    const [note, setNote] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { push } = router;

    // Retrieve cart data from localStorage when the component mounts

    useEffect(() => {
        const storedCart = localStorage.getItem("cartItem");
        if (storedCart) {
            setCartData(JSON.parse(storedCart));
        }
    }, []);

    const removeFromCart = (id: number) => {
        // selected id data should be deleted from local storage
        const updatedCartData = cartData.filter((item) => item.id !== id);
        localStorage.setItem("cartItem", JSON.stringify(updatedCartData));
        setCartData(updatedCartData);
    };

    // calculate cart data price total
    const calculateTotal = () => {
        return cartData.reduce((total, item) => total + item.price, 0);
    };

    const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
        setDeliveryDate(dateString);
        console.log(dateString);
    };

    const onChangeTime: TimePickerProps["onChange"] = (time, timeString) => {
        setDeliveryTime(timeString);
        console.log(timeString);
    };
    const { TextArea } = Input;

    const onChangeNote = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setNote(e.target.value);
        console.log(e.target.value);
    };

    // handle transection id
    const handleTransactionId = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTransactionId(e.target.value);
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
    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
        console.log(e.target.value);
    };

    // handle email
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        console.log(e.target.value);
    };

    const handleSubmitData = async () => {
        setLoading(true);
        if (
            !name ||
            !phone ||
            !email ||
            !address ||
            !deliveryDate ||
            !deliveryTime ||
            !note ||
            !transactionId ||
            !cartData
        ) {
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

        if (transactionId.length !== 10) {
            setLoading(false);
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Transaction ID must be of 10 digits.",
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
                    email,
                    address,
                }
            );

            if (customerResponse.data.status !== "success") {
                setLoading(false);
                throw new Error("Failed to create customer.");
            }

            console.log("customer", customerResponse);
            const customerId = customerResponse.data.data.id;

            // Create order
            const orderResponse = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/add-order`,
                {
                    customerId,
                    totalPrice: calculateTotal(),
                    deliveryDate,
                    deliveryTime,
                    orderStatus: "PENDING",
                    items: cartData.map((item) => ({
                        productId: item.id,
                        quantity: 1,
                        price: item.price,
                    })),
                    paymentMethod: "BKASH",
                    note,
                    transactionId,
                }
            );

            console.log(orderResponse);
            if (orderResponse.data.status !== "success") {
                setLoading(false);
                throw new Error("Failed to create order.");
            }

            localStorage.removeItem("cartItem");
            setCartData([]);
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
                    <div
                        onClick={() => setShowData(!showData)}
                        className="p-2 flex justify-between items-center transition-all"
                    >
                        Show order summary <FaAngleDown />{" "}
                    </div>
                    {showData && (
                        <div className="overflow-x-auto scroll-smooth pt-4 mb-5 md:mb-0">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Product & image</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Delete</th>
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
                                                                    src={
                                                                        data?.images
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
                                                    <div className="text-gray-600 font-bold">
                                                        {data?.price}
                                                    </div>
                                                </td>

                                                <td>
                                                    <Button
                                                        onClick={() =>
                                                            removeFromCart(
                                                                data?.id
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
                    )}
                    <div className="p-2 md:p-0">
                        <CartTotal
                            calculateTotal={calculateTotal}
                            show={false}
                        ></CartTotal>
                    </div>
                </div>
                <div className="md:border-r-2 md:border-black">
                    {/* Submit Form Section */}
                    <div className=" p-4 space-y-8">
                        {/*Customer name */}
                        <div className="flex flex-col md:flex-row gap-2">
                            <div className="flex flex-col gap-2 w-full">
                                <label className="text-xl flex gap-2 items-center text-[#3d4349]">
                                    {" "}
                                    <FaUser /> Full Name:
                                </label>
                                <Input
                                    required
                                    type="string"
                                    maxLength={100}
                                    placeholder="first name"
                                    className="w-[300px]"
                                    onChange={handleCustomerNameChange}
                                />
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <label className="text-xl flex gap-2 items-center text-[#3d4349]">
                                    {" "}
                                    <FaMobileAlt /> Mobile Number:
                                </label>
                                <Input
                                    required
                                    type="number"
                                    maxLength={11}
                                    placeholder="017XXXXXXXX"
                                    onChange={handlePhoneNumberChange}
                                />
                            </div>
                        </div>
                        {/*Customer mobile number */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xl flex gap-2 items-center text-[#3d4349]">
                                {" "}
                                <FaMobileAlt /> Email Address:
                            </label>
                            <Input
                                required
                                type="string"
                                placeholder="abc@example.com"
                                onChange={handleEmailChange}
                            />
                        </div>
                        {/* Delivery address */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xl flex gap-2 items-center text-[#3d4349]">
                                {" "}
                                <FaLocationDot /> Delivery Address:
                            </label>
                            <Input
                                required
                                type="string"
                                maxLength={100}
                                placeholder="address"
                                onChange={handleAddressChange}
                            />
                        </div>
                        {/* delivery date and time */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex flex-col gap-2 w-full">
                                <label
                                    htmlFor=""
                                    className="text-xl flex gap-2 items-center text-[#3d4349]"
                                >
                                    {" "}
                                    <FaCalendar /> Delivey date:
                                </label>
                                <DatePicker
                                    className="w-full"
                                    onChange={onChangeDate}
                                />
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <label
                                    htmlFor=""
                                    className="text-xl flex gap-2 items-center text-[#3d4349]"
                                >
                                    {" "}
                                    <FaClock /> Delivey time:
                                </label>
                                <TimePicker
                                    use12Hours
                                    onChange={onChangeTime}
                                    className="w-full"
                                />
                            </div>
                        </div>
                        {/* Customer Notes for gifts */}
                        <div className="flex flex-col gap-4 ">
                            <div>
                                <label
                                    htmlFor=""
                                    className="text-xl flex gap-2 items-center text-[#3d4349]"
                                >
                                    {" "}
                                    <GiNotebook /> Any notes for this gift:
                                </label>
                                <TextArea
                                    className="w-full"
                                    showCount
                                    maxLength={100}
                                    onChange={onChangeNote}
                                    placeholder="any suggetion for notes"
                                    style={{ height: 120, resize: "none" }}
                                />
                            </div>
                        </div>
                        {/* <div>
                            <ShipmentCalculator shipmentCost={shipmentCost} setShipmentCost={setShipmentCost} />
                        </div> */}
                        <div>
                            <p>
                                Please pay the advance amount <span className="font-bold text-blue-400">150</span> Taka to
                                confirm the order.{" "}
                                <br className="hidden md:flex" /> Pay via send
                                money to this number{" "}
                                <span className="text-red-600">
                                    01304035398
                                </span>{" "}
                                (Bkash , Nagad) and fill the transaction id
                                below.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-xl flex gap-2 items-center text-[#3d4349]">
                                {" "}
                                <FaBangladeshiTakaSign /> Bkash Transection Id (10 digits):
                            </label>
                            <Input
                                required
                                type="string"
                                maxLength={10}
                                placeholder="Transection id"
                                className="w-full"
                                onChange={handleTransactionId}
                            />
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
