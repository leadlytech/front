import Navbar from "@/app/admin/dashboard/navbar/page";
import { Sidebar } from "@/components/ui";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <div className= "flex-1 bg-[var(--bgSoft)]">
        <Sidebar/>
      </div>
      <div className= "flex-[4]">
        <Navbar/>
        {children}
      </div>
    </div>
  );
};

export default Layout;
