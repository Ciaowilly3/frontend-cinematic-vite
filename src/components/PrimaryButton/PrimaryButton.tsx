import React from "react";
import { IconType } from "react-icons";

const styles = {
  danger: "btn btn-danger",
  success: "btn btn-success",
  circle: "rounded rounded-circle",
  flush: "btn-flush",
} as const;

type Style = keyof typeof styles;

type BtnProps = {
  onClickFunction?: () => void;
  content: string | IconType;
  additionalContent?: string | null;
  style: Style;
  type?: "submit" | "button";
  disable?: boolean;
};

const PrimaryButton = ({
  onClickFunction,
  content,
  style,
  type = "button",
  additionalContent,
  disable = false,
}: BtnProps) => {
  return (
    <button
      type={type}
      className={styles[style]}
      disabled={disable}
      onClick={onClickFunction}
    >
      {typeof content === "string" ? content : React.createElement(content)}
      {additionalContent ?? ""}
    </button>
  );
};

export default PrimaryButton;

//TODO: mettere Icon e content separati
