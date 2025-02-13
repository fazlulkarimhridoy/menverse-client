"use client";

import { Image } from "antd";
import React from "react";

interface SrcType {
    srcList: string[];
}

const ImageDetails: React.FC<SrcType> = ({ srcList }) => {
    if (!srcList || srcList.length === 0) {
        return <p>No images available</p>;
    }

    // const images = typeof srcList === "string" ? JSON.parse(item.images) : [];
    return (
        <div className="max-w-[450px] space-y-4">
            <div className="p-2 flex justify-center">
                <Image
                    loading="lazy"
                    className="rounded-lg"
                    // width={400}
                    // height={450}
                    alt="product"
                    src={srcList[0]}
                />
            </div>
            {/* packaging image */}
            <div
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                className="flex justify-around overflow-x-scroll"
            >
                {srcList[1] && (
                    <div className="p-2">
                        <Image
                            loading="lazy"
                            className="rounded-lg"
                            width={90}
                            height={100}
                            alt="product"
                            src={srcList[1]}
                        />
                    </div>
                )}
                {srcList[2] && (
                    <div className="p-2">
                        <Image
                            loading="lazy"
                            className="rounded-lg"
                            width={90}
                            height={100}
                            alt="product"
                            src={srcList[2]}
                        />
                    </div>
                )}
                {srcList[3] && (
                    <div className="p-2">
                        <Image
                            loading="lazy"
                            className="rounded-lg"
                            width={90}
                            height={100}
                            alt="product"
                            src={srcList[3]}
                        />
                    </div>
                )}
                {srcList[4] && (
                    <div className="p-2">
                        <Image
                            loading="lazy"
                            className="rounded-lg"
                            width={90}
                            height={100}
                            alt="product"
                            src={srcList[4]}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageDetails;
