"use client";

import React from "react";
import { Select } from "antd";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

interface ShipmentCalculatorProps {
  shipmentCost: number;
  setShipmentCost: (cost: number) => void;
}

const ShipmentCalculator: React.FC<ShipmentCalculatorProps> = ({ shipmentCost, setShipmentCost }) => {

  const onChange = (value: string) => {
    setShipmentCost(Number(value)); // Convert value to number for consistency
    console.log(`Selected: ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("Search:", value);
  };

  return (
    <div className="font-outfit border-2 border-[rgb(162,182,195)] p-2 space-y-4 w-full lg:w-full rounded-xl">
      <h1 className="font-semibold text-xl text-[#3d4349]">Getting shipment estimates</h1>
      <Select

        className="w-full"
        showSearch
        placeholder="Select a place In Dhaka"
        optionFilterProp="label"
        onChange={onChange}
        onSearch={onSearch}
        options={[
          { value: "200", label: "Rampura" },
          { value: "160", label: "Mohammadpur" },
          { value: "170", label: "Dhanmondi" },
          { value: "220", label: "Gulshan" },
          { value: "180", label: "Banani" },
          { value: "250", label: "Uttara" },
          { value: "210", label: "Badda" },
          { value: "150", label: "Mirpur" },
        ]}
      />
      <h1 className="flex items-center text-lg text-fade-black">
        Estimate Delivery cost: {shipmentCost}
        <FaBangladeshiTakaSign className="text-sm" />
      </h1>

      {/* <button className="text-white bg-black w-full p-2 rounded-lg">Calculate delivery cost</button> */}
    </div>
  );
};

export default ShipmentCalculator;
