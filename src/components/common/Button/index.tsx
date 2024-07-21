import clsx from "clsx";
import { ImSpinner9 } from "react-icons/im";
import {
  BsProps,
  IButtonProps,
  SsProps,
  VsProps,
} from "@/interfaces/button.interface";

const sizeStyles: SsProps = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-7 py-3 text-sm",
  lg: "px-7 py-2 text-base",
};
const Button = ({
  variant = "solid",
  color = "primary",
  size = "md",
  className,
  type,
  disabled,
  isLoading,
  children,
  loaderClass,
  ...props
}: IButtonProps) => {
  const baseStyles: BsProps = {
    solid:
      "inline-flex justify-center items-center font-medium rounded-full disabled:cursor-not-allowed",
    outline:
      "inline-flex justify-center items-center outline-none font-medium border rounded-full disabled:cursor-not-allowed",
  };

  const variantStyles: VsProps = {
    solid: {
      primary: `bg-[#CCCCCC] text-white active:text-white/80`,
      danger: "bg-[#FF0000] text-white",
    },
    outline: {
      primary:
        "border-primary text-primary hover:border-primary/70 hover:bg-primary/10 active:border-primary/20 active:bg-primary/10 active:text-primary/70 disabled:opacity-40 disabled:hover:border-primary disabled:hover:bg-transparent",
      danger: "bg-[#FF0000] text-white",
    },
  };

  return (
    <button
      className={clsx(
        baseStyles[variant],
        variantStyles[variant][color],
        sizeStyles[size],
        className,
        isLoading &&
          "relative !cursor-wait !text-transparent hover:!text-transparent"
      )}
      type={type || "button"}
      disabled={disabled}
      {...props}
    >
      {isLoading && (
        <div className="absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 text-black">
          <ImSpinner9 className={clsx("animate-spin text-sm", loaderClass)} />
        </div>
      )}
      {children}
    </button>
  );
};
export default Button;
