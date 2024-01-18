import React from "react";
import { IconType } from "react-icons";
import { setButtonsStyle } from "../../utils/setButtonsStyle";

export const styles = {
  danger: "btn btn-danger",
  success: "btn btn-success",
  primary: "btn btn-primary",
  circle: "rounded rounded-circle ratio-1x1",
  flush: "btn-flush",
} as const;

export type Style = (keyof typeof styles)[];

type BtnProps = {
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
}: BtnProps) => {
  return (
    <button
      type={type}
      className={`${setButtonsStyle(styles, style)}`}
      disabled={disable}
      onClick={onClickFunction}
    >
      {icon && React.createElement(icon)}
      {content ?? ""}
    </button>
  );
};

export default PrimaryButton;
