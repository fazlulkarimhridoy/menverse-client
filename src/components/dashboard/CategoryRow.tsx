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
                    <Button className="bg-orange-500/10 text-orange-500 border-none">
                        <FaTools /> Update
                    </Button>
                </Link>
            </td>
            <td>
                <Button
                className="bg-red-500/10 text-red-500 border-none"
                    onClick={() => handleDeleteCategory(id)}
                >
                    <FaTrash /> Delete
                </Button>
            </td>
        </tr>
    );
};

export default CategoryRow;
