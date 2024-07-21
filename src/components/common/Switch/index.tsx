import { useState } from "react";

import { Switch } from "@headlessui/react";

type Props = {
  isOn?: boolean;
  onChangeHandle?: (value: boolean) => void;
};

export default function SwitchComponent({
  isOn = false,
  onChangeHandle = () => null,
}: Props) {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      checked={isOn}
      onChange={onChangeHandle}
      className={`${isOn ? "bg-[#C2FFD3]" : "bg-[#FFC5C5]"}
          relative inline-flex h-[20px] w-[40px] shrink-0 cursor-pointer rounded-full 
            transition-colors duration-200 ease-in-out focus:outline-none `}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={` mt-[2px] ${
          isOn ? "translate-x-6 bg-[#00EA42]" : "translate-x-[2px] bg-[#FF2626]"
        }
            pointer-events-none inline-block h-4 w-4 transform rounded-full 
            transition duration-200 ease-in-out`}
      />
    </Switch>
  );
}
