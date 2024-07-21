import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatRattingNumber = (num: string) =>  {
  if(!num) return "0.0"
  // Check if the number is an integer (no decimal part)
  if (num.length == 1) {
    return num + '.0';
  } else {
    // Otherwise, return the number as-is
    return num.toString();
  }
}

export const addCommasToNumberString = (numberString: string):string => {
  // Check if the input is a valid number string
  if (typeof numberString !== 'string') {
    return numberString; // If not a string, return as-is
  }

  // Split the string into parts before and after the decimal point
  let parts = numberString.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Join the parts back together with the decimal point
  return parts.join('.');
}
