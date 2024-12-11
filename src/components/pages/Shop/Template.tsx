import Image from "next/image";
import React from "react";

const Template = () => {
    return (
        <div className="flex w-full  justify-between items-center bg-[#b8cedc] rounded-2xl relative p-4">
            <p className="font-dm text-base md:text-2xl font-semibold self-end text-[#52225e] text-wrap">
                Send birthday Gift with t-shirts
            </p>
            <div>
                <Image
                    className="bg-[#b8cedc] w-auto h-auto"
                    src="https://photostore.menverseshop.com/public/photos/tshirt.png"
                    alt="flower"
                    width={250}
                    height={100}
                ></Image>
            </div>
        </div>
    );
};

export default Template;
