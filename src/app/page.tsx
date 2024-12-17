"use client";

import { useEffect, useState } from "react";
import Banner from "@/components/pages/Home/Banner";
import FeaturedProducts from "@/components/pages/Home/FeaturedProducts";
import HowItWorks from "@/components/pages/Home/HowItWorks";
import GetBouquet from "@/components/pages/Home/GetBouquet";
import FloatButton from "@/components/floatButton/FloatSocialButton";

const Home = () => {
  const [bgColor, setBgColor] = useState("bg-[#b8cedc]");
 
  
  useEffect(() => {

    const handleScroll = () => {
      if (window?.scrollY > 300) {
        setBgColor("bg-[#b8cedc]"); // Change color when scrolled past 100px
      }

            if (window?.scrollY > 500) {
                setBgColor("bg-white"); // Default background color
            }

            if (window.scrollY > 3300) {
                setBgColor("bg-[#b8cedc]"); // Default background color
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
    <div className={`${bgColor} transition-colors duration-300 overflow-hidden`}>
      <Banner></Banner>
      <FeaturedProducts/>
      <HowItWorks/>
      <GetBouquet/>
    </div>
  );
};

export default Home;
