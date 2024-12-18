import { Button, Modal } from "antd";
import { useState } from "react";
import OrderItem from "./OrderItem";
import { FaFilePdf } from "react-icons/fa";
import { useRouter } from "next/navigation";

const statusOptions = [
    {
        value: "PENDING",
        label: "PENDING",
    },
    {
        value: "SHIPPED",
        label: "SHIPPED",
    },
    {
        value: "DELIVERED",
        label: "DELIVERED",
    },
    {
        value: "CANCELLED",
        label: "CANCELLED",
    },
];

type OrderType = {
    id: number;
    customerId: number;
    totalPrice: number;
    orderStatus: string;
    orderDate: string;
    orderTime: string;
    paymentMethod: string;
    items: string[];
    customer: {
        name: string;
        phone: string;
        address: string;
        customerId: string;
    };
    note: string;
};

const OrderRow = ({
    orderData,
    handleOrderStatus,
}: {
    orderData: OrderType;
    handleOrderStatus: Function;
}) => {
    // states and calls
    const router = useRouter();
    const { push } = router;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const onClose = () => {
        setIsModalOpen(false);
    };
    const {
        id,
        customerId,
        totalPrice,
        orderDate,
        orderStatus,
        paymentMethod,
        items,
        customer,
        note,
    } = orderData;

    // navigate to invoice
    const handleToInvoice = () => {
        localStorage.setItem("orderData", JSON.stringify(orderData));
        push("/invoice");
    };

    return (
        <tr>
            <th>{customerId}</th>
            <th>{customer?.name}</th>
            <th>{customer?.phone}</th>
            <td>{totalPrice}</td>
            <td>{paymentMethod === "CASHON" ? "Cash On Delivery" : "Bkash"}</td>
            <td>
                <div>
                    {typeof orderDate === "string"
                        ? new Date(orderDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                          })
                        : "Invalid date"}
                </div>
            </td>
            <th>
                <Button onClick={showModal}>Oder Details</Button>
            </th>
            {/* <td>{orderStatus}</td> */}
            <td>
                <select
                    style={{ width: 130 }}
                    className={`${
                        orderStatus === "PENDING" && "bg-yellow-100"
                    } ${orderStatus === "SHIPPED" && "bg-blue-100"} ${
                        orderStatus === "DELIVERED" && "bg-green-100"
                    } ${
                        orderStatus === "CANCELLED" && "bg-red-100"
                    } w-full px-3 py-1 rounded-md border border-gray-300 cursor-pointer hover:border-blue-500 hover:text-blue-500`}
                    onChange={(e) => {
                        handleOrderStatus(id, e.target.value);
                        console.log(e.target.value);
                    }}
                    defaultValue={orderStatus}
                >
                    {statusOptions?.map((option) => (
                        <option
                            className="bg-white"
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
            </td>
            <td className="mt-2">
                <Button onClick={handleToInvoice}>
                    <FaFilePdf /> Invoice
                </Button>
            </td>
            <Modal
                className="w-full"
                footer={false}
                open={isModalOpen}
                onCancel={onClose}
            >
                <div className="flex flex-col lg:flex-row justify-center gap-2">
                    <div className="w-full">
                        <h1 className="text-lg font-bold">Customer Details</h1>
                        <div className="bg-gray-100 rounded-xl mt-2 p-3">
                            <p className="flex gap-2">
                                <span className="font-semibold">
                                    Customer ID:
                                </span>{" "}
                                {customerId}
                            </p>
                            <p className="flex gap-2">
                                <span className="font-semibold">Name:</span>{" "}
                                {customer?.name}
                            </p>
                            <p className="flex gap-2">
                                <span className="font-semibold">Phone:</span>{" "}
                                {customer?.phone}
                            </p>
                            <p className="flex gap-2">
                                <span className="font-semibold">Address:</span>{" "}
                                {customer?.address}
                            </p>
                            <p className="flex gap-2">
                                <span className="font-semibold">Note:</span>{" "}
                                {note}
                            </p>
                        </div>
                    </div>
                    <div className="w-full">
                        <h1 className="text-lg font-bold">Order Details</h1>
                        {items?.map((item: any) => (
                            <OrderItem key={item?.id} item={item} />
                        ))}
                    </div>
                </div>
                <div className="mt-2">
                    <p className="text-lg font-bold">
                        Total Price:{" "}
                        <span className="text-red-500">{totalPrice}</span> Taka
                    </p>
                </div>
            </Modal>
        </tr>
    );
};

export default OrderRow;
