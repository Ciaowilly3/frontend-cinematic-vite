import React, { MouseEventHandler } from "react";
import { IconType } from "react-icons";

type BtnProps = {
  onClickFunction: MouseEventHandler<HTMLButtonElement> | undefined;
  content: string | IconType;
  additionalContent: string | null;
  style: string;
  isFormSubmit: boolean;
};

const PrimaryButton = (props: BtnProps) => {
  const { onClickFunction, content, style, isFormSubmit, additionalContent } =
    props;
  return (
    <button
      type={isFormSubmit ? "submit" : "button"}
      className={`${style}`}
      onClick={isFormSubmit ? undefined : onClickFunction}
    >
      {typeof content === "string"
        ? content
        : React.createElement(content as IconType)}
      {additionalContent}
    </button>
  );
};

export default PrimaryButton;
