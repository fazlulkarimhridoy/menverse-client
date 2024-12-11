import React, { useCallback, useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Template from "./Template";
interface CarouselProps {
    images: string[];
}

const Banner: React.FC<CarouselProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [arr, setArr] = useState([1, 2, 3, 4]);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToNext = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    }, [setCurrentIndex, images.length]);

    useEffect(() => {
        const intervalId = setInterval(goToNext, 3000);

        return () => clearInterval(intervalId);
    }, [goToNext]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            goToNext();
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [currentIndex, images.length, goToNext]);

    return (
        <div className="carousel relative rounded-2xl w-full  overflow-hidden">

            <div
                className={`flex transition ease-in-out duration-1000`}
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                }}
            >
                {arr.map((idx) => {
                    return (
                        <div className="shrink-0 w-full" key={idx}>
                            <Template></Template>
                        </div>
                    );
                })}
            </div>

            <div className="carousel-button">
                <button onClick={goToPrevious} className="left">
                    <FaAngleLeft />
                </button>
                <p>
                    {currentIndex + 1} / {images.length}
                </p>
                <button onClick={goToNext} className="right">
                    <FaAngleRight />
                </button>
            </div>
        </div>
    );
};

export default Banner;
