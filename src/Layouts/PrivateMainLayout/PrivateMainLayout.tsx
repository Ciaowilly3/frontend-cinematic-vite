import { ReactNode } from "react";
import SidePrivateNavMenu from "../../components/SidePrivateNavMenu";

const PrivateMainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3 bg-my-primary">
          <SidePrivateNavMenu />
        </div>
        <div className="col-9">{children}</div>
      </div>
    </div>
  );
};

export default PrivateMainLayout;
