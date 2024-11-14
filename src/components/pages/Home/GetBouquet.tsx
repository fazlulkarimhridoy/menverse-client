import Image from "next/image";
import Link from "next/link";
import React from "react";

const GetBouquet = () => {
  return (
    <div className="p-4 md:p-0">
      <div className="bg-[#194363] md:w-[70%] mx-auto rounded-xl p-4 flex flex-col justify-center items-center gap-4 my-4">
        <h1 className="text-white playfair text-4xl font-bold text-center">
          Ready to get a T-shirt?
        </h1>
        <Image
          className="bg-slate-700 rounded-full"
          src={"/Images/howitworks-1.jpg"}
          alt="img"
          height={200}
          width={200}
        />
        <div>
          <Link href="/products">
            <button className="text-white border-2 border-white rounded-xl p-4 hover:bg-white hover:text-black font-outfit transition-colors duration-300">
              Get T-shirts
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GetBouquet;
