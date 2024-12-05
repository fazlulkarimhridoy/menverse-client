import Image from "next/image";
import React from "react";

const Template = () => {
    return (
        <div className="flex w-full  justify-between items-center bg-[#b8cedc] rounded-2xl relative  h-full  p-4">
            <p className="font-dm text-2xl font-semibold self-end text-[#52225e] text-wrap">
                Send birthday Gift with t-shirts
            </p>
            <div className="">
                <Image
                    className="bg-[#b8cedc]  "
                    src="https://backend.floralradiancebd.com/public/photos/flowerImg2.png"
                    alt="flower"
                    width={250}
                    height={100}
                ></Image>
            </div>
        </div>
    );
};

export default Template;
