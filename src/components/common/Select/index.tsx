"use client";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { IoIosArrowDown } from "react-icons/io";

type Data = {
  label: string;
  value: string;
  type?: string;
};

interface Iprops {
  selected: any;
  setSelected: any;
  Data?: Data[];
  placeholder?: any;
  className?: string;
  ListBoxOptions?: string;
  SelectIcon?: string;
  takeLabelAsValue?: boolean;
}
export default function SelectComponent({
  Data,
  placeholder,
  selected,
  setSelected,
  className,
  ListBoxOptions,
  SelectIcon,
  takeLabelAsValue = false,
}: Iprops) {
  return (
    <Listbox
      as="div"
      className="relative w-full"
      value={selected}
      onChange={setSelected}
    >
      <Listbox.Button
        className={`relative ${className}  !rounded-[20px] border-4 capitalize text-white flex w-full items-center justify-between  border-[#D0D0D080] bg-white py-3.5 pl-5 pr-16 text-left focus:outline-none  focus:border-primary`}
      >
        <span
          className={`font-thin text-base  text-[#666666] capitalize`}
          title={selected || placeholder}
        >
          {selected || placeholder}
        </span>
        <span className="absolute flex items-center pointer-events-none inset-y-1/2 right-5">
          <IoIosArrowDown className="text-base text-[#666666]" />
        </span>
      </Listbox.Button>

      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Listbox.Options
          className={`${ListBoxOptions} absolute !z-50 mt-1 max-h-[14.5rem] w-full overflow-auto AtScrollHide
               rounded-lg border-2 border-[#D0D0D080] py-2  text-lg font-thin bg-white  focus:outline-none`}
        >
          {Data &&
            Data.map((item: any, Idx: any) => {
              return (
                <>
                  <Listbox.Option
                    key={Idx}
                    className={({ active }: any) =>
                      `relative cursor-pointer select-none py-2 px-6 ${
                        active
                          ? "bg-gradient-to-r  from-[#FF4581] to-[#7F4DEA]"
                          : ""
                      }`
                    }
                    value={takeLabelAsValue ? item.label : item.value}
                  >
                    <div className="truncate text-[#666666] text-base font-thin hover:text-white">
                      {item?.label}
                    </div>
                  </Listbox.Option>
                </>
              );
            })}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
}
