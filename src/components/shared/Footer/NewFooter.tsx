import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaMobileScreen } from "react-icons/fa6";

const NewFooter = () => {
    return (
        <div className="pb-10 mt-4 px-4 bg-[#b8cedc] py-4 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-[500px_500px_308px] place-content-center md:grid-rows-2 md:max-w-[90%] mx-auto gap-4">
                <div className=" row-span-2 bg-white rounded-xl ">
                    <p className="playfair text-[#184363] font-bold text-4xl p-4">
                        Crafted with love, delivered with care.
                    </p>
                    <div className="flex items-center gap-1">
                        <Image
                            src={"/Images/logo.png"}
                            alt="logo"
                            width={100}
                            height={100}
                            className="w-[50px]"
                        />
                        <p className="font-outfit text-[#184363] text-2xl font-bold">
                            Menverse Fashion
                        </p>
                    </div>
                </div>
                <div className="bg-white rounded-xl ">
                    <p className="playfair text-[#184363] font-bold text-4xl p-4">
                        Contact us
                    </p>
                    <div>
                        <p className="flex items-center text-2xl font-semibold font-outfit gap-2 text-center p-4">
                            <FaMobileScreen />{" "}
                            <a href="tel:+8801304-035398">+880 1328-369000</a>
                        </p>
                        <p className="flex items-center text-2xl font-semibold font-outfit gap-2 text-center p-4">
                            {" "}
                            <a href="mailto:floralradiancee@gmail.com">
                                urbanfits23@gmail.com
                            </a>
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-xl h-auto row-span-2 flex flex-col gap-4 items-center p-4">
                    <h1 className="playfair text-[#184363] font-bold text-4xl ">
                        Social
                    </h1>
                    <ul className="flex flex-col gap-4">
                        <li className="text-6xl cursor-pointer">
                            <a
                                target="blank"
                                href="https://www.instagram.com/floral.radiance/?igsh=ZmFyMXZzdWZ6dXIy"
                            >
                                <FaInstagram />
                            </a>
                        </li>
                        <li className="text-6xl cursor-pointer">
                            <a
                                target="blank"
                                href="https://www.facebook.com/Floralradiance"
                            >
                                <FaFacebook />
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="bg-white rounded-xl flex flex-col md:flex-row items-center justify-center">
                    <Link href={"privacypolicy"}>
                        <p className="text-[#184363] font-bold text-xl font-outfit p-4 underline">
                            Delivery policy
                        </p>
                    </Link>

                    <Link href={"privacypolicy"}>
                        <p className="text-[#184363] text-xl font-outfit font-bold  p-4 underline">
                            Privacy policy
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NewFooter;
