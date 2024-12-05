import Image from "next/image";
import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const HowItWorks = () => {
  useEffect(() => {
    AOS.init({});
  },[])
  return (
    <div>
      <h1 data-aos="fade-up" className="playfair text-3xl md:text-5xl font-bold text-[#333333] text-center mx-auto max-w-[600px] md:pb-10">
        How Our T-shirt Fashion Service Works
      </h1>
      <div  className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 p-2 md:p-0 md:w-[90%] lg:w-[70%] mx-auto gap-4 m-10">
        {/* card one */}
        <div data-aos="flip-left" data-aos-delay="1000" data-aos-easing="ease-in-out"
        data-aos-duration="400" className=" md:row-span-2  bg-[#c3b2e8] rounded-xl p-4 flex flex-col gap-2 justify-center items-center text-center  amoled-shadow relative">
          <Image
            className="rounded-full bg-none md:absolute md:-top-20 border-2 border-purple-700"
            src={"/Images/explore.jpg"}
            alt="image"
            width={200}
            height={200}
          />
          <h1 className="playfair text-2xl font-bold text-[#4c2366]">
            Explore Our Collection
          </h1>
          <p className="font-outfit text-xl">
            Explore a variety of beautiful t-shirt collection for every occasion.
          </p>
          <Image
            className="rounded-xl bg-none"
            src={"/Images/howitworks-3.jpg"}
            alt="image"
            width={400}
            height={400}
          />
        </div>
        {/* Card two */}
        <div data-aos="flip-right" data-aos-delay="1000" data-aos-duration="800" className=" md:col-span-2  bg-[#f682a5] rounded-xl p-4  amoled-shadow">
          <div className="space-y-4 flex flex-col-reverse text-center justify-between items-center">
            <div>
              <h1 className="playfair text-2xl font-bold text-[#4c2366]">
                Choose Your Perfect T-shirt
              </h1>
              <p className="font-outfit text-xl">
                Choose your favorite and customize it with special add-ons.
              </p>
            </div>
            <Image
              className="rounded-xl bg-none object-fill bg-slate-800"
              src={"/Images/choose.jpg"}
              alt="image"
              width={300}
              height={300}
            />
          </div>
        </div>
        {/* card three */}
        <div data-aos="flip-up" data-aos-delay="1000" data-aos-duration="800" className="  bg-[#c4d68c] rounded-xl p-4 space-y-2  amoled-shadow flex flex-col justify-center items-center ">
          <Image
            className="rounded-xl bg-none object-fill bg-slate-800"
            src={"/Images/place-order.jpg"}
            alt="image"
            width={200}
            height={200}
          />
          <h1 className="playfair text-2xl font-bold text-[#25441a]">
            Place Your Order
          </h1>
          <p className="font-outfit text-xl text-center">
            Provide delivery details and pick a date
          </p>
        </div>
        {/* card four */}
        <div data-aos="flip-right" data-aos-delay="1000" data-aos-duration="800" className=" bg-[#ffdf70] rounded-xl p-4 space-y-2  amoled-shadow flex flex-col justify-center items-center ">
          <Image
            className="rounded-xl bg-none object-fill bg-slate-800"
            src={"/Images/payment.jpg"}
            alt="image"
            width={200}
            height={200}
          />
          <h1 className="playfair text-2xl font-bold text-[#48431c]">
            Secure Checkout
          </h1>
          <p className="font-outfit text-xl text-center">
            Make a payment through our trusted gateway.
          </p>
        </div>
        {/* card five */}
        <div data-aos="flip-right" data-aos-delay="1000" data-aos-duration="800" className="md:col-span-2  bg-[#f8a475] rounded-xl p-4 relative flex flex-row-reverse  amoled-shadow  justify-center items-center ">
          <div >
            <Image
              className="rounded-full bg-none object-fill bg-slate-800  right-4"
              src={"/Images/delivery.jpg"}
              alt="image"
              width={400}
              height={300}
            />
          </div>

          <div>
            <h1 className="playfair text-2xl font-bold text-[#5a2611]">
              We Handcraft & Deliver
            </h1>
            <p className="font-outfit text-xl">
              Our garments worker prepare and deliver your t-shirt fresh.
            </p>
          </div>
        </div>
        {/* card six  */}
        <div data-aos="flip-right" data-aos-delay="1000" data-aos-duration="800" className="  bg-[#b8cedc] rounded-xl p-4 flex flex-col justify-center  amoled-shadow items-center ">
          <Image
            className="rounded-full bg-none object-fill bg-slate-800  right-4"
            src={"/Images/share.jpg"}
            alt="image"
            width={200}
            height={200}
          />
          <h1 className="text-[#174365] playfair text-2xl font-bold">
            Enjoy and Share
          </h1>
          <p className="font-outfit text-xl text-center">
            Brighten someone’s day with stunning t-shirts!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
