export const setAtomicComponentStyle = <
  T extends Record<string, string>,
  K extends keyof T
>(
  styles: T,
  keys: K[]
) => {
  return keys.map((key) => styles[key]).join(" ");
};
