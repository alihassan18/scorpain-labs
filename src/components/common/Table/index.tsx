import React from "react";

interface TableProps {
  data: any[];
  headingClass?: any;
  dataClass?: any;
  headerClass?: any;
}

const Table = ({ data, headingClass, dataClass, headerClass }: TableProps) => {
  //   if (!data || !Array.isArray(data) || data.length === 0) {
  //     return <div>No data available</div>;
  //   }

  const numColumns = data[0].length;
  const columnWidth = `${100 / numColumns}%`;

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="">
        <tr className={`${headerClass}`}>
          {data[0].map((header: any, index: number) => (
            <th
              key={index}
              className={`px-6 py-2 text-sm text-gray-500 text-left w-[200px] ${headingClass}`}
              style={{ width: columnWidth }}
            >
              <div
                className={`py-2 ${
                  header !== header.index - 1 ? "border-r" : ""
                }`}
              >
                {header}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {data.slice(1).map((row: any[], rowIndex: number) => (
          <tr key={rowIndex}>
            {row.map((cell: any, cellIndex: number) => (
              <td
                key={cellIndex}
                className={`px-6 py-2 text-sm text-gray-500 text-left ${dataClass}`}
                style={{ width: columnWidth }}
              >
                <div
                  className={`py-2 ${
                    cellIndex !== row.length - 1 ? "border-r" : ""
                  }`}
                >
                  {cell}
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
