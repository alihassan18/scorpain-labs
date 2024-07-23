import clsx from "clsx";
import React from "react";

interface PProps {
  left: string;
  right: string;
  top: string;
  bottom: string;
}
interface IProps {
  text: string | React.ReactNode;
  children: React.ReactNode;
  position?: "left" | "right" | "top" | "bottom";
  classNames?: string | React.ReactNode;
  iconAlign?: boolean;
  disable?: boolean;
  text2?: string;
  listAlign?: boolean;
  hide?: boolean;
  textLower?: any;
}

const Tooltip = ({
  text,
  children,
  text2,
  textLower,
  listAlign,
  classNames,
  iconAlign,
  position = "bottom",
  disable = false,
  hide = false,
}: IProps) => {
  const positionStyle: PProps = {
    left: `top-1/2 right-[120%] -translate-y-1/2 before:top-1/2 before:left-full before:-translate-y-1/2 ${
      disable ? "before:border-l-white" : "before:border-l-white"
    }`,
    right: `top-1/2 left-[120%] -translate-y-1/2 before:top-1/2 before:right-full before:-translate-y-1/2 ${
      disable ? "before:border-r-secondary1" : "before:border-r-black"
    }`,
    top: `-translate-x-1/2 left-1/2 before:left-1/2 before:top-full before:-translate-x-1/2 h-max ${
      disable ? "before:border-t-white" : "before:border-t-white"
    }`,
    bottom: `-bottom-24 left-0 before:left-1/2 before:bottom-full before:-translate-x-1/2 ${
      disable ? "before:border-b-secondary1" : "before:border-b-[#FF67CB]"
    }`,
  };

  return (
    <>
      <span className="group relative leading-0">
        {!hide && (
          <div
            className={clsx(
              positionStyle[position],
              `${classNames} bg-white pointer-events-none absolute z-50 hidden whitespace-nowrap rounded text-center px-2 py-0.5 text-sm leading-tight items-center h-max ${
                !textLower && "capitalize"
              }   opacity-0 transition before:absolute before:border-[6px] before:border-transparent before:content-['']  group-hover:opacity-100 sm:block ${
                disable ? "bg-secondary1" : ""
              }`
            )}
          >
            <p
              className={`text-sm text-black whitespace-pre-wrap ${
                text2 && "mb-1"
              }`}
            >
              {text}
            </p>
            <span className="text-sm text-center text-black">{text2}</span>
          </div>
        )}
        {children}
      </span>
    </>
  );
};

export default Tooltip;
