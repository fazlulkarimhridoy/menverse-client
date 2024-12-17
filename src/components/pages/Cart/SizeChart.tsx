import React from "react";

const SizeChart = () => {
    return (
        <div className="font-outfit border-2 border-[rgb(162,182,195)] p-5 xl:p-10 space-y-1 w-full md:w-1/2 font-outfit rounded-xl">
            <h1 className="font-semibold text-fade-black text-nowrap">
                Size chart (Asian Measurement)
            </h1>
            <table className="w-full table-zebra table-fixed whitespace-nowrap">
                <thead>
                    <tr className="bg-gray-300">
                        <th className="p-2 text-left">সাইজ</th>
                        <th className="p-2 text-center">বডি</th>
                        <th className="p-2 text-right">লং</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-2">M</td>
                        <td className="p-2 text-center">38 cm</td>
                        <td className="p-2 text-right">27 cm</td>
                    </tr>
                    <tr>
                        <td className="p-2">L</td>
                        <td className="p-2 text-center">40 cm</td>
                        <td className="p-2 text-right">28 cm</td>
                    </tr>
                    <tr>
                        <td className="p-2">XL</td>
                        <td className="p-2 text-center">42 cm</td>
                        <td className="p-2 text-right">29 cm</td>
                    </tr>
                    <tr>
                        <td className="p-2">XXL</td>
                        <td className="p-2 text-center">44 cm</td>
                        <td className="p-2 text-right">29.5 cm</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default SizeChart;
