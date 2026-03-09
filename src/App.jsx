import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import DemoModal from "./components/DemoModal";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import FeaturesPage from "./pages/FeaturesPage";
import ThanksPage from "./pages/ThanksPage";
import TermsPage from "./pages/TermsPage";

function TrailingSlashRedirect() {
  const location = useLocation();
  useEffect(() => {
    const { pathname, search, hash } = location;
    if (pathname !== "/" && pathname !== "" && !pathname.endsWith("/")) {
      window.location.replace(pathname + "/" + search + hash);
    }
  }, [location]);
  return null;
}

function AppRoutes() {
  const [modalOpen, setModalOpen] = useState(false);
  const year = new Date().getFullYear();

  const handleBookDemo = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleDemoSuccess = () => {
    setModalOpen(false);
    setTimeout(() => {
      window.location.href = "/thanks/";
    }, 400);
  };

  return (
    <>
      <TrailingSlashRedirect />
      <Routes>
        <Route element={<Layout onBookDemo={handleBookDemo} year={year} />}>
          <Route index element={<HomePage onBookDemo={handleBookDemo} />} />
          <Route path="about" element={<AboutPage onBookDemo={handleBookDemo} />} />
          <Route path="features" element={<FeaturesPage onBookDemo={handleBookDemo} />} />
          <Route path="thanks" element={<ThanksPage />} />
          <Route path="terms" element={<TermsPage />} />
        </Route>
      </Routes>
      <DemoModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        onSuccess={handleDemoSuccess}
      />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
