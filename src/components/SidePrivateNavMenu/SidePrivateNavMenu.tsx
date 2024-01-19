import { PathsEnum } from "../../enums/PathsEnum";
import PrimaryLink from "../PrimaryLink";

const SidePrivateNavMenu = () => {
  return (
    <div className="d-flex flex-column">
      {Object.entries(PathsEnum)
        .filter(([key]) => key.startsWith("PRIVATE"))
        .map(([key, value]) => (
          <PrimaryLink
            key={key}
            path={value}
            content={value.replace(/[^a-zA-Z\s]/g, "")}
            linkStyles={["linkFlush", "txtMySecondary"]}
          />
        ))}
    </div>
  );
};

export default SidePrivateNavMenu;
