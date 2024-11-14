import { Button } from "antd";
import { FaTrash } from "react-icons/fa";

type CategoryType = {
    id: number;
    categoryId: number;
    name: string;
    description: string;
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
            <td>{description}</td>
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
