import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import DemoModal from "./components/DemoModal";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import FeaturesPage from "./pages/FeaturesPage";
import ThanksPage from "./pages/ThanksPage";
import TermsPage from "./pages/TermsPage";

function AppRoutes() {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  const handleBookDemo = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleDemoSuccess = () => {
    setModalOpen(false);
    setTimeout(() => navigate("/thanks"), 400);
  };

  return (
    <>
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
