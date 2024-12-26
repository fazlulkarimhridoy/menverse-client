import { Button, Modal } from "antd";
import { useState } from "react";
import OrderItem from "./OrderItem";
import { FaFilePdf, FaListAlt, FaListUl, FaTruck } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

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
    deliveryCharge: number;
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
    courierDetails: {
        courierName: string;
        consignment_id: number;
        invoice: string;
        tracking_code: string;
    };
};

const OrderRow = ({
    orderData,
    handleOrderStatus,
    refetch,
}: {
    orderData: OrderType;
    handleOrderStatus: Function;
    refetch: Function;
}) => {
    // states and calls
    const {
        id,
        customerId,
        totalPrice,
        deliveryCharge,
        orderDate,
        orderStatus,
        paymentMethod,
        items,
        customer,
        note,
        courierDetails,
    } = orderData;
    const router = useRouter();
    const { push } = router;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModal1Open, setIsModal1Open] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const onClose = () => {
        setIsModalOpen(false);
    };

    const showModal1 = () => {
        setIsModal1Open(true);
    };
    const onClose1 = () => {
        setIsModal1Open(false);
    };

    // navigate to invoice
    const handleToInvoice = () => {
        localStorage.setItem("orderData", JSON.stringify(orderData));
        push("/invoice");
    };

    // get delivery status
    const { data: courierStatus, refetch: statusRefetch } = useQuery({
        queryKey: ["deliveryStatus", courierDetails?.consignment_id],
        queryFn: async () => {
            const id = courierDetails?.consignment_id;
            const response = await axios.get(`${process.env.NEXT_PUBLIC_COURIER_BASE_URL}/status_by_cid/${id}`, {
                headers: {
                    "Api-Key": `${process.env.NEXT_PUBLIC_COURIER_API_KEY}`,
                    "Secret-Key": `${process.env.NEXT_PUBLIC_COURIER_SECRET_KEY}`,
                    "Content-Type": "application/json",
                },
            });
            return response.data.delivery_status;
        },
        retry: 2,
        refetchOnWindowFocus: false,
        enabled: courierDetails ? true : false,
    });

    // add to steadfast courier
    const handleAddToCourer = async () => {
        // 6 digit random number generator like this 123564
        const randomInvoiceId = Math.floor(Math.random() * 1000000) + 100000;
        const randomInvoiceIdString = randomInvoiceId.toString();
        const data = {
            invoice: randomInvoiceIdString,
            recipient_name: customer?.name,
            recipient_phone: customer?.phone,
            recipient_address: customer?.address,
            cod_amount: totalPrice + deliveryCharge,
        };
        console.log("courierDataInfo", data);
        try {
            // create courier order
            const response = await axios.post(`${process.env.NEXT_PUBLIC_COURIER_BASE_URL}/create_order`, data, {
                headers: {
                    "Api-Key": `${process.env.NEXT_PUBLIC_COURIER_API_KEY}`,
                    "Secret-Key": `${process.env.NEXT_PUBLIC_COURIER_SECRET_KEY}`,
                    "Content-Type": "application/json",
                },
            });

            // update order data
            const orderUpdateData = {
                courierName: "Steadfast",
                consignment_id: response.data.consignment.consignment_id,
                invoice: response.data.consignment.invoice,
                tracking_code: response.data.consignment.tracking_code,
            };
            // check if added to courier
            if (response.data.status === 200) {
                // update order with courier details
                await axios.patch(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/update-order/${id}`,
                    { courierDetails: orderUpdateData },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                refetch();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${response.data.message}`,
                    showConfirmButton: false,
                    timer: 1500,
                });
                statusRefetch();
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // tailwind css class to give bg color and text color to the status button
    const getButtonClass = (status: string) => {
        switch (status) {
            case "in_review":
                return "text-orange-500 bg-orange-500/10";
            case "pending":
                return "text-yellow-500 bg-yellow-500/10";
            case "delivered":
                return "text-green-500 bg-green-500/10";
            case "partial_delivered":
                return "text-green-500 bg-green-500/10";
            case "cancelled":
                return "text-red-500 bg-red-500/10";
            case "hold":
                return "text-sky-500 bg-sky-500/10";
            case "unknown":
                return "text-red-500 bg-red-500/10";
            case "delivered_approval_pending":
                return "text-green-500 bg-green-500/10";
            case "partial_delivered_approval_pending":
                return "text-green-500 bg-green-500/10";
            case "cancelled_approval_pending":
                return "text-red-500 bg-red-500/10";
            case "unknown_approval_pending":
                return "text-red-500 bg-red-500/10";
            default:
                return "text-gray-500 bg-gray-500/10";
        }
    };

    // write a switch case to conditionally render the status button names
    const renderStatusButton = (status: string) => {
        switch (status) {
            case "in_review":
                return "In Review";
            case "pending":
                return "Pending";
            case "delivered":
                return "Delivered";
            case "partial_delivered":
                return "Partial Delivered";
            case "cancelled":
                return "Cancelled";
            case "hold":
                return "On Hold";
            case "unknown":
                return "Deleted";
            case "delivered_approval_pending":
                return "Delivered";
            case "partial_delivered_approval_pending":
                return "Delivered";
            case "cancelled_approval_pending":
                return "Cancelled";
            case "unknown_approval_pending":
                return "Deleted";
            default:
                return "No Entry";
        }
    };

    return (
        <tr>
            <th>{customerId}</th>
            <th>{customer?.name}</th>
            <th>{customer?.phone}</th>
            <td>{totalPrice}</td>
            <td>{deliveryCharge}</td>
            <td>{paymentMethod === "CASHON" ? "COD" : "Bkash"}</td>
            <td>
                <div>
                    {typeof orderDate === "string"
                        ? new Date(orderDate)
                              .toLocaleDateString("en-GB", {
                                  year: "numeric",
                                  day: "numeric",
                                  month: "numeric",
                              })
                              .split("/")
                              .join("-")
                        : "Invalid date"}
                </div>
            </td>
            <th>
                <Button className="text-sky-500 border-none bg-sky-500/10" onClick={showModal}>
                    <FaListUl /> Details
                </Button>
            </th>
            <td>
                <Button className="text-orange-500 border-none bg-orange-500/10" onClick={handleToInvoice}>
                    <FaFilePdf /> Invoice
                </Button>
            </td>
            <td>
                <Button
                    className="text-green-700 border-none bg-green-700/10"
                    disabled={courierDetails !== null}
                    onClick={handleAddToCourer}
                >
                    <FaTruck /> {courierDetails ? "Added" : "Courier"}
                </Button>
            </td>
            <th>
                <Button className="text-teal-500 border-none bg-teal-500/10" onClick={showModal1}>
                    <FaListAlt /> Info
                </Button>
            </th>
            <td>
                <Button type="text" className={`${getButtonClass(courierStatus)} border-none cursor-default`}>
                    {renderStatusButton(courierStatus)}
                </Button>
            </td>
            {/* <td>
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
            </td> */}

            {/* order details */}
            <Modal className="w-full" footer={false} open={isModalOpen} onCancel={onClose}>
                <div className="flex flex-col lg:flex-row justify-center gap-2">
                    <div className="w-full">
                        <h1 className="text-lg font-bold">Customer Details</h1>
                        <div className="bg-gray-100 rounded-xl mt-2 p-3">
                            <p className="flex gap-2">
                                <span className="font-semibold">Customer ID:</span> {customerId}
                            </p>
                            <p className="flex gap-2">
                                <span className="font-semibold">Name:</span> {customer?.name}
                            </p>
                            <p className="flex gap-2">
                                <span className="font-semibold">Phone:</span> {customer?.phone}
                            </p>
                            <p className="flex gap-2">
                                <span className="font-semibold">Address:</span> {customer?.address}
                            </p>
                            <p className="flex gap-2">
                                <span className="font-semibold">Note:</span> {note}
                            </p>
                        </div>
                    </div>
                    <div className="w-full">
                        <h1 className="text-lg font-bold">Order Details</h1>
                        {items?.map((item: any, index: number) => (
                            <OrderItem key={index} item={item} />
                        ))}
                    </div>
                </div>
                <div className="mt-2">
                    <p className="text-lg font-bold">
                        Total Price: <span className="text-red-500">{totalPrice + deliveryCharge}</span> Taka
                    </p>
                </div>
            </Modal>

            {/* courier info */}
            <Modal className="w-full" footer={false} open={isModal1Open} onCancel={onClose1}>
                <div className="w-full">
                    <div>
                        <h1 className="text-lg font-bold">Courier Info</h1>
                    </div>
                    <div className="bg-gray-100 rounded-xl mt-2 p-3 relative">
                        <p className="flex gap-2">
                            <span className="font-semibold">Courier Name:</span>{" "}
                            {courierDetails?.courierName || "No entry yet"}
                        </p>
                        <p className="flex gap-2 text-sky-500">
                            <span className="font-semibold text-black">Consignment Id:</span> #
                            {courierDetails?.consignment_id || "No entry yet"}
                        </p>
                        <p className="flex gap-2">
                            <span className="font-semibold">Invoice:</span> #{courierDetails?.invoice || "No entry yet"}
                        </p>
                        <p className="flex gap-2">
                            <span className="font-semibold">Tracking Code:</span> #
                            {courierDetails?.tracking_code || "No entry yet"}
                        </p>
                        <Button
                            type="text"
                            className={`${getButtonClass(
                                courierStatus
                            )} border-none cursor-default absolute top-2 right-2`}
                        >
                            {renderStatusButton(courierStatus)}
                        </Button>
                    </div>
                    <p className="mt-5">
                        Live tracking:{" "}
                        {courierDetails ? (
                            <a
                                className="underline text-blue-500 font-semibold"
                                href={`https://steadfast.com.bd/t/${courierDetails?.tracking_code}`}
                            >{`https://steadfast.com.bd/t/${courierDetails?.tracking_code}`}</a>
                        ) : (
                            "No entry yet"
                        )}
                    </p>
                </div>
            </Modal>
        </tr>
    );
};

export default OrderRow;
