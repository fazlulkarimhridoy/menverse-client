"use client";

import { useQuery } from "@tanstack/react-query";
import {
    Button,
    Form,
    FormInstance,
    FormProps,
    Input,
    InputNumber,
    Spin,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

// types
type CategoryType = {
    id: number;
    categoryId: number;
    name: string;
    description: string;
};

const UpdateCategory = ({ params }: { params: { slug: string } }) => {
    const [loading, setLoading] = useState(false);

    // check if user is logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
        }
    }, []);

    // get id from url param
    const idString = params?.slug;
    const id = Number(idString);

    const router = useRouter();
    const { push } = router;

    // fetch category details
    const { data: categoryDetails, isLoading } = useQuery({
        queryKey: ["categoryDetails", id],
        queryFn: async () => {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/details/${id}`
            );
            return response.data.data;
        },
    });

    // states and calls
    const formRef = React.useRef<FormInstance<CategoryType>>(null);

    // handle form submission finish
    const onFinish: FormProps<CategoryType>["onFinish"] = async (
        values: any
    ) => {
        setLoading(true);
        const name = values.name || categoryDetails?.name;
        const description = values.description || categoryDetails?.description;

        const categoryUpdateData = {
            name,
            description,
        };

        console.log(categoryUpdateData);

        await axios
            .patch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/update-category/${id}`,
                categoryUpdateData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((data) => {
                setLoading(false);
                if (data.data.status == "success") {
                    push("/admin/categories");
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Successfully updated category!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    };

    // handle form submission failure
    const onFinishFailed: FormProps<CategoryType>["onFinishFailed"] = (
        errorInfo
    ) => {
        console.log("Failed:", errorInfo);
    };

    // checking if loading
    if (isLoading) {
        return (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <progress className="progress w-56 bg-blue-200 h-4 lg:h-8 lg:w-80"></progress>
            </div>
        );
    }

    // show loader if uploads takes time
    if (loading) {
        return (
            <Spin fullscreen={true} style={{ color: "white" }} size="large" />
        );
    }

    return (
        <div>
            <div>
                <h3 className="text-center pt-4 text-blue-200 text-4xl font-bold">
                    Update Category
                </h3>
            </div>
            <div className="mt-5 w-[90%] 2xl:w-[65%] mx-auto relative">
                <Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="vertical"
                    ref={formRef}
                >
                    {/* category name */}
                    <div className="flex items-center gap-10">
                        <Form.Item<CategoryType>
                            className="w-full"
                            label="Category Name"
                            name="name"
                            initialValue={categoryDetails?.name}
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter category name!",
                                },
                            ]}
                        >
                            <Input
                                className="w-full"
                                placeholder="Enter category name..."
                                size="large"
                            />
                        </Form.Item>
                    </div>

                    {/* category id */}
                    <div className="flex items-center gap-2 md:gap-10">
                        <Form.Item<CategoryType>
                            className="w-full"
                            label="Category Id"
                            name="categoryId"
                            initialValue={categoryDetails?.categoryId}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please enter category id as number!",
                                },
                            ]}
                        >
                            <InputNumber
                                disabled
                                maxLength={4}
                                className="w-full"
                                placeholder="Enter category id..."
                                size="large"
                            />
                        </Form.Item>
                    </div>

                    {/* description */}
                    <div className="flex items-center gap-2 md:gap-10">
                        <Form.Item<CategoryType>
                            className="w-full"
                            label="Category Description"
                            name="description"
                            initialValue={categoryDetails?.description}
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter description!",
                                },
                            ]}
                        >
                            <TextArea
                                rows={4}
                                className="w-full"
                                placeholder="Enter category description..."
                                size="large"
                            />
                        </Form.Item>
                    </div>

                    {/* submit button */}
                    <div className="absolute right-0 w-full md:w-[50%] lg:w-[25%]">
                        <Form.Item className="w-full">
                            <Button
                                className="w-full"
                                type="primary"
                                size="large"
                                htmlType="submit"
                            >
                                Update
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default UpdateCategory;
