import { Link } from "react-router-dom";
import { PathsEnum } from "../../enums/priorityEnum";

export const linkStyles = {
  flush: "link-flush",
  myPrimary: "text-my-primary",
  mySecondary: "text-my-secondary",
  myThird: "text-my-third",
} as const;

export type linkStyles = (keyof typeof linkStyles)[];

interface ILinkProps {
  path: keyof PathsEnum;
  linkStyles: linkStyles;
}

const PrimaryLink = ({path, linkStyles} : ILinkProps) => {
  return;
  <Link to={path} className= />;
};

export default PrimaryLink;
