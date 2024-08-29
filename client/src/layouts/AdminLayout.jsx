import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSidebarToggle = (collapsed) => {
    setIsCollapsed(collapsed);
  };

  return (
    <div className="flex flex-row">
      <Sidebar onToggle={handleSidebarToggle} />
      <div
        className={`transition-all duration-500 ease-in-out min-h-screen bg-gray-200 ${
          isCollapsed ? "w-full pl-20" : "w-full pl-64"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
