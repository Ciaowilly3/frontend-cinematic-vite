import { Style, styles } from "../components/PrimaryButton/PrimaryButton";

export const setButtonsStyle = (stylesObj: typeof styles, keys: Style) => {
  return keys.map((key) => stylesObj[key]).join(" ");
};
