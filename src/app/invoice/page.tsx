"use client";

import InvoiceTableRow from "@/components/invoice/InvoiceTableRow";
import { Button } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

const InvoicePage = () => {
    const { push } = useRouter();
    const [orderData, setOrderData] = useState<any>({});
    const {
        customerId,
        totalPrice,
        deliveryCharge,
        orderDate,
        paymentMethod,
        customer,
    } = orderData;
    useEffect(() => {
        const data = localStorage.getItem("orderData");
        if (data) {
            const parsedData = JSON.parse(data);
            console.log(parsedData);
            setOrderData(parsedData);
        }
    }, []);

    const componentRef = useRef(null);
    const reactToPrintFn = useReactToPrint({
        contentRef: componentRef,
        documentTitle: `${customer?.name}_${customerId}`,
    });
    const printPDF = useCallback(() => {
        reactToPrintFn();
    }, [reactToPrintFn]);

    const handleNavigateToOrders = () => {
        push("/admin/orders");
    };

    return (
        <div className="max-w-[850px] lg:border lg:border-[#ccc] rounded lg:mt-10 mx-auto">
            <div
                ref={componentRef}
                className="max-w-[794px] mx-auto my-auto p-5 sm:p-8"
                style={{
                    fontFamily: "Arial, sans-serif",
                    // border: "1px solid #ccc",
                }}
            >
                <h1 style={{ textAlign: "center" }}>Invoice</h1>
                <section
                    style={{
                        marginBottom: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div>
                        <h2>Company Details</h2>
                        <p>
                            <strong>MENVERSE</strong>
                        </p>
                        <p>Dhaka, Bangladesh</p>
                        <p>Phone: +880 1328-369000</p>
                        <p>Email: urbanfits23@gmail.com</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <Image
                            src="/Images/logo.png"
                            height={500}
                            width={500}
                            alt="logo"
                            className="w-[100px]"
                        />
                        <strong className="-mt-4 text-gray-400">
                            ID# ${customerId}
                        </strong>
                    </div>
                </section>

                <section
                    style={{
                        marginBottom: "20px",
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "space-between",
                    }}
                >
                    <div className="md:w-[60%]">
                        <h2>Customer Details</h2>
                        <p>
                            <strong>{customer?.name}</strong>
                        </p>
                        <p>{customer?.address}</p>
                        <p>Phone: {customer?.phone}</p>
                    </div>
                    <div className="text-nowrap">
                        <h3>
                            {typeof orderDate === "string"
                                ? new Date(orderDate).toLocaleDateString(
                                      "en-US",
                                      {
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                      }
                                  )
                                : "Invalid date"}
                        </h3>
                        <p>
                            {paymentMethod === "CASHON" && "Cash on delivery"}
                        </p>
                        <p>All over Bangladesh</p>
                    </div>
                </section>

                <section>
                    <h2>Products</h2>
                    <div
                        style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                        className="overflow-x-scroll"
                    >
                        <table
                            className="text-center text-nowrap"
                            style={{
                                width: "100%",
                                borderCollapse: "collapse",
                                marginBottom: "20px",
                            }}
                        >
                            <thead>
                                <tr>
                                    <th
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "4px",
                                        }}
                                    >
                                        Serial
                                    </th>
                                    <th
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "4px",
                                        }}
                                    >
                                        Image
                                    </th>
                                    <th
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "4px",
                                        }}
                                    >
                                        Product Name
                                    </th>
                                    <th
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "4px",
                                        }}
                                    >
                                        Size
                                    </th>
                                    <th
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "4px",
                                        }}
                                    >
                                        Previous Price
                                    </th>
                                    <th
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "4px",
                                        }}
                                    >
                                        Offer Price
                                    </th>
                                    <th
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "4px",
                                        }}
                                    >
                                        Quantity
                                    </th>
                                    <th
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "4px",
                                        }}
                                    >
                                        Total Price
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderData &&
                                    orderData?.items?.map(
                                        (product: any, index: number) => (
                                            <InvoiceTableRow
                                                key={index}
                                                productData={product}
                                                index={index}
                                            />
                                        )
                                    )}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="flex justify-end">
                    <table style={{ width: "70%", borderCollapse: "collapse" }}>
                        <tbody>
                            <tr>
                                <td
                                    style={{
                                        padding: "4px",
                                        textAlign: "right",
                                    }}
                                >
                                    Subtotal:
                                </td>
                                <td
                                    style={{
                                        padding: "4px",
                                        textAlign: "right",
                                    }}
                                >
                                    {totalPrice} /-
                                </td>
                            </tr>
                            <tr>
                                <td
                                    style={{
                                        padding: "4px",
                                        textAlign: "right",
                                    }}
                                >
                                    Delivery Charge:
                                </td>
                                <td
                                    style={{
                                        padding: "4px",
                                        textAlign: "right",
                                    }}
                                >
                                    {deliveryCharge} /-
                                </td>
                            </tr>
                            <tr>
                                <td
                                    style={{
                                        padding: "4px",
                                        textAlign: "right",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Total:
                                </td>
                                <td
                                    style={{
                                        padding: "4px",
                                        textAlign: "right",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {totalPrice + deliveryCharge} /-
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                <p className="italic mt-10 font-medium">
                    &quot;Keep shopping from MENVERSE&quot;
                </p>
            </div>
            <div className="flex justify-center items-center gap-5 mb-4 print:hidden">
                <Button
                    className="print:hidden"
                    size="large"
                    type="primary"
                    onClick={printPDF}
                >
                    Print PDF
                </Button>
                <Button
                    onClick={handleNavigateToOrders}
                    className="print:hidden"
                    size="large"
                >
                    Go to Orders
                </Button>
            </div>
        </div>
    );
};

export default InvoicePage;
