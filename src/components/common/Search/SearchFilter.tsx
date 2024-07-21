import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffectReducer } from "react-pin-field";
import { addValue, selectfilters, upadteSearch } from "@/redux/slice/filters";

interface IProps {
  className?: string;
  placeholder?: string;
  iconStyle?: string;
}

const SearchFilterCom = ({ className, iconStyle, placeholder }: IProps) => {
  const dispatch = useDispatch();
  const filterValues = useSelector(selectfilters);

  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(
        upadteSearch({ label: searchKey, value: searchKey, type: "search" })
      );
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchKey]);

  useEffect(() => {
    const searchTerm =
      filterValues.find((x: any) => x.type === "search")?.value || "";
    if (!searchTerm) {
      setSearchKey("");
    }
  }, [filterValues]);

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none ">
        <i className={`icon-search1 text-[#7F4DEA] ${iconStyle}`}></i>
      </div>
      <div className="cross-btn">
        <input
          type="search"
          // id="default-search"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          className={clsx(
            className,
            "focus:shadow-outline text-xs py-3.5 pl-5 pr-8 placeholder:text-xs block w-full placeholder:text-[#666666] rounded-[20px] sm:rounded-[35px] border border-[#E2E2E2] disabled:!text-secondary bg-white focus:outline-none focus:ring-0 border-[#D0D0D0]/15 focus:border-primary"
          )}
          placeholder={`${placeholder ? placeholder : "Search by Filters"}`}
          required
        />
      </div>
    </div>
  );
};

export default SearchFilterCom;
