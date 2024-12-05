"use client";
import { Divider } from "antd";
import React, { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaAngleRight } from "react-icons/fa6";

const ButtonGroup: React.FC = () => {
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [windowSize, setWindowSize] = useState({
    width: 0,
  });
  const [tags] = useState<string[]>([
    "greetings",
    "congratulation",
    "get well soon",
    "just because",
    "Anniversary",
    "birthday",
    "Apology",
    "new baby",
    "fathers day",
    "mothers day",
    "valentines day",
    "surprise gift",
  ]);

  const scrollBar = useRef<HTMLDivElement>(null);
  const leftArrow = useRef<HTMLDivElement>(null);
  const rightArrow = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const manageIcons = () => {
      if (scrollBar.current) {
        if (scrollBar.current.scrollLeft >= 20) {
          leftArrow.current?.classList.remove("hidden");
        } else {
          leftArrow.current?.classList.add("hidden");
        }

        let maxScroll =
          scrollBar.current?.scrollWidth - scrollBar.current?.clientWidth - 20;

        if (scrollBar.current.scrollLeft > maxScroll) {
          rightArrow.current?.classList.add("hidden");
        } else {
          rightArrow.current?.classList.remove("hidden");
        }
      }
    };

    manageIcons(); // Initial check when the component mounts

    if (scrollBar.current) {
      scrollBar.current.addEventListener("scroll", manageIcons);
    }

    return () => {
      if (scrollBar.current) {
        scrollBar.current.removeEventListener("scroll", manageIcons);
      }
    };
  }, []);

  const handleClick = (buttonIndex: number) => {
    setActiveButton(buttonIndex);
  };

  const handleRightScroll = () => {
    if (scrollBar.current) {
      scrollBar.current.scrollLeft += 200;
    }
  };

  const handleLeftScroll = () => {
    if (scrollBar.current) {
      scrollBar.current.scrollLeft -= 200;
    }
  };

  return (
    <div className="flex items-center w-full lg:scrollbar-container overflow-hidden relative  ">
      <div
        onClick={handleLeftScroll}
        ref={leftArrow}
        className="text-xl left-arrow border-[0.5px] border-slate-400 bg-white rounded-full p-2 cursor-pointer hidden"
      >
        <FaChevronLeft />
      </div>
      <div
        ref={scrollBar}
        className="button-group flex text-nowrap overflow-x-scroll no-scrollbar"
      >
        {tags.map((tag, idx) => {
          return (
            <button
              key={idx}
              className={activeButton === idx ? "active" : ""}
              onClick={() => handleClick(idx)}
            >
              {tag}
            </button>
          );
        })}
      </div>
      <div
        onClick={handleRightScroll}
        ref={rightArrow}
        className="right-arrow text-xl border-[0.5px] border-slate-400 bg-white rounded-full p-2 cursor-pointer"
      >
        <FaAngleRight />
      </div>
    </div>
  );
};

export default ButtonGroup;