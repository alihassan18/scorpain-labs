import { LocationType } from "@/interfaces/user.interface";

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const generateRandomString = (length: number): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};

export function removeEmojis(str: string) {
  // Use regex to remove emojis and other special characters
  const emojiPattern =
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDFFF]|[\u2011-\u26FF]|\uFE0F|\u200D)/g;
  // Replace emojis and special characters with an empty string
  const cleanedTag = str.replace(emojiPattern, "");
  // Trim whitespace and convert to lowercase
  return cleanedTag.trim().toLowerCase();
}

// Haversine formula to calculate distance
export const haversineDistance = (
  coords1: LocationType | undefined,
  coords2: LocationType | undefined
) => {
  if (!coords1 || !coords2)
    throw Error("Coordinates required to calculate distance ");

  function toRad(x: any) {
    return (x * Math.PI) / 180;
  }

  const lat1 = coords1.latitude;
  const lon1 = coords1.longitude;
  const lat2 = coords2.latitude;
  const lon2 = coords2.longitude;

  const R = 6371; // km   (Will calculate and show distance in km)
  // const R = 3959;  //miles

  const x1 = lat2 - lat1;
  const dLat = toRad(x1);
  const x2 = lon2 - lon1;
  const dLon = toRad(x2);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c;

  return d; // returns the distance in km
};

export function debounce(func: (...args: any[]) => void, wait: number) {
  // debounce a function
  let timeout: NodeJS.Timeout;

  return function (...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
