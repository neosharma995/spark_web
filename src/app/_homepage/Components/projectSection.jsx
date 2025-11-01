'use client';

import { useContext, useEffect, useState, useRef } from 'react';
import { SectorDataContext } from '@/context/apiContext';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProjectSection = ({ section_4 }) => {
  const pagesDataApi = useContext(SectorDataContext);
  const mainData =
    pagesDataApi?.pagesDataApi?.find((page) => page.slug === 'home')?.acf?.projects_section;

  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!section_4) return;

    const sections = gsap.utils.toArray('.prog_content');
    if (sections.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: `.${section_4}`,
        pin: true,
        start: 'top top',
         end: '+=4000',
        scrub: 4,
        snap: {
          snapTo: 2 / (sections.length - 1),
          duration: { min: 2, max: 4 },
          delay: 4,
          ease: 'power1.inOut',
        },
        onUpdate: (self) => {
          const progress = self.progress.toFixed(2);
          const newIndex = Math.round(progress * (sections.length - 1));
          setActiveIndex(newIndex);
        },
      },
    });

    // Animate sections vertically
    tl.to(sections, {
      yPercent: -100 * (sections.length - 1),
      ease: 'none',
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [section_4]);

  return (
    <div className="container" id="proj_container" ref={containerRef}>
      <div className="proj_heading">
        <h2>{mainData?.heading}</h2>
      </div>

      <div className="proj_left_section">
        {mainData?.projects?.map((project, index) => (
          <div
            key={index}
            className={`proj_images ${index === activeIndex ? 'active' : ''}`}
          >
            <img src={project.image} alt={project.name} />
          </div>
        ))}
      </div>

      <div className="proj_right_section">
        <div className="proj_section">
          {mainData?.projects?.length > 0 ? (
            mainData.projects.map((project, index) => (
              <div
                key={index}
                className={`prog_content ${index === activeIndex ? 'active' : ''}`}
              >
                <h1>{index + 1}</h1>
                <h4>{project.name}</h4>
                <p>{project.description}</p>
              </div>
            ))
          ) : (
            <p>No projects available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectSection;
