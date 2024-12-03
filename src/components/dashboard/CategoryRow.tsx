import { Button } from "antd";
import Link from "next/link";
import { FaTools, FaTrash } from "react-icons/fa";

type CategoryType = {
    id: number;
    categoryId: number;
    name: string;
    description: string;
};

const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - 3) + "...";
};

const CategoryRow = ({
    categoryData,
    index,
    handleDeleteCategory,
}: {
    categoryData: CategoryType;
    index: number;
    handleDeleteCategory: Function;
}) => {
    const { id, categoryId, name, description } = categoryData;
    return (
        <tr>
            <th>{index + 1}</th>
            <th>{categoryId}</th>
            <td>
                <div className="text-gray-600 font-bold">{name}</div>
            </td>
            <td className="truncate">{truncateText(description, 150)}</td>
            <td>
                <Link href={`/admin/categories/${id}`}>
                    <Button className="btn btn-circle btn-outline btn-sm">
                        <FaTools color="green" />
                    </Button>
                </Link>
            </td>
            <td>
                <Button
                    onClick={() => handleDeleteCategory(id)}
                    className="btn btn-circle btn-outline btn-sm"
                >
                    <FaTrash className="text-red-600"></FaTrash>
                </Button>
            </td>
        </tr>
    );
};

export default CategoryRow;
