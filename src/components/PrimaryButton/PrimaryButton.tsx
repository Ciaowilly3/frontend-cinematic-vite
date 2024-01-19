import React from "react";
import { IconType } from "react-icons";
import {
  Style,
  setAtomicComponentStyle,
  styles,
} from "../../utils/setAtomicComponentStyle";

type IBtnProps = {
  onClickFunction?: () => void;
  icon?: IconType | undefined;
  content?: string | null;
  style: Style;
  type?: "submit" | "button";
  disable?: boolean;
};

const PrimaryButton = ({
  onClickFunction,
  content,
  icon,
  style,
  type = "button",
  disable = false,
}: IBtnProps) => {
  return (
    <button
      type={type}
      className={`${setAtomicComponentStyle(styles, style)}`}
      disabled={disable}
      onClick={onClickFunction}
    >
      {icon && React.createElement(icon)}
      {content ?? ""}
    </button>
  );
};

export default PrimaryButton;
