"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Page = () => {
    const [bgColor, setBgColor] = useState("bg-[#b8cedc]");
    const [scrollY, setScrollY] = useState(0);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        AOS.init({});
    }, []);

    useEffect(() => {
        const handleScrollLength = () => {
            setScrollY(window.scrollY);
        };

        const handleScroll = () => {
            setScrollY(window.scrollY);
            setWidth(window.innerWidth);

            if (window?.scrollY > 300) {
                setBgColor("bg-[#b8cedc]"); // Change color when scrolled past 100px
            }

            if (window?.scrollY > 500) {
                setBgColor("bg-white"); // Default background color
            }
        };

        // Add event listener for scroll
        window?.addEventListener("scroll", handleScroll);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div
            className={`bg-[#c3b2e8] space-y-10 p-4 ${bgColor} transition-colors duration-300 `}
        >
            <h1 className="playfair text-center text-4xl font-bold text-[#52225e]">
                About Us
            </h1>
            <div
                data-aos="zoom-in"
                data-aos-delay="500"
                data-aos-easing="ease-in-out"
                className="flex justify-center "
            >
                <Image
                    src={`/Images/menverse.jpg`}
                    alt="image"
                    width={500}
                    height={100}
                    className="rounded-xl box-shadow"
                ></Image>
            </div>

            <p className="font-outfit text-[#52225e] text-2xl max-w-[800px] text-center mx-auto ">
                Founded in 2022, MENVERSE has emerged as a trusted destination
                for premium men’s fashion. Our journey began with a clear
                vision: to redefine men’s style by blending modern trends with
                timeless sophistication. Since our inception, we’ve had the
                privilege of serving over 3,000 customers, becoming a part of
                their most memorable moments—from milestone celebrations to
                everyday expressions of confidence. At MENVERSE, we believe
                fashion is more than just clothing; it’s a statement of
                individuality, self-assurance, and personal style. Whether
                you’re suiting up for a wedding, upgrading your wardrobe, or
                seeking to make a lasting impression, our curated collection is
                designed to elevate your look for any occasion. With a
                commitment to quality and an eye for impeccable design, we
                source only the finest fabrics and craftsmanship to ensure every
                piece reflects the sophistication and versatility you deserve.
                Thank you for making MENVERSE a part of your journey in style.
                We look forward to continuing to bring confidence and elegance
                into your life.
            </p>
        </div>
    );
};

export default Page;
