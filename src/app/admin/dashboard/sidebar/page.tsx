import { Sidebar as SidebarContainer, SidebarContent, SidebarHeader, SidebarMenu } from "@/components/ui/sidebar";
import {
  MdAnalytics,
  MdAttachMoney,
  MdDashboard,
  MdHelpCenter,
  MdLogout,
  MdOutlineSettings,
  MdPeople,
  MdShoppingBag,
  MdSupervisedUserCircle,
  MdWork
} from "react-icons/md";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";
import { MenuLink } from "./menulink/page";

const menuItems = [
  {
    title: "Pages",
    list: [
      { title: "Dashboard", path: "/dashboard", icon: <MdDashboard /> },
      { title: "Users", path: "/dashboard/users", icon: <MdSupervisedUserCircle /> },
      { title: "Products", path: "/dashboard/products", icon: <MdShoppingBag /> },
      { title: "Transactions", path: "/dashboard/transactions", icon: <MdAttachMoney /> },
    ],
  },
  {
    title: "Analytics",
    list: [
      { title: "Revenue", path: "/dashboard/revenue", icon: <MdWork /> },
      { title: "Reports", path: "/dashboard/reports", icon: <MdAnalytics /> },
      { title: "Teams", path: "/dashboard/teams", icon: <MdPeople /> },
    ],
  },
  {
    title: "Users",
    list: [
      { title: "Settings", path: "/dashboard/settings", icon: <MdOutlineSettings /> },
      { title: "Help", path: "/dashboard/help", icon: <MdHelpCenter /> },
      { title: "Logout", path: "/dashboard/logout", icon: <MdLogout /> },
    ],
  },
];

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarHeader>
        <div className="flex items-center gap-4 px-4 py-6">
          <Avatar className="w-12 h-12">
            <AvatarImage 
              src="/assets/images/no-avatar.jpg" 
              alt="User Avatar" 
              className="object-cover w-full h-full"
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-medium text-white">John Joe</div>
            <div className="text-xs text-gray-400">Administrator</div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          <ul>
            {menuItems.map((category) => (
              <li key={category.title} className="mb-4">
                <span className="block text-sm font-semibold uppercase mb-2 text-gray-400">
                  {category.title}
                </span>
                <ul>
                  {category.list.map((item) => (
                    <li key={item.title} className="mb-1">
                      <MenuLink item={item} />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </SidebarMenu>
      </SidebarContent>
    </SidebarContainer>
  );
};

export default Sidebar;
