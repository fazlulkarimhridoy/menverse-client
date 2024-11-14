"use client";

import { createContext, useState, useContext } from "react";

const SearchTextContext = createContext({
    searchText: "", // Default value for the search text
    setSearchText: (name: string) => {}, // Function to update the search text
});

export const SearchTextProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [searchText, setSearchText] = useState("");

    return (
        <SearchTextContext.Provider value={{ searchText, setSearchText }}>
            {children}
        </SearchTextContext.Provider>
    );
};

// Custom hook to use the CategoryContext
export const useSearchText = () => useContext(SearchTextContext);

export default SearchTextProvider;
