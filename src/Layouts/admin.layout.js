import react from "react";
import DemoNavbar from "../Components/DemoNavbar";
import SideNavbar from "../Components/SideNavbar";

const AdminLayout = (props) => {
  return (
    <>
      <div>
        <DemoNavbar />
        <div className="flex w-full lg:gap-10">
          <SideNavbar />
          {props.children}
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
