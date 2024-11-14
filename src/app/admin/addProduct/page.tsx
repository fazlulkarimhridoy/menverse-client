"use client";

import { PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import {
    Button,
    Form,
    FormInstance,
    FormProps,
    GetProp,
    Image,
    Input,
    InputNumber,
    message,
    Select,
    Spin,
    Upload,
    UploadFile,
    UploadProps,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const { Option } = Select;

// types
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
type FieldType = {
    product_name: string;
    price: number;
    discounted_price: number;
    stock: number;
    category: string;
    description: string;
    rating: number;
    productId: number;
    images: JSON;
};

type CategoryType = {
    id: number;
    name: string;
    description: string;
};

// base64 encoding
const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

// base64 without promise
const getNewBase64 = (
    file: FileType,
    callback: (result: string | null) => void
) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => callback(reader.result as string);
    reader.onerror = () => callback(null);
};

const AddProduct = () => {
    const [loading, setLoading] = useState(false);
    // check if user is logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
        }
    }, []);

    // states and calls
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [imageArray, setImageArray] = useState([]);
    const formRef = React.useRef<FormInstance<FieldType>>(null);

    // handle preview
    const handlePreview = async (file: UploadFile) => {
        console.log("file from preview", file);
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        const dataUrl = await getBase64(file.originFileObj as FileType);
        console.log("dataUrl", dataUrl);

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    // handle file change
    const handleChange: UploadProps["onChange"] = ({
        fileList: newFileList,
    }) => {
        setFileList(newFileList);
        const dataUrlArray: any = []; // Array to store the results
        let completedRequests = 0; // To track completed requests

        newFileList.forEach((file, index) => {
            getNewBase64(file.originFileObj as FileType, (result) => {
                if (result) {
                    dataUrlArray[index] = result; // Store result at the correct index
                } else {
                    console.error("Failed to convert file to base64.");
                    dataUrlArray[index] = null; // Or handle the error as needed
                }

                // Increment the completed requests counter
                completedRequests++;

                // Once all requests have completed
                if (completedRequests === fileList.length) {
                    const finalResult = dataUrlArray.filter(Boolean).join(","); // Join non-null results with commas
                    console.log("Final Base64 String:", finalResult);
                }
            });
        });
        setImageArray(dataUrlArray);
    };

    // image upload button
    const uploadButton = (
        <button style={{ border: 0, background: "none" }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    // handle form submission finish
    const onFinish: FormProps<FieldType>["onFinish"] = async (values: any) => {
        setLoading(true);
        const product_name = values.product_name;
        const price = values.price;
        const discount_price = values.discounted_price;
        const stock = values.stock;
        const category = values.category;
        const description = values.description;
        const rating = values.rating;
        const productId = values.productId;
        const images = imageArray;

        // Extract the selected category ID
        const selectedCategoryId =
            allCategories?.length > 0 &&
            allCategories?.find((cat) => cat.name === category)?.id;

        if (!selectedCategoryId) {
            setLoading(false);
            message.error("Category not found");
            return;
        }

        const productData = {
            product_name,
            price,
            discount_price,
            stock,
            category,
            description,
            rating,
            productId,
            images,
            categoryId: selectedCategoryId,
        };

        console.log(productData);

        await axios
            .post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/add-product`,
                productData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((data) => {
                if (data.data.status == "success") {
                    setLoading(false);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Successfully added product!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    // clear form values
                    formRef.current?.resetFields();
                    setFileList([]);
                }
            })
            .catch((error) => {
                setLoading(false);
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Product upload failed!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                console.log(error);
            });
    };

    // handle form submission failure
    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
        errorInfo
    ) => {
        console.log("Failed:", errorInfo);
    };

    // fetch category from server
    const { data: allCategories = [], isLoading } = useQuery<CategoryType[]>({
        queryKey: ["allCategories"],
        queryFn: async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/all-category`
            );
            return res.data.data;
        },
        retry: 2,
        refetchOnWindowFocus: false,
    });

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
                <h3 className="text-center pt-2 text-blue-200 text-4xl font-bold">
                    Add Product
                </h3>
            </div>
            <div className="mt-5 w-[90%] 2xl:w-[65%] mx-auto relative">
                <Form
                    initialValues={{ remember: false }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="vertical"
                    ref={formRef}
                >
                    {/* product name */}
                    <div className="flex items-center gap-10">
                        <Form.Item<FieldType>
                            className="w-full"
                            label="Product Name"
                            name="product_name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter name!",
                                },
                            ]}
                        >
                            <Input
                                className="w-full"
                                placeholder="Enter product name..."
                                size="large"
                            />
                        </Form.Item>
                    </div>

                    {/* price & discounted price */}
                    <div className="flex items-center gap-2 md:gap-10">
                        <Form.Item<FieldType>
                            className="w-full"
                            label="Price"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter price!",
                                },
                            ]}
                        >
                            <InputNumber
                                className="w-full"
                                placeholder="Enter price..."
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item<FieldType>
                            className="w-full"
                            label="Discounted Price"
                            name="discounted_price"
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: "Please enter discounted price!",
                            //     },
                            // ]}
                        >
                            <InputNumber
                                className="w-full"
                                placeholder="Enter discounted..."
                                size="large"
                            />
                        </Form.Item>
                    </div>

                    {/* stock & category */}
                    <div className="flex flex-col md:flex-row items-center md:gap-10">
                        <Form.Item<FieldType>
                            className="w-full"
                            label="Stock"
                            name="stock"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter stock!",
                                },
                            ]}
                        >
                            <InputNumber
                                className="w-full"
                                placeholder="Enter stock..."
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item<FieldType>
                            className="w-full"
                            label="Product Category"
                            name="category"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: "Please select category!",
                                },
                            ]}
                        >
                            <Select
                                className="w-full"
                                placeholder="Select category..."
                                size="large"
                            >
                                {allCategories?.length > 0 &&
                                    allCategories?.map((item) => (
                                        <Option
                                            key={item?.id}
                                            value={item?.name}
                                        >
                                            {item?.name}
                                        </Option>
                                    ))}
                            </Select>
                        </Form.Item>
                    </div>

                    {/* rating & product id */}
                    <div className="flex items-center gap-2 md:gap-10">
                        <Form.Item<FieldType>
                            className="w-full"
                            label="Rating"
                            name="rating"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter rating!",
                                },
                            ]}
                        >
                            <InputNumber
                                className="w-full"
                                placeholder="Enter rating (1~5)"
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item<FieldType>
                            className="w-full"
                            label="Product Id"
                            name="productId"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please enter product id as number!",
                                },
                            ]}
                        >
                            <InputNumber
                                className="w-full"
                                placeholder="Enter product id..."
                                size="large"
                                maxLength={4}
                            />
                        </Form.Item>
                    </div>

                    {/* description */}
                    <div className="flex items-center gap-10">
                        <Form.Item<FieldType>
                            className="w-full"
                            label="Product Description"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter description!",
                                },
                            ]}
                        >
                            <TextArea
                                minLength={150}
                                maxLength={300}
                                rows={4}
                                className="w-full"
                                placeholder="Enter product description..."
                                size="large"
                            />
                        </Form.Item>
                    </div>

                    {/* upload images */}
                    <div className="flex items-center gap-10">
                        <Form.Item<FieldType>
                            label="Upload Five Images (Size: 1080px*1080px)"
                            required
                            valuePropName="fileList"
                            name="images"
                        >
                            <Upload
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleChange}
                            >
                                {fileList.length >= 5 ? null : uploadButton}
                            </Upload>
                            {previewImage && (
                                <Image
                                    alt="upload-images"
                                    wrapperStyle={{ display: "none" }}
                                    preview={{
                                        visible: previewOpen,
                                        onVisibleChange: (visible) =>
                                            setPreviewOpen(visible),
                                        afterOpenChange: (visible) =>
                                            !visible && setPreviewImage(""),
                                    }}
                                    src={previewImage}
                                />
                            )}
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
                                Submit
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default AddProduct;
