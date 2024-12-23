"use client";
import React from "react";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const ContactUs = () => {
    const form = useRef<HTMLFormElement>(null);

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();

        // if form is empty show error message
        if (
            !form.current ||
            !form.current.name ||
            !form.current.email ||
            !form.current.message
        ) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please fill out all fields!",
            });
            return;
        }

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
                .then((data) => {
                    console.log(data.status);
                    Swal.fire({
                        icon: "success",
                        title: "Successfull",
                        text: "Email has been sent!",
                    });
                    form.current?.reset();
                })
                .catch((error) => {
                    console.log(error.message);
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                    });
                });
        }
    };

    return (
        <div className="mt-5 max-w-[1320px] mx-auto">
            <h1 className="text-center text-xl font-semibold italic mt-10">
                Contact Us / Visit Us
            </h1>
            <div className="rounded-xl grid grid-cols-1 my-10 md:gap-5 mx-3 xl:mx-0 md:grid-cols-2 text-gray-800">
                <div className="flex flex-col gap-2 md:gap-5">
                    <p className="font-medium">
                        If you have any questions, concerns, or need assistance
                        with anything related to our products or services,
                        please don&apos;t hesitate to contact us.
                    </p>
                    <div className="md:text-lg lg:text-xl xl:text-2xl">
                        <h1 className="text-sky-500 font-bold">
                            <span className="font-semibold text-gray-400">
                                Company Name:
                            </span>{" "}
                            MENVERSE
                        </h1>
                        <h3>
                            <span className="font-semibold text-gray-400">
                                Official Number:
                            </span>{" "}
                            <a
                                className="underline"
                                href="tel:+880 1328-369000"
                            >
                                +880 1328-369000
                            </a>
                        </h3>
                        <h3>
                            <span className="font-semibold text-gray-400">
                                Email Address:
                            </span>{" "}
                            <a
                                className="underline"
                                href="mailto:urbanfits23@gmail.com"
                            >
                                urbanfits23@gmail.com
                            </a>
                        </h3>
                    </div>
                    <p className="md:text-lg lg:text-xl xl:text-2xl">
                        <span className="font-semibold text-gray-400">
                            Office Address:
                        </span>{" "}
                        3rd Floor, House: 27, Road: 12, PC Culture Housing
                        Society, Shekhertek, Adabor, Mohammadpur, Dhaka-1207 (
                        Mohammadpur Grace International School )
                    </p>
                </div>
                <p className="text-center mt-10 pb-5 text-sm text-gray-400 md:hidden">
                    Send us a message
                </p>
                <form
                    ref={form}
                    onSubmit={sendEmail}
                    className="space-y-2 border rounded-lg md:space-y-5 p-3 md:p-5 lg:p-10 w-full"
                >
                    <div>
                        <label className="text-sm">Full name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name here..."
                            className="w-full rounded-lg p-2 border border-gray-50 bg-gray-50 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-sm">Email</label>
                        <input
                            type="email"
                            name="reply_to"
                            placeholder="Enter your email here..."
                            className="w-full p-2 border border-gray-50 rounded-lg bg-gray-50 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-sm">Message</label>
                        <textarea
                            name="message"
                            placeholder="Enter your description here..."
                            className="w-full p-2 border border-gray-50 rounded-lg bg-gray-50 focus:outline-none"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full btn p-2 text-sm font-bold uppercase rounded-lg border-2 border-[#66bdff] bg-[#66bdff] transition-colors duration-300 text-gray-50"
                    >
                        Send Message
                    </button>
                </form>
            </div>
            {/* location map */}
            <h1 className="text-center text-xl font-semibold italic mt-10">
                Find us on map
            </h1>
            <div className="my-10 mx-3 xl:mx-0">
                <iframe
                    className="w-full h-[250px] md:h-[350px] lg:h-[400px] rounded-xl mt-1"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.365854150828!2d90.35289977602339!3d23.769982988023067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c098bcb782e9%3A0x2cbb44aa4e5d3198!2sMohammadpur%20Grace%20International%20School%20%26%20College!5e0!3m2!1sen!2sbd!4v1734124883516!5m2!1sen!2sbd"
                    style={{ border: "0" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
};

export default ContactUs;
