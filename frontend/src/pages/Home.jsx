import React from "react";
import Hero from "../components/Home/Hero";
import Feature from "../components/Home/Feature";
import FeatureProducts from "../components/Home/FeatureProducts";

import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import Testimonials from "../components/Home/Testimonials";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Feature />
      <FeatureProducts />
      <Testimonials/>
      <Footer />
    </div>
  );
};

export default Home;
