import Image from "next/image";
import Link from "next/link";
import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect } from "react";

const BannerContent = () => {
  useEffect(() => {
    AOS.init({});
  },[])
  return (
    <div className="">
      <div className="">
        <div className="flex flex-col-reverse gap-4 md:flex-col justify-around items-center  h-[650px]">
          {/* <div>
            <h1 className="text-5xl playfair font-bold text-[#194363] text-center ">Floral Radiance</h1>
          </div> */}
          <section className="flex flex-col md:flex-row p-2 items-center justify-around gap-4">
            <div className=" max-w-[400px] space-y-8 px-2">
              <p className="text-5xl playfair font-bold text-[#194363] cssanimation ">
                We make gifting and celebrating better.
              </p>
              <Link href={'/products'}>
                <button className="group relative inline-block overflow-hidden border border-[#194464] px-8 py-3 focus:outline-none focus:ring rounded-xl mt-4">
                  <span className="absolute inset-y-0 left-0 w-[2px] bg-[#194464] transition-all group-hover:w-full group-active:bg-indigo-500"></span>
                  <span className="relative text-sm font-medium text-[#194464] transition-colors group-hover:text-white">
                    Shop Now
                  </span>
                </button>
              </Link>
            </div>
            <div data-aos="zoom-in"  data-aos-delay="500" data-aos-easing="ease-in-out" className="">
              <Image
                className="rounded-full "
                width={400}
                height={300}
                src={"/Images/bouquet-vec.jpg"}
                alt="flower"
              ></Image>
            </div>
            {/* <div>
              <p className="max-w-[300px] text-2xl font-bold text-[#194363]">
                So you can show up for every meaningful occasion, milestone, and
                moment.
              </p>
            </div> */}
          </section>
        </div>
      </div>
    </div>
  );
};

export default BannerContent;
