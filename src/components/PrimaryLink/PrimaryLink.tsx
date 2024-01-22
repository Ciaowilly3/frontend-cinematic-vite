import { Link } from "react-router-dom";
import { PathsEnum } from "../../enums/PathsEnum";
import { setAtomicComponentStyle } from "../../utils/setAtomicComponentStyle";
import "./PrimaryLink.css";

const linkStyles = {
  linkFlush: "link-flush",
  txtMyPrimary: "text-my-primary",
  txtMySecondary: "text-my-secondary",
  txtMyThird: "text-my-third",
};

export type linkStyles = (keyof typeof linkStyles)[];

interface ILinkProps {
  path: PathsEnum;
  content: string;
  style: linkStyles;
}

const PrimaryLink = ({ path, style, content }: ILinkProps) => {
  return (
    <div className="link-container p-2 rounded rounded-2">
      <Link to={path} className={setAtomicComponentStyle(linkStyles, style)}>
        {content.charAt(0).toUpperCase() + content.slice(1)}
      </Link>
    </div>
  );
};

export default PrimaryLink;
