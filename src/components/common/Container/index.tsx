import clsx from "clsx";

interface Iprops {
  className?: string;
  size?: "md" | "lg";
  children: React.ReactNode;
}

interface SsProps {
  md: string;
  lg: string;
}

const sizeStyles: SsProps = {
  md: "mx-auto px-4 md:max-w-[1272px]",
  lg: "mx-auto px-4 md:max-w-[1500px] lg:px-[30px]",
};

const Container = ({ size = "md", className, ...props }: Iprops) => {
  return <div className={clsx(sizeStyles[size], className)} {...props} />;
};

export default Container;
