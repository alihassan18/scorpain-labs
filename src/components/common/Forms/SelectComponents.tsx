"use client";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { IoIosArrowDown } from "react-icons/io";
interface Iprops {
  selected: any;
  setSelected: any;
  Data?: any;
  placeholder?: any;
  className?: string;
  ListBoxOptions?: string;
  SelectIcon?: string;
}
export default function SelectComponent({
  Data,
  placeholder,
  selected,
  setSelected,
  className,
  ListBoxOptions,
  SelectIcon,
}: Iprops) {
  return (
    <Listbox
      as="div"
      className="relative"
      value={selected}
      onChange={setSelected}
    >
      <Listbox.Button
        className={`relative ${className} placeholder:text-base text-white flex w-full items-center justify-between border border-[#D0D0D026]/30 bg-[#121212] h-14 py-3.5 pl-5 pr-16 text-left focus:outline-none  focus:border-primary`}
      >
        <span
          className={`block truncate font-medium text-base font-montserrat`}
          title={selected?.name || placeholder}
        >
          {selected?.name || placeholder}
        </span>
        <span className="absolute flex items-center pointer-events-none inset-y-1/2 right-5">
          <IoIosArrowDown className="text-base" />
          {/* <i className={`${SelectIcon} icon-angle text-sm -rotate-90`}></i> */}
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
               rounded-lg border border-[#666666] py-2 font-medium bg-[#121212] text-sm focus:outline-none`}
        >
          {Data.map((item: any, Idx: any) => {
            return (
              <>
                <Listbox.Option
                  key={Idx}
                  className={({ active }: any) =>
                    `relative cursor-pointer select-none py-2 px-6 text-white ${
                      active ? "bg-[#0B0407]/50" : ""
                    }`
                  }
                  value={item}
                >
                  <div className="truncate text-white">{item.name}</div>
                </Listbox.Option>
              </>
            );
          })}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
}
