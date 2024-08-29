import { Route, Routes } from "react-router-dom"
import AdminLayout from "./layouts/AdminLayout"
import Dashboard from "./pages/Dashboard/Dashboard"
import NotFound from "./pages/NotFound"
import Partners from "./pages/dashboard/Partners"
import Testimonials from "./pages/dashboard/Testimonials"
import Teams from "./pages/dashboard/Teams"
import Products from "./pages/dashboard/Products"
import Careers from "./pages/dashboard/Careers"


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/dashboard" element={<AdminLayout />} >
          <Route index element={<Dashboard />} />
          <Route path="/dashboard/partners" element={<Partners />} />
          <Route path="/dashboard/testimonials" element={<Testimonials />} />
          <Route path="/dashboard/teams" element={<Teams />} />
          <Route path="/dashboard/products" element={<Products />} />
          <Route path="/dashboard/careers" element={<Careers />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App