'use client';

import { ThreeRenderScene } from '@/components/ThreeScene'
import SecondSectionOld from './Components/secondSection'
import SecondSectionResponsive from './Components/secondSectionResponsive'
import AboutUsSection from './Components/aboutUsSection';
import HomeOurService from './Components/ourServices';
import FullScreenView from './Components/fullScreen';

import TestimonialSection from './Components/testimonialSection';
import ProjectSection from './Components/projectSection';
import ProjectSectionResp from './Components/ProjectSectionResp';
import HomeOurServiceResp from './Components/OurServiceResp';
import { useEffect, useRef, useState } from 'react';




function HomePage() {


  let section_0 = 'section_0'
  let section_1 = 'section_1'
  let section_2 = 'section_2'
  let section_3 = 'section_3'
  let section_4 = 'section_4'
  let section_5 = 'section_5'

  const [showButton, setShowButton] = useState(true);
  const secondSectionRef = useRef(null);
  const firstSectionRef = useRef(null);

  const handleScroll = () => {
    if (!secondSectionRef.current || !firstSectionRef.current) return;

    const secondSectionTop = secondSectionRef.current.getBoundingClientRect().top;
    const firstSectionBottom = firstSectionRef.current.getBoundingClientRect().bottom;

    if (secondSectionTop <= 0) {
      setShowButton(false);
    } else if (firstSectionBottom >= 0) {
      setShowButton(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSecondSection = () => {
    if (secondSectionRef.current) {
      secondSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error('secondSectionRef is not defined');
    }
  };





  return (
    <>

      <FullScreenView />

      {showButton && (
        <button id="scrollDown" onClick={scrollToSecondSection}>
          <img src="./images/swipe-down.png" alt="" />
        </button>
      )}

      <div className={`${section_0} section_outer_wrapper`} ref={firstSectionRef}>

        <ThreeRenderScene />
      </div>

      <div className="second-section-animated" ref={secondSectionRef}>
        <div className={`${section_1} section_outer_wrapper`}>
          <SecondSectionOld section_1={section_1} />
        </div>
      </div>
      <div className="second-section-redponsive container" ref={secondSectionRef}>
        <SecondSectionResponsive />
      </div>


      <div className={`${section_2} section_outer_wrapper`}>
        <AboutUsSection />
      </div>

      <div className={`${section_3} section_outer_wrapper`}>
        <HomeOurService section_3={section_3} />
      </div>

      <div className="our_services_section_resp" id='service_p_r_view'>
        <HomeOurServiceResp />
      </div>



      <div className={`${section_4} section_outer_wrapper`}>
        <ProjectSection section_4={section_4} />
      </div>




      <div className="project_section_resp" id='p_r_view'>
        <ProjectSectionResp />
      </div>


      <div className={`${section_5} section_outer_wrapper`}>
        <TestimonialSection />
      </div>

    </>
  )
}

export default HomePage                     