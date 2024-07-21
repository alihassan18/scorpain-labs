import { Fragment, useCallback, useEffect, useMemo } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Button } from "@/components/common";
import FormCheck from "@/components/common/Forms/FormCheck";

type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
  updateInviteFriends: (friends: string[]) => void;
  checkedFriends: string[];
  setCheckedFriends: (friends: string[]) => void;
  initialCheckedFriends: string[];
};

export default function FriendsDropdown({
  options,
  updateInviteFriends,
  checkedFriends,
  setCheckedFriends,
  initialCheckedFriends,
}: Props) {
  useEffect(() => {
    // Initialize checked friends when selectedTrip changes
    if (initialCheckedFriends.length > 0) {
      setCheckedFriends(initialCheckedFriends);
    }
  }, []);

  const handleCheckboxChange = useCallback(
    (value: string) => {
      const updatedCheckedItems = checkedFriends.includes(value)
        ? checkedFriends.filter((item) => item !== value)
        : [...checkedFriends, value];

      setCheckedFriends(updatedCheckedItems);
      updateInviteFriends(updatedCheckedItems);
    },
    [checkedFriends, setCheckedFriends, updateInviteFriends]
  );
  useEffect(() => {
    if (checkedFriends.length === 0) {
      setCheckedFriends([]);
    }
  }, []);

  const classNames = (...classes: any) => classes.filter(Boolean).join(" ");

  const menuItems = useMemo(
    () =>
      options.map((item, i) => (
        <Menu.Item key={i}>
          {({ active }) => (
            <div
              className={classNames(
                active ? "bg-gray-100" : "",
                "gap-2 px-4 py-1 text-sm leading-6 font-medium flex items-center cursor-pointer"
              )}
              onClick={(e) => {
                e.preventDefault();
                handleCheckboxChange(item.value);
              }}
            >
              <FormCheck
                label={item.label}
                checked={checkedFriends.includes(item.value)}
                onChange={() => handleCheckboxChange(item.value)}
              />
            </div>
          )}
        </Menu.Item>
      )),
    [options, checkedFriends, handleCheckboxChange]
  );

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="w-full !rounded-md text-white font-medium xs:!text-[10px] xs:!h-[44px] AtBtn h-[44px] px-7 py-3 text-sm">
        Add Friends
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
      >
        <Menu.Items className="absolute right-0 z-50 mt-4 w-[180px] max-h-52 overflow-auto AtScrollHide origin-top-right rounded-md bg-white py-3 shadow-xl focus:outline-none">
          <div className="space-y-2">{menuItems}</div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
