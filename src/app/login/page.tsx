"use client";
import { Button, Form, FormProps, Input, Spin } from "antd";
import Password from "antd/es/input/Password";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";

// types
type LoginType = {
    email: string;
    password: string;
};

const LoginPage = () => {
    // states and calls
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { push } = router;

    // handle form submission finish
    const onFinish: FormProps<LoginType>["onFinish"] = async (values) => {
        setLoading(true);
        await axios
            .post(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, values, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            })
            .then((data) => {
                const token = data.data.token;
                if (token) {
                    localStorage.setItem("token", token);
                    setLoading(false);
                    push("/admin");
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Successfully logged in!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                } else {
                    setLoading(false);
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Invalid email or password!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            })
            .catch((error) => {
                setLoading(false);
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: `${error.data.message}`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            });
    };

    // handle form submission failed
    const onFinishFailed: FormProps<LoginType>["onFinishFailed"] = (
        errorInfo
    ) => {
        console.log("Failed:", errorInfo);
    };

    // show loader if data loads
    if (loading) {
        return (
            <Spin fullscreen={true} style={{ color: "white" }} size="large" />
        );
    }

    return (
        <div className="mt-60">
            <h1 className="text-center text-4xl font-bold">Admin Login</h1>
            <p className="text-gray-400 text-center text-sm font-thin mt-5 !italic">MENVERSE 👕</p>
            <Form
                className="mt-10 px-5 md:px-0"
                initialValues={{ remember: false }}
                autoComplete="off"
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                {/* email address */}
                <div className="flex items-center gap-10">
                    <Form.Item<LoginType>
                        className="w-full md:w-1/2 lg:w-1/4 mx-auto"
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please enter email address!",
                            },
                        ]}
                    >
                        <Input
                            className="w-full"
                            placeholder="Enter email address..."
                            size="large"
                            type="email"
                        />
                    </Form.Item>
                </div>

                {/* password */}
                <div className="flex items-center gap-2 md:gap-10">
                    <Form.Item<LoginType>
                        className="w-full md:w-1/2 lg:w-1/4 mx-auto"
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please enter category id!",
                            },
                        ]}
                    >
                        <Password
                            className="w-full"
                            placeholder="Enter password..."
                            size="large"
                        />
                    </Form.Item>
                </div>

                {/* submit button */}
                <div>
                    <Form.Item className="w-full md:w-1/2 lg:w-1/4 mx-auto">
                        <Button
                            className="w-full"
                            type="primary"
                            size="large"
                            htmlType="submit"
                        >
                            Login
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default LoginPage;
