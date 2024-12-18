"use client";

import React from "react";
import InvoiceTableItem from "./InvoiceTableItem";


const InvoiceTableRow = ({
    productData,
    index,
}: {
    productData: any;
    index: number;
}) => {
    const { productId, quantity, size, price, discount_price } = productData;

    console.log(productData);

    return (
        <tr key={index}>
            <th
                style={{
                    border: "1px solid #ddd",
                    padding: "4px",
                    textAlign: "center",
                }}
            >
                {index + 1}
            </th>
            {<InvoiceTableItem productId={productId} />}

            <td
                style={{
                    border: "1px solid #ddd",
                    padding: "4px",
                }}
            >
                {size}
            </td>
            <td
                style={{
                    border: "1px solid #ddd",
                    padding: "4px",
                }}
            >
                {price}
            </td>
            <td
                style={{
                    border: "1px solid #ddd",
                    padding: "4px",
                }}
            >
                {discount_price || price}
            </td>
            <td
                style={{
                    border: "1px solid #ddd",
                    padding: "4px",
                }}
            >
                {quantity}
            </td>
            <td
                style={{
                    border: "1px solid #ddd",
                    padding: "4px",
                }}
            >
                {price * quantity}
            </td>
        </tr>
    );
};

export default InvoiceTableRow;
