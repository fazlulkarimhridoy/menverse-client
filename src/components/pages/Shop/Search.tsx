"use client";

import { useSearchText } from "@/context/SearchTextContext";
// import { SearchProps } from "antd/es/input";
// import { Input } from "antd";
import React, { useEffect, useRef, useState } from "react";

// const { Search } = Input;

const Search = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const { setSearchText } = useSearchText();

    useEffect(() => {
        const handleFocus = () => {
            setIsFocused(true);
        };

        const handleBlur = () => {
            setIsFocused(false);
        };

        const inputElement = inputRef.current;
        if (inputElement) {
            inputElement.addEventListener("focus", handleFocus);
            inputElement.addEventListener("blur", handleBlur);
        }

        return () => {
            if (inputElement) {
                inputElement.removeEventListener("focus", handleFocus);
                inputElement.removeEventListener("blur", handleBlur);
            }
        };
    }, []);

    // handle search filed value
    // const onSearch: SearchProps["onSearch"] = (value) => {
    //     setSearchText(value);
    // };

    return (
        <div>
            <input
                ref={inputRef}
                type="text"
                placeholder="Search"
                className={`input-element outline-none bg-sky-50 ${
                    isFocused ? "focused" : ""
                }`}
                onKeyDown={(e: any) => {
                    if (e.key === "Enter") {
                        setSearchText(e.target.value);
                    }
                }}
            />
            <style jsx>{`
                .input-container {
                    display: inline-block;
                    position: relative;
                }
                .input-element {
                    // border: 1px solid black;
                    border-radius: 20px;
                    padding: 10px;
                    transition: width 0.3s ease;
                    width: 200px; /* Initial width */
                    box-sizing: border-box;
                }
                .input-element.focused {
                    width: 100%; /* Width when focused */
                }
                @media (min-width: 768px) {
                    .input-element.focused {
                        width: 500px; /* Width when focused */
                    }
                }
            `}</style>
            {/* <Search
                className="md:hidden"
                placeholder="search by id, name, category..."
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
                onKeyDown={(e: any) => {
                    if (e.key === "Enter") {
                        setSearchText(e.target.value);
                    }
                }}
            /> */}
        </div>
    );
};

export default Search;
