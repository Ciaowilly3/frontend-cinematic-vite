import React from "react";
import { IconType } from "react-icons";

const styles = {
  danger: "btn btn-danger",
  success: "btn btn-success",
  circle: "rounded rounded-circle",
} as const;

type BtnProps = {
  onClickFunction?: () => void;
  content: string | IconType;
  additionalContent: string | null;
  style: keyof typeof styles;
  type?: "submit" | "button";
};

const PrimaryButton = ({
  onClickFunction,
  content,
  style,
  type = "button",
  additionalContent,
}: BtnProps) => {
  return (
    <button
      type={type}
      className={styles[style]}
      onClick={type ? undefined : onClickFunction}
    >
      {typeof content === "string"
        ? content
        : React.createElement(content as IconType)}
      {additionalContent}
    </button>
  );
};

export default PrimaryButton;

//TODO: accedere dinamicamente agli stili
