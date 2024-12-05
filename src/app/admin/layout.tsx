"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaClipboardList,
  FaHome,
  FaListUl,
  FaRegPlusSquare,
  FaShoppingCart,
  FaSignOutAlt,
  FaUserFriends,
} from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import "@/styles/adminlayout.css";
import { usePathname, useRouter } from "next/navigation";
import { TbCategoryPlus } from "react-icons/tb";
import menverse from "../../../public/Images/logo.png";
import Swal from "sweetalert2";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { push } = router;

  // handle logout
  const handleLogout = async () => {
    localStorage.removeItem("token");
    push("/login");
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Successfully logged out!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const links = (
    <>
      <li>
        <Link href="/admin" className={pathname === "/admin" ? "active" : ""}>
          <RxDashboard />
          Dashboard
        </Link>
      </li>

      <li>
        <Link
          href="/admin/orders"
          className={pathname === "/admin/orders" ? "active" : ""}
        >
          <FaShoppingCart />
          Orders
        </Link>
      </li>
      <li>
        <Link
          href="/admin/customers"
          className={pathname === "/admin/customers" ? "active" : ""}
        >
          <FaUserFriends />
          Customers
        </Link>
      </li>
      <li>
        <Link
          href="/admin/products"
          className={pathname === "/admin/products" ? "active" : ""}
        >
          <FaClipboardList />
          Products
        </Link>
      </li>
      <li>
        <Link
          href="/admin/categories"
          className={pathname === "/admin/categories" ? "active" : ""}
        >
          <FaListUl />
          Categories
        </Link>
      </li>
      <li>
        <Link
          href="/admin/addProduct"
          className={pathname === "/admin/addProduct" ? "active" : ""}
        >
          <FaRegPlusSquare />
          Add Product
        </Link>
      </li>
      <li>
        <Link
          href="/admin/addCategory"
          className={pathname === "/admin/addCategory" ? "active" : ""}
        >
          <TbCategoryPlus />
          Add Category
        </Link>
      </li>
      <li className="text-[#1886ca]">
        <Link href="/">
          <FaHome color="#1886ca" />
          Home
        </Link>
      </li>
    </>
  );

  const linksForMobile = (
    <>
      <li>
        <Link href="/admin" className={pathname === "/admin" ? "active" : ""}>
          <RxDashboard />
          <span
            className={`${
              pathname === "/admin" ? "active flex" : "hidden"
            } text-sm`}
          >
            Dashboard
          </span>
        </Link>
      </li>

      <li>
        <Link
          href="/admin/orders"
          className={pathname === "/admin/orders" ? "active" : ""}
        >
          <FaShoppingCart />
          <span
            className={`${
              pathname === "/admin/orders" ? "active flex" : "hidden"
            } text-sm`}
          >
            Orders
          </span>
        </Link>
      </li>
      <li>
        <Link
          href="/admin/customers"
          className={pathname === "/admin/customers" ? "active" : ""}
        >
          <FaUserFriends />
          <span
            className={`${
              pathname === "/admin/customers" ? "active flex" : "hidden"
            } text-sm`}
          >
            Customers
          </span>
        </Link>
      </li>
      <li>
        <Link
          href="/admin/products"
          className={pathname === "/admin/products" ? "active" : ""}
        >
          <FaClipboardList />
          <span
            className={`${
              pathname === "/admin/products" ? "active flex" : "hidden"
            } text-sm`}
          >
            Products
          </span>
        </Link>
      </li>
      <li>
        <Link
          href="/admin/categories"
          className={pathname === "/admin/categories" ? "active" : ""}
        >
          <FaListUl />
          <span
            className={`${
              pathname === "/admin/categories" ? "active flex" : "hidden"
            } text-sm`}
          >
            Categories
          </span>
        </Link>
      </li>
      <li>
        <Link
          href="/admin/addProduct"
          className={pathname === "/admin/addProduct" ? "active" : ""}
        >
          <FaRegPlusSquare />
          <span
            className={`${
              pathname === "/admin/addProduct" ? "active flex" : "hidden"
            } text-sm`}
          >
            Add Product
          </span>
        </Link>
      </li>
      <li>
        <Link
          href="/admin/addCategory"
          className={pathname === "/admin/addCategory" ? "active" : ""}
        >
          <TbCategoryPlus />
          <span
            className={`${
              pathname === "/admin/addCategory" ? "active flex" : "hidden"
            } text-sm`}
          >
            Add Category
          </span>
        </Link>
      </li>
      <li onClick={handleLogout}>
        <Link href="">
          <FaSignOutAlt color="#8f0c0c" />
        </Link>
      </li>
      <li>
        <Link href="/">
          <FaHome color="blue" />
        </Link>
      </li>
    </>
  );
  return (
    <div className="relative">
      <div className="flex relative">
        {/* dashboard sidebar */}
        <div className="hidden lg:flex">
          <div className="h-screen p-3 space-y-2 w-60 bg-blue-200 text-gray-800 sticky top-0">
            <div className="flex items-center p-2 space-x-4 bg-[#B8CEDC] rounded-2xl">
              <Image
                width={500}
                height={500}
                src={menverse}
                alt="user_photo"
                className="w-12 h-12 rounded-full bg-white"
              />
              <div>
                <h2 className="text-lg font-semibold">MENVERSE</h2>
                <span className="flex items-center space-x-1 text-sm font-thin">
                  Admin Panel
                </span>
              </div>
            </div>
            <div className="p-2 bg-[#B8CEDC] rounded-2xl h-[92%]">
              <ul
                id="link1"
                className="menu menu-vertical text-[16px] px-1 gap-2 text-gray-500"
              >
                {links}
              </ul>
              <ul className="pt-4 pb-2 space-y-1 text-sm">
                <li>
                  <button
                    onClick={handleLogout}
                    rel="noopener noreferrer"
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <FaSignOutAlt color="#8f0c0c" size={20}></FaSignOutAlt>
                    <span className="font-semibold text-[#8f0c0c]">Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* dashboard content */}
        <div
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          className="flex-1 flex-nowrap overflow-x-scroll scroll-smooth h-screen bg-blue-50 p-2 md:p-8 lg:p-12 pb-28 md:pb-28 lg:mb-0"
        >
          <div className="flex items-center justify-between">
            <h1 className="text-left text-sm font-thin italic text-gray-600 lg:bg-[#d1e3ee] px-4 py-2 lg:rounded-3xl">
              Menverse 👕
            </h1>
            <h1 className="text-left text-sm font-thin italic text-gray-600 lg:bg-[#d1e3ee] px-4 py-2 lg:rounded-3xl">
              Date: {new Date().toLocaleDateString()}{" "}
            </h1>
          </div>
          {children}
        </div>
      </div>
      {/* for medium devices */}
      <div className="hidden md:flex md:justify-center lg:hidden w-full fixed bottom-0 bg-blue-200">
        <ul
          id="link1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          className="flex flex-row flex-nowrap overflow-x-scroll scroll-smooth menu menu-horizontal px-3 py-3 gap-1 text-gray-500"
        >
          {links}
        </ul>
      </div>
      {/* for small devices */}
      <div className="flex justify-center md:hidden w-full fixed bottom-0 bg-blue-200">
        <ul
          id="link1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          className="flex flex-row flex-nowrap overflow-x-scroll scroll-smooth menu menu-horizontal text-[22px] px-3 py-3 gap-2 text-gray-500 whitespace-nowrap"
        >
          {linksForMobile}
        </ul>
      </div>
    </div>
  );
};

export default AdminLayout;
