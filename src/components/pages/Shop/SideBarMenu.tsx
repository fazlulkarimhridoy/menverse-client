"use client";

import { useCategory } from "@/context/CategoryContext";
import { Select } from "antd";
import React, { useState } from "react";

interface CategoryType {
    id: number;
    categoryId: number;
    name: string;
    description: string;
}

const SideBarMenu = ({ allCategories }: { allCategories: any }) => {
    const [activeButton, setActiveButton] = useState<number | null>(null);
    const { setCategoryName } = useCategory();

    const handleCategoryClick = (name: string, buttonIndex: number) => {
        setCategoryName(name);
        setActiveButton(buttonIndex);
    };

    const handleSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setCategoryName(event.target.value);
    };

    return (
        <>
            {/* Desktop view */}
            <div className="w-full md:w-[250px] hidden lg:block">
                <ul className="flex flex-col font-roboto text-lg">
                    <li
                        onClick={() => handleCategoryClick("", 0)}
                        className={
                            activeButton === 0
                                ? "active-navLink"
                                : "sideBar-navLink"
                        }
                    >
                        All product
                    </li>
                    {allCategories?.length > 0 &&
                        allCategories?.map((item: CategoryType) => (
                            <li
                                onClick={() =>
                                    handleCategoryClick(item?.name, item?.id)
                                }
                                key={item?.id}
                                className={
                                    activeButton === item?.id
                                        ? "active-navLink"
                                        : "sideBar-navLink"
                                }
                            >
                                {item?.name}
                            </li>
                        ))}
                </ul>
            </div>
            {/* Mobile Dropdown */}
            <div className="w-full sm:w-[450px] mx-auto lg:hidden rounded-lg border-1 bg-[#f4f4f4] px-3 py-2.5">
                <select
                    className="font-roboto text-base bg-[#f4f4f4] outline-none w-full"
                    onChange={handleSelectChange}
                >
                    <option className="bg-white p-3" value="">All products</option>
                    {allCategories?.length > 0 &&
                        allCategories?.map((item: CategoryType) => (
                            <option
                                className="bg-white p-3"
                                key={item?.id}
                                value={item?.name}
                            >
                                {item?.name}
                            </option>
                        ))}
                </select>
            </div>
        </>
    );
};

export default SideBarMenu;
