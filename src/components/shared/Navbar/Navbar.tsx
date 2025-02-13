"use client";

import { useCart } from "@/context/CartProvider";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Drawer } from "antd";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const { cartData } = useCart();
    const [showNavbar, setShowNavbar] = useState(false);
    const [open, setOpen] = useState(false);

    const pathname = usePathname(); // Get the current route

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        window.addEventListener("scroll", changeBackground);
        return () => {
            window.removeEventListener("scroll", changeBackground);
        };
    }, []);

    const changeBackground = () => {
        if (window.scrollY >= 120) {
            setShowNavbar(true);
        } else {
            setShowNavbar(false);
        }
    };

    const getActiveClass = (href: string) =>
        pathname === href ? "text-sky-600 font-bold" : "hover:text-sky-600";

    return (
        <motion.div
            className={
                showNavbar
                    ? "bg-[#9bc4df] sticky top-0 z-50 ease-in duration-200 animate-appear shadow-[0_0_60px_-0_rgba(0,0,0,0.3)]"
                    : "bg-transparent shadow-[0_0_60px_-0_rgba(0,0,0,0.3)"
            }
        >
            <div className="flex items-center justify-between px-3 md:px-2 py-2 font-semibold">
                <Link href="/">
                    <div className="flex items-center cursor-pointer">
                        <Image
                            width={500}
                            height={500}
                            src="/Images/logo.png"
                            alt="logo"
                            className="bg-none w-[45px] md:w-[60px]"
                        />
                    </div>
                </Link>
                <div className="lg:hidden md:text-xl italic text-gray-400">
                    <a href="tel:+880 1328-369000">+880 1328-369000</a>
                </div>
                <div className="mr-10 hidden lg:block">
                    <ul className="flex text-xl font-bold gap-6 font-poppins">
                        <li
                            className={`${getActiveClass(
                                "/"
                            )} cursor-pointer transition-colors`}
                        >
                            <Link href="/">Home</Link>
                        </li>
                        <li
                            className={`${getActiveClass(
                                "/products"
                            )} cursor-pointer transition-colors`}
                        >
                            <Link href="/products">Shop</Link>
                        </li>
                        <li
                            className={`${getActiveClass(
                                "/aboutUs"
                            )} cursor-pointer transition-colors`}
                        >
                            <Link href="/aboutUs">About Us</Link>
                        </li>
                        <li
                            className={`${getActiveClass(
                                "/contactUs"
                            )} cursor-pointer transition-colors`}
                        >
                            <Link href="/contactUs">Contact Us</Link>
                        </li>
                    </ul>
                </div>

                <div className="flex items-center justify-center gap-5">
                    <Link className="relative" href={"/cart"}>
                        <button>
                            <ShoppingCartOutlined className="text-3xl font-bold hover:text-sky-600 transition-colors lg:mr-8" />
                        </button>
                        <p className="absolute -top-3 left-4 bg-sky-600 rounded-full w-5 text-center  text-white">
                            {cartData.length}
                        </p>
                    </Link>

                    {/* Hamburger menu */}
                    <div className="lg:hidden block">
                        <FiMenu size={30} onClick={showDrawer} />
                        <Drawer
                            width={250}
                            closable={false}
                            closeIcon={false}
                            onClose={onClose}
                            open={open}
                            style={{ backgroundColor: "white", opacity: "90%" }}
                            className="relative"
                        >
                            <ul className="absolute text-nowrap top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-center space-y-5 font-poppins font-bold">
                                <li
                                    onClick={onClose}
                                    className={`${getActiveClass(
                                        "/"
                                    )} cursor-pointer transition-colors`}
                                >
                                    <Link href="/">Home</Link>
                                </li>

                                <li
                                    onClick={onClose}
                                    className={`${getActiveClass(
                                        "/products"
                                    )} cursor-pointer transition-colors`}
                                >
                                    <Link href="/products">Shop</Link>
                                </li>

                                <li
                                    onClick={onClose}
                                    className={`${getActiveClass(
                                        "/aboutUs"
                                    )} cursor-pointer transition-colors`}
                                >
                                    <Link href="/aboutUs">About Us</Link>
                                </li>
                                <li
                                    onClick={onClose}
                                    className={`${getActiveClass(
                                        "/contactUs"
                                    )} cursor-pointer transition-colors`}
                                >
                                    <Link href="/contactUs">Contact Us</Link>
                                </li>
                            </ul>
                            <Link href="/">
                                <Image
                                    onClick={onClose}
                                    width={120}
                                    height={120}
                                    src="/Images/logo.png"
                                    alt="logo"
                                    className="bg-none w-[60px] absolute bottom-3 left-3"
                                />
                            </Link>
                        </Drawer>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Navbar;
