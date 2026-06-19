import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import AdminLayout from "./admin/components/AdminLayout";
import CrudPage from "./admin/CrudPage";
import Dashboard from "./admin/Dashboard";
import AdminLogin from "./admin/AdminLogin";
import { AdminAuthProvider, ProtectedAdminRoute } from "./admin/auth";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Enquiry from "./pages/Enquiry";
import Locations from "./pages/Locations";
import XeroxProducts from "./pages/XeroxProducts";
import RisoProducts from "./pages/RisoProducts";

function AppShell() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin-panel") || location.pathname === "/admin-login";

  return (
    <>
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/xerox" element={<XeroxProducts />} />
          <Route path="/products/riso" element={<RisoProducts />} />
          <Route path="/services" element={<Services />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/enquiry" element={<Enquiry />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route element={<ProtectedAdminRoute />}>
            <Route path="/admin-panel" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path=":moduleName" element={<CrudPage />} />
            </Route>
          </Route>
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <AppShell />
      </AdminAuthProvider>
    </BrowserRouter>
  );
}

export default App;
