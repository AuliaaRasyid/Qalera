import { Route, Routes } from "react-router-dom";
import Home from "./pages/companyprofile/Home";
import CompanyProfile from "./layouts/CompanyProfile";
import Aboutus from "./pages/companyprofile/Aboutus";
import Products from "./pages/companyprofile/Products";
import Careers from "./pages/companyprofile/Careers";
import Contact from "./pages/companyprofile/Contact";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLayout from "./layouts/AdminLayout";
import DashboardCareers from "./pages/dashboardadmin/DashboardCareers";
import DashboardProducts from "./pages/dashboardadmin/DashboardProducts";
import DashboardTeams from "./pages/dashboardadmin/DashboardTeams";
import DashboardPartners from "./pages/dashboardadmin/DashboardPartners";
import DashboardTestimoni from "./pages/dashboardadmin/DashboardTestimoni";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* company profile */}
        <Route path="/" element={<CompanyProfile />}>
          <Route index element={<Home />} />
          <Route path="/about-us" element={<Aboutus />} />
          <Route path="/products" element={<Products />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* dashboard admin */}
        <Route path="/dashboard" element={<AdminLayout />}>
          <Route path="/dashboard/careers" element={<DashboardCareers />} />
          <Route path="/dashboard/products" element={<DashboardProducts />} />
          <Route path="/dashboard/teams" element={<DashboardTeams />} />
          <Route path="/dashboard/partners" element={<DashboardPartners/>} />
          <Route path="/dashboard/testimoni" element={<DashboardTestimoni />} />

        </Route>

        {/* 404 page not found */}
        <Route path="*" element={<div>404 page not found</div>} />
      </Routes>
    </div>
  );
};

export default App;
