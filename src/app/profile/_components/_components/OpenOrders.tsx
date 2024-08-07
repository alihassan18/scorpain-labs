import Table from "@/components/common/Table";
import React, { Fragment } from "react";

const tableData = [
  ["Time", "Side", "Price", "Total", "Amount", "Filled", "Cancel"], // Header row
  ["2024/07/03 3:48:4", "Buy", 0.014, 499.8, 35700, 0, "Cancel"],
  ["2024/07/03 3:48:4", "Buy", 0.014, 499.8, 35700, 0, "Cancel"],
  ["2024/07/03 3:48:4", "Buy", 0.014, 499.8, 35700, 0, "Cancel"],
  ["2024/07/03 3:48:4", "Buy", 0.014, 499.8, 35700, 0, "Cancel"],
  ["2024/07/03 3:48:4", "Sell", 0.014, 499.8, 35700, 0, "Cancel"],
  ["2024/07/03 3:48:4", "Buy", 0.014, 499.8, 35700, 0, "Cancel"],
  ["2024/07/03 3:48:4", "Sell", 0.014, 499.8, 35700, 0, "Cancel"],
  ["2024/07/03 3:48:4", "Buy", 0.014, 499.8, 35700, 0, "Cancel"],
  ["2024/07/03 3:48:4", "Buy", 0.014, 499.8, 35700, 0, "Cancel"],
  ["2024/07/03 3:48:4", "Buy", 0.014, 499.8, 35700, 0, "Cancel"],
];

const OpenOrders: React.FC = () => {
  const headingClass = "font-bold text-gray-700"; // Custom class for header cells
  const dataClass = ""; // Custom class for data cells
  const headerClass = ""; // Custom class for header row
  return (
    <Fragment>
      <div className="overflow-auto  bg-[#31488E]">
        <Table
          data={tableData}
          headingClass={headingClass}
          dataClass={dataClass}
          headerClass={headerClass}
        />
      </div>
    </Fragment>
  );
};

export default OpenOrders;
