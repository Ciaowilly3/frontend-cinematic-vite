export const styles = {
  btnFlush: "btn-flush",
  linkFlush: "link-flush",
  txtMyPrimary: "text-my-primary",
  txtMySecondary: "text-my-secondary",
  txtMyThird: "text-my-third",
  btnDanger: "btn btn-danger",
  btnSuccess: "btn btn-success",
  btnPrimary: "btn btn-primary",
  circle: "rounded rounded-circle ratio-1x1",
} as const;

export type Style = (keyof typeof styles)[];

export const setAtomicComponentStyle = (
  stylesObj: typeof styles,
  keys: Style
) => {
  return keys.map((key) => stylesObj[key]).join(" ");
};
