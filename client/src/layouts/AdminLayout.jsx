import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"


const AdminLayout = () => {
  return (
    <div>
      {/* sidebar */}
      <div>
        <Sidebar />
      </div>
      {/* main */}
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout