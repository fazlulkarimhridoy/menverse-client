"use client";

import { useCategory } from "@/context/CategoryContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

interface CategoryType {
    id: number;
    categoryId: number;
    name: string;
    description: string;
}

const SideBarMenu = () => {
    const { setCategoryName } = useCategory();
    // fetch all products from server
    const { data: allCategories = [], isLoading } = useQuery<CategoryType[]>({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/all-category`
            );
            return res?.data?.data;
        },
        retry: 2,
        refetchOnWindowFocus: false,
    });

    const handleCategoryClick = (name: string) => {
        setCategoryName(name);
    };
    return (
        <div className=" w-full md:w-[250px] ">
            <ul className="flex flex-col  font-roboto text-lg">
                <li
                    onClick={() => handleCategoryClick("")}
                    className="sideBar-navLink"
                >
                    All product
                </li>
                {allCategories?.length > 0 &&
                    allCategories?.map((item) => (
                        <li
                            onClick={() => handleCategoryClick(item?.name)}
                            key={item?.id}
                            className="sideBar-navLink"
                        >
                            {item?.name}
                        </li>
                    ))}

                {/* <li className="sideBar-navLink">
                    Add something to your bouqet
                </li>
                <li className="sideBar-navLink">Bouqet size</li>
                <li className="sideBar-navLink">Customize</li> */}
            </ul>
        </div>
    );
};

export default SideBarMenu;
