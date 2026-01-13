import React from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/hooks/useScrollToTop";

import { Outlet } from "react-router";
const MainLayout = () => {
  return (
    <>
      <header className="container-fluid">
        <Header />
      </header>
      <ScrollToTop />

      <main>
        <Outlet />
      </main>
      <footer className="container-fluid">
        <Footer />
      </footer>
    </>
  );
};

export default MainLayout;
