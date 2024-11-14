"use client";

import { createContext, useState, useContext } from "react";

const CategoryContext = createContext({
    categoryName: "", // Default value for the category name
    setCategoryName: (name: string) => {}, // Function to update the category name
});

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [categoryName, setCategoryName] = useState("");

    return (
        <CategoryContext.Provider value={{ categoryName, setCategoryName }}>
            {children}
        </CategoryContext.Provider>
    );
};

// Custom hook to use the CategoryContext
export const useCategory = () => useContext(CategoryContext);

export default CategoryProvider;
