export const getObjectFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    const savedItem = localStorage.getItem(key);
    return savedItem ? JSON.parse(savedItem) : null;
  }
};
