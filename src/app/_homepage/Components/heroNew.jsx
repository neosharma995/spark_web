"use client";
import React from "react";
import HeroParticles from "./heroPartical";


const HeroNew = () => {
  return (
    <section className="hero-new">
      <HeroParticles />
      <div className="container">
        <div className="hero-heading">
         We design experiences that <span> grow your brand </span>and your customer base
        </div>
        <p className="hero-subheading">Spark Web Solutions helps you create a powerful digital identity that drives growth, builds trust, and turns visitors into loyal customers.</p>
        <div className="hero-buttons">
          <a href="#contact" className="hero-button"><span>Start Here</span></a>
        </div>
      </div>
    </section>
  );
};

export default HeroNew;
