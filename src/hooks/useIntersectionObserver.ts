import { useEffect, useRef, MutableRefObject } from "react";

type IntersectionObserverCallback = () => void;
type IntersectionObserverOptions = IntersectionObserverInit;

const useIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverOptions
): MutableRefObject<HTMLDivElement | null> => {
  const observer = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    }, options);

    if (elementRef.current) observer.current.observe(elementRef.current);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [callback, options]);

  return elementRef;
};

export default useIntersectionObserver;
