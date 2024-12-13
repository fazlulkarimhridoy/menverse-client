"use client";

import Image from "next/image";
import React from "react";

const Page = () => {
    return (
        <div className="max-w-screen-xl mx-auto p-4 lg:my-10 xl:my-20 gap-5">
            <Image
                src="/Images/menverse.jpg"
                className="rounded float-right ml-3 w-full sm:w-[350px] md:w-[400px] lg:w-[450px] xl:w-[550px]"
                width={500}
                height={500}
                alt="menverse"
            />
            <h2 className="text-2xl font-semibold text-gray-900 md:text-3xl">
                Everything you need to know about{" "}
                <span className="text-sky-500">MENVERSE</span> Fashion.
            </h2>

            <p className="mt-4 text-gray-700">
                Founded in 2022,{" "}
                <span className="text-sky-500 font-medium">MENVERSE</span> has
                emerged as a trusted destination for premium men’s fashion. Our
                journey began with a clear vision: to redefine men’s style by
                blending modern trends with timeless sophistication. Since our
                inception, we’ve had the privilege of serving over 3,000
                customers, becoming a part of their most memorable moments—from
                milestone celebrations to everyday expressions of confidence. At{" "}
                <span className="text-sky-500 font-medium">MENVERSE</span>, we
                believe fashion is more than just clothing; it’s a statement of
                individuality, self-assurance, and personal style. Whether
                you’re suiting up for a wedding, upgrading your wardrobe, or
                seeking to make a lasting impression, our curated collection is
                designed to elevate your look for any occasion. With a
                commitment to quality and an eye for impeccable design, we
                source only the finest fabrics and craftsmanship to ensure every
                piece reflects the sophistication and versatility you deserve.
                Thank you for making{" "}
                <span className="text-sky-500 font-medium">MENVERSE</span> a
                part of your journey in style.
            </p>
        </div>
    );
};

export default Page;
