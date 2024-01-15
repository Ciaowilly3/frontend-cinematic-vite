import { Link } from "react-router-dom";

const SidePrivateNavMenu = () => (
  <div className="d-flex flex-column">
    <Link to={"/private"}>private area</Link>
    <Link to={"/private/films"}>films area</Link>
    <Link to={"/private/actors"}>actors area</Link>
  </div>
);
export default SidePrivateNavMenu;
