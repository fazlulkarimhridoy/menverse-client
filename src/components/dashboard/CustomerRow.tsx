import { Button } from "antd";
import { FaTrash } from "react-icons/fa";

interface CustomerType {
    id: number;
    customerId: number;
    name: string;
    email: string;
    phone: string;
    address: string;
}

const CustomerRow = ({
    customerData,
}: {
    customerData: CustomerType;
}) => {
    const { id, customerId, name, email, phone, address } = customerData;

    return (
        <tr>
            <th>{id}</th>
            <th>{customerId}</th>
            <td>
                <div className="text-gray-600 font-bold">{name}</div>
            </td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>{address}</td>
            
        </tr>
    );
};

export default CustomerRow;
