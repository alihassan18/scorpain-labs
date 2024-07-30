import React from "react";

interface TableProps {
  data: any[];
  headingClass?: any;
  dataClass?: any;
  headerClass?: any;
}

const Table: React.FC<TableProps> = ({
  data,
  headingClass,
  dataClass,
  headerClass,
}) => {
  //   if (!data || !Array.isArray(data) || data.length === 0) {
  //     return <div>No data available</div>;
  //   }

  // const numColumns = data[0].length;
  // const columnWidth = `${100 / numColumns}%`;

  return (
    <table className="min-w-full divide-y divide-black-400">
      <thead className="">
        <tr className={`${headerClass}`}>
          {data[0].map((header: any, index: number) => (
            <th
              key={index}
              className={`px-6 py-2 text-sm text-white text-left w-[200px] ${headingClass}`}
              // style={{ width: columnWidth }}
            >
              <div
                className={`py-2 font-slussen ${
                  header !== header.index - 1 ? "" : ""
                }`}
              >
                {header}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-black-400">
        {data.slice(1).map((row: any[], rowIndex: number) => (
          <tr key={rowIndex}>
            {row.map((cell: any, cellIndex: number) => {
              const sideClass =
                cellIndex === 1 && cell === "Buy"
                  ? "!text-green-400"
                  : cellIndex === 1 && cell === "Sell"
                  ? "!text-[#FF3838]"
                  : dataClass;
              return (
                <td
                  key={cellIndex}
                  className={`px-6 py-2 text-sm text-white/80 text-left font-slussen ${dataClass} ${
                    cellIndex === 1 && "sideClass"
                  } ${sideClass}`}
                  // style={{ width: columnWidth }}
                >
                  <div
                    className={`py-2 whitespace-nowrap font-slussen ${
                      cellIndex !== row.length - 1 ? "" : ""
                    }`}
                  >
                    {cell}
                  </div>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
