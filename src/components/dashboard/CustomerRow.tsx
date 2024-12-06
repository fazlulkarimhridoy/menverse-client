import { Button } from "antd";
import { FaTrash } from "react-icons/fa";

interface CustomerType {
    id: number;
    customerId: number;
    name: string;
    phone: string;
    address: string;
    createdAt: string;
}

const CustomerRow = ({
    customerData,
}: {
    customerData: CustomerType;
}) => {
    const { id, customerId, name, phone, address, createdAt } = customerData;

    return (
        <tr>
            <th>{id}</th>
            <th>{customerId}</th>
            <td>
                <div className="text-gray-600 font-bold">{name}</div>
            </td>
            <td>{phone}</td>
            <td>{address}</td>
            <td><div>
                    {typeof createdAt === "string"
                        ? new Date(createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                          })
                        : "Invalid date"}
                </div></td>
        </tr>
    );
};

export default CustomerRow;
