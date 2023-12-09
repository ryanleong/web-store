/**
 * Convert kebab case to text
 * @param str String Kebab case string
 * @returns String
 */
const kebabToText = (str: string) => {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export {
  kebabToText,
}
