"use client";

import AllProducts from "@/components/pages/Shop/AllProducts";
import ButtonGroup from "@/components/pages/Shop/ScrollBarSlider";
import Search from "@/components/pages/Shop/Search";
import SideBarMenu from "@/components/pages/Shop/SideBarMenu";
import { useCategory } from "@/context/CategoryContext";
import { useQuery } from "@tanstack/react-query";
import { Segmented } from "antd";
import axios from "axios";


interface ProductType {
    id: number;
    product_id: number;
    images: string[];
    product_name: string;
    price: number;
    discount_price: number;
    description: string;
    rating: number;
    category: string;
    quantity: number;
    size: string;
}

interface CategoryType {
    id: number;
    categoryId: number;
    name: string;
    description: string;
}

const Page = () => {
    const { setCategoryName } = useCategory();

    // fetch all products froom server
    const {
        data: shopProducts = [],
        isLoading,
        isSuccess,
    } = useQuery<ProductType[]>({
        queryKey: ["featuredProducts"],
        queryFn: async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/all-products`
            );
            return res.data.data;
        },
        retry: 2,
        refetchOnWindowFocus: false,
    });

    // fetch all categories from server
    const { data: allCategories = [] } = useQuery<CategoryType[]>({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/all-category`
            );
            return res?.data?.data;
        },
        enabled: isSuccess,
        retry: 2,
        refetchOnWindowFocus: false,
    });

    return (
        <div className="flex flex-col-reverse  lg:flex-row  gap-4 max-w-[1340px] mx-auto px-2 no-scrollbar">
            <div className="border-r-2 hidden lg:block">
                <SideBarMenu allCategories={allCategories}></SideBarMenu>
            </div>
            <div
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                className="space-y-4 flex flex-col overflow-scroll pb-5"
            >
                <div className="flex flex-col md:flex-row  gap-4 md:items-center">
                    <Search></Search>
                    <div className="hidden md:block">
                        <ButtonGroup></ButtonGroup>
                    </div>
                </div>
                <div className="w-full sm:w-[450px] mx-auto">
                    {" "}
                    <Segmented<string>
                        style={{
                            flex: "row",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        options={["Half Sleeve", "Full Sleeve", "Sleeveless"]}
                        size="large"
                        block
                        onChange={(value) => setCategoryName(value)}
                    />
                </div>
                <div className="w-full lg:hidden">
                    <SideBarMenu allCategories={allCategories}></SideBarMenu>
                </div>
                <div className="bg-[#f4f4f4] rounded-2xl">
                    <AllProducts
                        shopProducts={shopProducts}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </div>
    );
};

export default Page;
