"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const ContactUs = () => {
    useEffect(() => {
        Aos.init({});
    }, []);

    const form = useRef<HTMLFormElement>(null);

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();

        if (form.current) {
            emailjs
                .sendForm(
                    process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID ?? "",
                    process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID ?? "",
                    form.current,
                    process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY ?? ""
                )
                //   .sendForm('service_zwede36', 'template_to3aosh', form.current, {
                //     publicKey: 'NwR0aEAxZOl7VG94z',
                //   }
                // )
                .then(
                    () => {
                        Swal.fire({
                            icon: "success",
                            title: "Successfull",
                            text: "Successfully sent.",
                        });
                    },
                    (error) => {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Something went wrong!",
                        });
                    }
                );
        }
    };

    return (
        <div className="bg-[#C3B2E8] rounded-b-xl">
            <div className="space-y-2">
                <h2 className="text-center py-10 text-4xl font-bold lg:text-5xl italic px-2">
                    Reach out via mail 💌
                </h2>
            </div>
            <div className="grid grid-cols-1 justify-items-center gap-5 px-3 pb-5 max-w-[1590px] mx-auto rounded-lg xl:grid-cols-2 md:px-12 lg:px-16 xl:px-32 text-gray-800">
                <div
                    data-aos="zoom-in"
                    data-aos-delay="500"
                    data-aos-easing="ease-in-out"
                >
                    <Image
                        width={500}
                        height={500}
                        src="/Images/share.jpg"
                        alt="contact_image"
                        className="w-full rounded-2xl"
                    />
                </div>
                <form
                    ref={form}
                    onSubmit={sendEmail}
                    className="space-y-5 bg-white p-5 md:p-10 rounded-2xl w-full"
                >
                    <div>
                        <label className="text-sm">Full name</label>
                        <input
                            type="text"
                            name="from_name"
                            placeholder="Enter you name here..."
                            className="w-full rounded-xl p-3 border border-gray-200 bg-gray-100 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-sm">Email</label>
                        <input
                            type="email"
                            name="reply_to"
                            placeholder="Enter you email here..."
                            className="w-full p-3 border border-gray-200 rounded-xl bg-gray-100 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-sm">Message</label>
                        <textarea
                            name="message"
                            placeholder="Enter you description here..."
                            rows={10}
                            className="w-full p-3 border border-gray-200 rounded-xl bg-gray-100 focus:outline-none"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 text-sm font-bold uppercase rounded-xl bg-[#B8CEDC] text-gray-50"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
