import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import AdminLayout from "./components/AdminLayout";
import { AdminAuthProvider, ProtectedAdminRoute } from "./components/AdminAuth";

import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Enquiry from "./pages/Enquiry";
import Locations from "./pages/Locations";
import XeroxProducts from "./pages/XeroxProducts";
import RisoProducts from "./pages/RisoProducts";
import Blog from "./pages/Blog";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminBrands from "./pages/AdminBrands";
import AdminCategories from "./pages/AdminCategories";
import AdminLocations from "./pages/AdminLocations";

function AppShell() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin-panel");

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
          <Route path="/products/:brand/:productId" element={<ProductDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/enquiry" element={<Enquiry />} />

          <Route
            path="/admin-login"
            element={<Navigate to="/admin-panel/login" replace />}
          />

          <Route path="/admin-panel/login" element={<AdminLogin />} />

          <Route element={<ProtectedAdminRoute />}>
            <Route path="/admin-panel" element={<AdminLayout />}>
              <Route
                index
                element={<Navigate to="/admin-panel/dashboard" replace />}
              />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="brands" element={<AdminBrands />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="locations" element={<AdminLocations />} />
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