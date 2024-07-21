import React, { useEffect, useRef, useState } from "react";
import FormCheck from "../Forms/FormCheck";
interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
  { value: "option4", label: "Option 4" },
  { value: "option5", label: "Option 5" },
  { value: "option6", label: "Option 6" },
];

const MultiSelect = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCheckboxChange = (optionValue: string) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(optionValue)
        ? prevSelected.filter((value) => value !== optionValue)
        : [...prevSelected, optionValue]
    );
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="relative inline-block min-w-64" ref={dropdownRef}>
      <button
        type="button"
        className="w-full px-4 py-2 text-sm text-left bg-white border rounded shadow-md focus:outline-none"
        onClick={handleToggle}
      >
        {selectedOptions.length > 0
          ? selectedOptions.join(", ")
          : "Select options"}
        <i className="icon-down float-right text-[10px] mt-1.5"></i>
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full bg-white border rounded shadow-lg mt-1">
          <input
            type="text"
            className="w-full px-4 py-2 text-sm border-b focus:outline-none ring-0 shadow-0 focus:border-0 focus-visible:outline-none focus-visible:ring-0"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul className="max-h-60 overflow-y-auto">
            {filteredOptions.map((option) => (
              <li key={option.value} className="px-4 py-2 hover:bg-gray-100">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className=""
                    value={option.value}
                    checked={selectedOptions.includes(option.value)}
                    onChange={() => handleCheckboxChange(option.value)}
                  />
                  {/* <FormCheck
                    id="one"
                    value={option.value}
                    checked={selectedOptions.includes(option.value)}
                    onChange={() => handleCheckboxChange(option.value)}
                    label={""}
                  /> */}
                  <span className="ml-2">{option.label}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
