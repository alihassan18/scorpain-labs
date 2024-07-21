import React, { useState, useRef, useEffect, useCallback } from "react";
import Select, { components, OptionProps, StylesConfig } from "react-select";
import FormCheck from "../Forms/FormCheck";

interface OptionType {
  label: string;
  value: string;
}

interface SelectSearchProps {
  data: OptionType[];
  type: string;
  setSelected: any;
  selected: any;
  returnFn?: any;
  handleRemove?: any;
}

const SelectSearch: React.FC<SelectSearchProps> = ({
  data,
  type,
  setSelected,
  selected,
  returnFn,
  handleRemove,
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const menuListRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleMenuOpen = () => {
    setMenuIsOpen(true);
  };

  const handleMenuClose = () => {
    if (menuListRef.current) {
      setScrollPosition(menuListRef.current.scrollTop);
    }
    setMenuIsOpen(false);
  };

  const handleChange = (selectedOption: any) => {
    if (selected.find((x: any) => x.value === selectedOption.value)) {
      const filtered = selected.filter(
        (x: any) => x.value !== selectedOption.value
      );
      setSelected(filtered);

      handleRemove && handleRemove(selectedOption);
    } else {
      const newSelection = [
        ...selected,
        {
          ...selectedOption,
          isSelected: selected.find(
            (x: any) => x.value === selectedOption.value
          )
            ? false
            : true,
        },
      ];
      setSelected(newSelection);
      returnFn && returnFn(selectedOption);
    }
  };

  const CustomOption = (props: OptionProps<OptionType>) => (
    <components.Option {...props}>
      <span>
        <FormCheck
          label={props.data.label}
          checked={props.isSelected}
          id={`option-${props.data.value}`}
        />
      </span>
    </components.Option>
  );

  const formatOptionLabel = ({ label }: OptionType) => (
    <p className="text-black text-sm">{label}</p>
  );

  const customStyles: StylesConfig<OptionType, true> = {
    option: (provided, state) => ({
      ...provided,
      color: "#000",
      whiteSpace: "nowrap",
      backgroundColor: state.isSelected ? "#BDE4FF" : provided.backgroundColor,
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#BDE4FF",
    }),
  };

  const CustomMenuList = useCallback(
    (props: any) => {
      useEffect(() => {
        if (menuListRef.current) {
          menuListRef.current.scrollTop = scrollPosition;
        }
      }, [scrollPosition]);

      const handleScroll = (event: any) => {
        setScrollPosition(event.target.scrollTop);
      };

      return (
        <components.MenuList
          {...props}
          innerRef={menuListRef}
          onScroll={handleScroll}
        >
          {props.children}
        </components.MenuList>
      );
    },
    [scrollPosition]
  );

  return (
    <div>
      <div className="relative flex !rounded-lg border border-[#D9D9D9] pr-3">
        <div className="border-r bg-[#FAFAFA] flex-shrink-0 flex items-center px-3 rounded-l-[12px] border-[#D9D9D9]">
          <span className="text-[#595959] text-sm font-semibold">{type}</span>
        </div>
        <div className="flex items-center w-full">
          <Select
            placeholder={type}
            options={data}
            className="!rounded-lg w-full"
            classNamePrefix="select-dropdown"
            formatOptionLabel={formatOptionLabel}
            menuIsOpen={menuIsOpen}
            onMenuOpen={handleMenuOpen}
            onMenuClose={handleMenuClose}
            styles={customStyles}
            onChange={handleChange}
            components={{ Option: CustomOption, MenuList: CustomMenuList }}
            onFocus={handleMenuOpen}
            onBlur={handleMenuClose}
            value={selected}
            closeMenuOnSelect={false}
            menuPlacement="auto"
            captureMenuScroll={true}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectSearch;
