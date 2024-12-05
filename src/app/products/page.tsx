"use client";

import AllProducts from "@/components/pages/Shop/AllProducts";
import Banner from "@/components/pages/Shop/Banner";
import ButtonGroup from "@/components/pages/Shop/ScrollBarSlider";
import Search from "@/components/pages/Shop/Search";
import SideBarMenu from "@/components/pages/Shop/SideBarMenu";


const Page = () => {
    const images = [
        "/images/flowerVector.png",
        "/images/floweOne.jpeg",
        "/images/flowerTwo.jpeg",
        "/images/flowerThree.jpeg",
    ];

    return (
        <div className="flex flex-col-reverse  lg:flex-row  gap-4 max-w-[1440px] mx-auto px-2 no-scrollbar">
            <div className="border-r-2 ">
                <SideBarMenu></SideBarMenu>
            </div>
            <div
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                className="space-y-4 flex flex-col overflow-scroll pb-5"
            >
                <div className="flex flex-col md:flex-row  gap-4 md:items-center">
                    <Search></Search>
                    <ButtonGroup></ButtonGroup>
                </div>
                <div className="w-full">
                    <Banner images={images}></Banner>
                </div>
                <div className="bg-[#f4f4f4] rounded-2xl">
                    <AllProducts />
                </div>
            </div>
        </div>
    );
};

export default Page;
