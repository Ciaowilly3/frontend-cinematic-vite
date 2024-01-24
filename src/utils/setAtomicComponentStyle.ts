type SetAtomicComponentStyle = <
  T extends Record<string, string>,
  K extends keyof T
>(
  styles: T,
  keys: K[]
) => string;

export const setAtomicComponentStyle: SetAtomicComponentStyle = (
  styles,
  keys
) => {
  return keys.map((key) => styles[key]).join(" ");
};
