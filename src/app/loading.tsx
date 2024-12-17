"use client";

import { Spin } from "antd";

const loading = () => {
    return (
        <div className="flex flex-col items-center justify-center my-[195px]">
            <Spin style={{ color: "white" }} size="large" />
        </div>
    );
};

export default loading;
