/**
 * Generates a random number between min and max
 * @param min 
 * @param max 
 * @returns 
 */
export const random = (min: number, max: number) => {
  if (min > max) {
    throw new Error("min must be greater than max!");
  }
  return Math.random() * (max - min) + min;
};
