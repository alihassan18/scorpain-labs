import { Dialog, DialogBackdrop, Transition } from "@headlessui/react";
import { Fragment } from "react";
interface Iprops {
  className?: string;
  children: any;
  show: any;
  hide: any;
  iconClass?: string;
}
export default function BasicModal({
  show,
  hide,
  children,
  className,
  iconClass,
}: Iprops) {
  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="fixed z-50 inset-0 " onClose={hide}>
        <div className="flex  items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child>
            <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-80 0transition-opacity" />
          </Transition.Child>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen "
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div
            className={`${className} auto inline-block align-top bg-white
            rounded-larg text-left overflow-hidden shadow-xl
            transform transition-all sm:align-middle`}
          >
            <button
              type="button"
              className={` text-borderColor text-xl hover:text-gray-500 focus:outline-none ${iconClass} absolute top-5 z-50 right-5`}
              onClick={() => {
                hide(false);
              }}
            >
              <span className="sr-only">Close</span>
              <div className="h-[22px] w-[22px] flex-shrink-0 flex justify-center items-center cursor-pointer rounded-full bg-black">
                <i
                  className="icon-cross text-[10px] cursor-pointer  text-white font-normal  flex-shrink-0"
                  aria-hidden="true"
                />
              </div>
            </button>

            {children}
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
