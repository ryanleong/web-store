
/**
 * Save to local storage
 * @param key
 * @param data
 */
const toLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};


/**
 * Get from local storage
 * @param key
 * @returns
 */
const fromLocalStorage = (key: string) => {
  const jsonData = localStorage.getItem(key);
  return jsonData ? JSON.parse(jsonData) : null;
};

export {
  toLocalStorage,
  fromLocalStorage,
}
