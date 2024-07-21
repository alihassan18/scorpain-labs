import Image from "next/image";
import { useState } from "react";

interface IProps {
  src: any;
  width?: number;
  height?: number;
  className?: string;
  figClassName?: string;
  alt?: string;
  blurEffect?: boolean;
  priority?: boolean;
  layout?: any;
  fill?: boolean;
}

const ImageComponent = ({
  src,
  width,
  height,
  className,
  figClassName,
  alt,
  layout,
  fill,
  blurEffect,
  priority,
  ...rest
}: IProps) => {
  const [error, setError] = useState(false);

  const handleImageError = (event: any) => {
    setError(true);
  };

  return (
    <figure
      className={`relative leading-0 ${figClassName ? figClassName : ""}`}
    >
      <Image
        src={error ? "/assets/images/placeholderyolo.svg" : src}
        width={width}
        height={height}
        fill={fill}
        className={className}
        placeholder={blurEffect ? "blur" : "empty"}
        blurDataURL={`/_next/image?url=${src}&w=16&q=1`}
        alt={alt || "Image"}
        layout={layout}
        priority={priority}
        onError={handleImageError}
        {...rest}
      />
    </figure>
  );
};

export default ImageComponent;
