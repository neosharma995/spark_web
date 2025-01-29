"use client";
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import imagesLoaded from "imagesloaded";

gsap.registerPlugin(ScrollTrigger);

const ExpertiseSection = () => {
  useEffect(() => {
    const images = gsap.utils.toArray("img");
    const loader = document.querySelector(".loader--text");

    const updateProgress = (instance) => {
      loader.textContent = `${Math.round(
        (instance.progressedCount * 100) / images.length
      )}%`;
    };

    const showDemo = () => {
      document.body.style.overflow = "auto";
      document.scrollingElement.scrollTo(0, 0);
      gsap.to(document.querySelector(".loader"), { autoAlpha: 0 }); 

      gsap.utils.toArray("section").forEach((section, index) => {
        const wrapper = section.querySelector(".wrapper");
        if (!wrapper) return;

        const [x, xEnd] =
          index % 2
            ? ["100%", (wrapper.scrollWidth - section.offsetWidth) * -1]
            : [wrapper.scrollWidth * -1, 0];

        gsap.fromTo(
          wrapper,
          { x },
          {
            x: xEnd,
            scrollTrigger: {
              trigger: section,
              scrub: 0.5, 
            },
          }
        );
      });
    };

    imagesLoaded(images).on("progress", updateProgress).on("always", showDemo);
  }, []);

  return (
    <div className="expertise-section">
      <div className="loader df aic jcc">
        <div>
          <h1>Loading</h1>
          <h2 className="loader--text">0%</h2>
        </div>
      </div>

      <div className="demo-wrapper">
            <section className="demo-text">
          <div className="wrapper text">EXPERTISE</div>
        </section>

        {[...Array(4)].map((_, i) => (
          <section className="demo-gallery" key={i}>
            <ul className="wrapper">
              {[...Array(Math.floor(Math.random() * 2) + 3)].map((_, j) => (
                <li key={j}>
                  <img
                    src={`/images/pexels-eberhardgross-448714.jpg`}
                    width="1240"
                    height="874"
                    alt="Random"
                  />
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="demo-text">
        
        </section>
      </div>
    </div>
  );
};

export default ExpertiseSection;
