import React from "react";
import Hero from "./sections/HeroSection";
import Footer from "./sections/FooterSection";
import ProductShowcaseSection from "./sections/ProductShowcase";
import FeaturesSection from "./sections/FeaturesSection";
import Navbar from "../../components/Navbar/Navbar";

const Landing = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      
      <ProductShowcaseSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Landing;
