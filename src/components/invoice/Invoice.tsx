import { Button } from "antd";
import Image from "next/image";
import React, { useCallback, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";

const companyDetails = {
    name: "T-Shirt Co.",
    address: "123 Fashion St, Style City",
    phone: "123-456-7890",
    email: "contact@tshirtco.com",
};

const customerDetails = {
    name: "John Doe",
    address: "456 Main St, Yourtown",
    phone: "987-654-3210",
    email: "john.doe@example.com",
};

const products = [
    {
        id: 1,
        name: "Graphic Tee",
        image: "/Images/delivery.jpg",
        price: 19.99,
        quantity: 2,
        size: "XL",
    },
    {
        id: 2,
        name: "Plain White Tee",
        image: "/Images/choose.jpg",
        price: 9.99,
        quantity: 3,
        size: "M",
    },
];

const deliveryCharge = 60;

interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
    size: string;
}

interface InvoiceProps {
    companyDetails: {
        name: string;
        address: string;
        phone: string;
        email: string;
    };
    customerDetails: {
        name: string;
        address: string;
        phone: string;
        email: string;
    };
    products: Product[];
    deliveryCharge: number;
}

const Invoice = () => {
    const componentRef = useRef(null);
    const reactToPrintFn = useReactToPrint({
        contentRef: componentRef,
        documentTitle: "AwesomeFileName",
    });

    // useEffect(() => {
    //     reactToPrintFn();
    // }, [reactToPrintFn]);

    const printPDF = useCallback(() => {
        reactToPrintFn();
    }, [reactToPrintFn]);

    const calculateSubTotal = () => {
        return products.reduce(
            (total, product) => total + product.price * product.quantity,
            0
        );
    };

    const subTotal = calculateSubTotal();
    const totalPrice = subTotal + deliveryCharge;

    return (
        <div>
            <div
                ref={componentRef}
                className="max-w-[794px] max-h-[1123px] mx-auto my-auto"
                style={{
                    fontFamily: "Arial, sans-serif",
                    padding: "20px",
                    // border: "1px solid #ccc",
                }}
            >
                <h1 className="italic" style={{ textAlign: "center" }}>Invoice</h1>

                <section style={{ marginBottom: "20px" }}>
                    <h2>Company Details</h2>
                    <p>
                        <strong>{companyDetails.name}</strong>
                    </p>
                    <p>{companyDetails.address}</p>
                    <p>Phone: {companyDetails.phone}</p>
                    <p>Email: {companyDetails.email}</p>
                </section>

                <section style={{ marginBottom: "20px" }}>
                    <h2>Customer Details</h2>
                    <p>
                        <strong>{customerDetails.name}</strong>
                    </p>
                    <p>{customerDetails.address}</p>
                    <p>Phone: {customerDetails.phone}</p>
                    <p>Email: {customerDetails.email}</p>
                </section>

                <section>
                    <h2>Products</h2>
                    <table
                        className="text-center"
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
                                        padding: "8px",
                                    }}
                                >
                                    Image
                                </th>
                                <th
                                    style={{
                                        border: "1px solid #ddd",
                                        padding: "8px",
                                    }}
                                >
                                    Name
                                </th>
                                <th
                                    style={{
                                        border: "1px solid #ddd",
                                        padding: "8px",
                                    }}
                                >
                                    Size
                                </th>
                                <th
                                    style={{
                                        border: "1px solid #ddd",
                                        padding: "8px",
                                    }}
                                >
                                    Price
                                </th>
                                <th
                                    style={{
                                        border: "1px solid #ddd",
                                        padding: "8px",
                                    }}
                                >
                                    Quantity
                                </th>
                                <th
                                    style={{
                                        border: "1px solid #ddd",
                                        padding: "8px",
                                    }}
                                >
                                    Total
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "8px",
                                            textAlign: "center",
                                        }}
                                    >
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            width={500}
                                            height={500}
                                            quality={80}
                                            style={{
                                                width: "50px",
                                                height: "50px",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "8px",
                                        }}
                                    >
                                        {product.name}
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "8px",
                                        }}
                                    >
                                        {product.size}
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "8px",
                                        }}
                                    >
                                        ${product.price.toFixed(2)}
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "8px",
                                        }}
                                    >
                                        {product.quantity}
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "8px",
                                        }}
                                    >
                                        $
                                        {(
                                            product.price * product.quantity
                                        ).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <section>
                    <h2>Summary</h2>
                    <table
                        style={{ width: "100%", borderCollapse: "collapse" }}
                    >
                        <tbody>
                            <tr>
                                <td
                                    style={{
                                        padding: "8px",
                                        textAlign: "right",
                                    }}
                                >
                                    Subtotal:
                                </td>
                                <td
                                    style={{
                                        padding: "8px",
                                        textAlign: "right",
                                    }}
                                >
                                    ${subTotal.toFixed(2)}
                                </td>
                            </tr>
                            <tr>
                                <td
                                    style={{
                                        padding: "8px",
                                        textAlign: "right",
                                    }}
                                >
                                    Delivery Charge:
                                </td>
                                <td
                                    style={{
                                        padding: "8px",
                                        textAlign: "right",
                                    }}
                                >
                                    ${deliveryCharge.toFixed(2)}
                                </td>
                            </tr>
                            <tr>
                                <td
                                    style={{
                                        padding: "8px",
                                        textAlign: "right",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Total:
                                </td>
                                <td
                                    style={{
                                        padding: "8px",
                                        textAlign: "right",
                                        fontWeight: "bold",
                                    }}
                                >
                                    ${totalPrice.toFixed(2)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
            <div className="flex justify-end">
                <Button onClick={printPDF}
                >
                    Print PDF
                </Button>
            </div>
        </div>
    );
};

export default Invoice;
