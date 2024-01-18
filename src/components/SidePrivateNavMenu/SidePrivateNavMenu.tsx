import { Link } from "react-router-dom";
import { PathsEnum } from "../../enums/priorityEnum";

const SidePrivateNavMenu = () => (
  <div className="d-flex flex-column">
    <Link to={PathsEnum.PRIVATE}>private area</Link>
    <Link to={PathsEnum.PRIVATE_FILMS}>films area</Link>
    <Link to={PathsEnum.PRIVATE_ACTORS}>actors area</Link>
  </div>
);
export default SidePrivateNavMenu;
