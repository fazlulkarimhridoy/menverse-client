import { useSearchText } from "@/context/SearchTextContext";
import { SearchProps } from "antd/es/input";
import React, { useEffect, useRef, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

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

    return (
        <div>
            <input
                ref={inputRef}
                type="text"
                placeholder="Search"
                className={`input-element outline-none bg-[#f4f4f4] ${
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
        </div>
    );
};

export default Search;
