import React from "react";

interface CheckBoxProps {
  label: string | number | any;
  disabled?: any;
  value?: any;
  className?: string;
  labelClass?: string;
  checked?: any;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  label,
  disabled,
  value,
  className,
  labelClass,
  checked,
}) => {
  return (
    <div className="flex items-center">
      <input
        disabled={disabled}
        id="disabled-checkbox"
        type="checkbox"
        value={value}
        checked={checked}
        className={`${className} w-4 h-4 text-blue-600 outline-none border-gray-300 rounded bg-transparent focus:ring-0 focus:outline-none focus:shadow-none !shadow-none`}
      />
      <label
        htmlFor="disabled-checkbox"
        className={`ms-2 !text-xs font-medium ${labelClass}`}
      >
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
