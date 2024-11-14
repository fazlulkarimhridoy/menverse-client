"use client";

import { ShoppingCartOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Drawer } from "antd";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";

interface CartItem {
  id: number;
  product_name: string;
  images: string;
  price: number;
}

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [open, setOpen] = useState(false);
  const [cartData, setCartData] = useState<CartItem[]>([]);

  // Retrieve cart data from localStorage when the component mounts
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItem");
    console.log(storedCart);
    if (storedCart) {
      setCartData(JSON.parse(storedCart));
    }
  }, []);

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

  return (
    <motion.div
      className={
        showNavbar
          ? "bg-[#9bc4df] sticky top-0 z-50 ease-in duration-200 animate-appear shadow-[0_0_60px_-0_rgba(0,0,0,0.3)]"
          : "bg-transparent shadow-[0_0_60px_-0_rgba(0,0,0,0.3)"
      }
    >
      <div className="flex items-center justify-between px-2 md:px-2 py-2 font-semibold">
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <Image
              width={120}
              height={120}
              src="/Images/logo.png"
              alt="logo"
              className="bg-none w-[50px] md:w-[70px]"
            />
          </div>
        </Link>
        <div className="mr-10 hidden lg:block">
          <ul className="flex text-xl font-bold gap-6 font-poppins">
            <li className="hover:text-sky-600 cursor-pointer transition-colors">
              <Link href="/">Home</Link>
            </li>
            <li className="hover:text-sky-600 cursor-pointer transition-colors">
              <Link href="/products">Shop</Link>
            </li>
            <li className="hover:text-sky-600 cursor-pointer transition-colors">
              <Link href="/aboutUs">About Us</Link>
            </li>
            <li className="hover:text-sky-600 cursor-pointer transition-colors">
              <Link href="/contactUs">Contact Us</Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center justify-center">
          <Link className="relative" href="/cart">
            <button>
              <ShoppingCartOutlined className="text-3xl font-bold hover:text-sky-600 transition-colors mr-8" />
            </button>
            <p className="absolute -top-3 left-4 bg-sky-600 rounded-full w-5 text-center  text-white">
              {""}
            </p>
          </Link>

          {/* Hamburger menu */}
          <div className="lg:hidden block">
            {/* <MenuOutlined className="w-10 h-10" size={25}  /> */}
            <FiMenu size={25} onClick={showDrawer} />
            <Drawer
              width={200}
              closable={false}
              closeIcon={false}
              onClose={onClose}
              open={open}
              style={{ backgroundColor: "white", opacity: "90%" }}
              className="relative"
            >
              <ul className="text-2xl text-right space-y-5 mt-5 font-poppins font-bold">
                <li
                  onClick={onClose}
                  className="hover:text-sky-600 cursor-pointer transition-colors"
                >
                  <Link href="/">Home</Link>
                </li>

                <li
                  onClick={onClose}
                  className="hover:text-sky-600 cursor-pointer transition-colors"
                >
                  <Link href="/products">Shop</Link>
                </li>

                <li
                  onClick={onClose}
                  className="hover:text-sky-600 cursor-pointer transition-colors"
                >
                  <Link href="/aboutUs">About Us</Link>
                </li>
                <li
                  onClick={onClose}
                  className="hover:text-sky-600 cursor-pointer transition-colors"
                >
                  <Link href="/contactUs">Contact Us</Link>
                </li>
              </ul>
              <Link href="/">
                <Image
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
