import { Link } from "react-router-dom";
import { PathsEnum } from "../../enums/PathsEnum";
import {
  Style,
  setAtomicComponentStyle,
  styles,
} from "../../utils/setAtomicComponentStyle";

interface ILinkProps {
  path: PathsEnum;
  content: string;
  linkStyles: Style;
}

const PrimaryLink = ({ path, linkStyles, content }: ILinkProps) => {
  return (
    <Link to={path} className={setAtomicComponentStyle(styles, linkStyles)}>
      {content}
    </Link>
  );
};

export default PrimaryLink;
