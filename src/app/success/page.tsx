"use client";

import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import Image from "next/image";
import { Button } from "antd";
import Link from "next/link";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Success = () => {
  // states and calls
  const [isMounted, setIsMounted] = useState(false);

  // useeffect
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    AOS.init({});
  },[])

  return (
    <div className="mt-16 flex flex-col items-center justify-center gap-5 p-5">
      {isMounted && (
        <Confetti
          width={window.innerWidth || 300}
          height={window.innerHeight || 300}
        />
      )}
      <h1 className="text-center text-2xl md:text-[42px] font-bold">
        Successfully Purchased🎉
      </h1>
      <p className="text-gray-400 text-center text-sm md:text-lg font-thin !italic">
        Thanks for shopping from Floral Radiance ❤
      </p>
      <div
        data-aos="zoom-in"
        data-aos-delay="200"
        data-aos-easing="ease-in-out"
        className="flex items-center justify-center"
      >
        <Image
          className="rounded-2xl"
          width={500}
          height={500}
          src="/Images/bouquet-vec.jpg"
          alt="success-image"
        />
      </div>
      <Link className="w-full flex items-center justify-center" href="/">
        <Button
          className="w-full md:w-[70%] lg:w-[50%] xl:w-[36%] 2xl:w-[26.5%] mx-auto h-[50px]"
          size="large"
          type="primary"
        >
          Go Home
        </Button>
      </Link>
    </div>
  );
};

export default Success;
