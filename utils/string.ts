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

/**
 * Convert snake case to text
 * @param str String Snake case string
 * @returns
 */
const snakeToText = (str: string) => {
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Normalize prices to 2 decimal places
 * @param value
 * @returns
 */
const normalizePrice = (value: number) => {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export {
  kebabToText,
  snakeToText,
  normalizePrice,
}
