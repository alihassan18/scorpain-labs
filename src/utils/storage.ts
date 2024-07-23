// export const getObjectFromLocalStorage = (key: string) => {
//   if (typeof window !== "undefined") {
//     const savedItem = localStorage.getItem(key);
//     return savedItem ? JSON.parse(savedItem) : null;
//   }
// };


export const getObjectFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    const savedItem = localStorage.getItem(key);
    if (savedItem) {
      try {
        return JSON.parse(savedItem);
      } catch (error) {
        console.error("Error parsing JSON from localStorage", error);
        return null;
      }
    }
    return null;
  }
  return null;
};
