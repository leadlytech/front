import { Button, Input } from "@/components/ui";
import { Menubar, MenubarMenu, MenubarTrigger } from "@radix-ui/react-menubar";
import { Bell, Globe, Search } from "lucide-react";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-60 w-full h-screen  bg-black text-white shadow-lg z-50">
      
      <div className="flex items-center justify-between px-64 py-4">
        
        <div className="flex items-center gap-4">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger className="text-lg font-serif">Dashboard</MenubarTrigger>
            </MenubarMenu>
          </Menubar>
        </div>

        
        <div className="flex items-center relative">
          <Search size={20} className="absolute left-3 text-white" />
          <Input
            placeholder="Search..."
            className="items-end pl-10 w-64 bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 rounded-lg"
          />
        </div>

        
        <div className="flex items-center gap-4">
          <Button className="hover:text-blue-400">
            <Bell size={20} />
          </Button>
          <Button className="hover:text-blue-400">
            <Globe size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
