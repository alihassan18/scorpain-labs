import React, { useState } from "react";
import clsx from "clsx";

interface IProps {
  className?: string;
  placeholder?: string;
  iconStyle?: string;
  seValue?: Function | undefined;
  value?: string;
  setSearchResults: any;
}

const SearchComponent = ({
  className,
  iconStyle,
  placeholder,
  seValue,
  value = "",
  setSearchResults,
}: IProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value: any) => {
    setSearchTerm(value);
    if (setSearchResults) {
      // Trigger the API call
      setSearchResults(value);
    }
  };

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0  right-4 flex items-center pointer-events-none ">
        <i className={`icon-search1 text-[#7F4DEA] ${iconStyle}`}></i>
      </div>
      <div className="cross-btn">
        <input
          type="search"
          // id="default-search"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className={clsx(
            className,
            "focus:shadow-outline text-xs py-3.5 pl-5 pr-10 placeholder:text-xs block w-full placeholder:text-[#666666]  rounded-[20px] sm:rounded-[35px] border border-[#E2E2E2] disabled:!text-secondary bg-white focus:outline-none focus:ring-0 border-[#D0D0D0]/15 focus:border-primary"
          )}
          placeholder={`${placeholder ? placeholder : "Search by Filters"}`}
          required
        />
      </div>
    </div>
  );
};

export default SearchComponent;
