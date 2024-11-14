"use client";
import { Spin } from "antd";

const loading = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-5 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Spin style={{ color: "white" }} size="large" />
        </div>
    );
};

export default loading;
