import React from "react";
import { IconType } from "react-icons";
import { setAtomicComponentStyle } from "../../utils/setAtomicComponentStyle";

const BtnStyles = {
  btnFlush: "btn-flush",
  txtMyPrimary: "text-my-primary",
  txtMySecondary: "text-my-secondary",
  txtMyThird: "text-my-third",
  btnDanger: "btn btn-danger",
  btnSuccess: "btn btn-success",
  btnPrimary: "btn btn-primary",
  circle: "rounded rounded-circle ratio-1x1",
};

export type BtnStyles = (keyof typeof BtnStyles)[];

type IBtnProps = {
  onClickFunction?: () => void;
  icon?: IconType | undefined;
  content?: string | null;
  style: BtnStyles;
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
      className={`${setAtomicComponentStyle(BtnStyles, style)}`}
      disabled={disable}
      onClick={onClickFunction}
    >
      {icon && React.createElement(icon)}
      {content ?? ""}
    </button>
  );
};

export default PrimaryButton;
