'use client';

import { useContext, useState, useRef, useEffect } from 'react';
import { SectorDataContext } from '@/context/apiContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import './secondSection.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const SecondSection = ({ section_1 }) => {
    const pagesDataApi = useContext(SectorDataContext);
    const mainData = pagesDataApi?.pagesDataApi?.find(page => page.slug === 'home')?.acf?.second_section || [];

    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRefs = useRef([]);
    const containerRef = useRef(null);

    useEffect(() => {
        if (!section_1 || mainData.length === 0) return;

        let sections = gsap.utils.toArray('.content_section_wrapper');
        if (sections.length === 0) return;
        

        // Enhanced smooth scrolling with more refined parameters
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: `.${section_1}`,
                pin: true,
                start: 'top top',
                 end: '+=3000',
                scrub: 1.2, 
                snap: {
                    snapTo: 1 / (sections.length - 1),
                    duration: { min: 0.2, max: 0.6 },
                    delay: 3,
                    ease: 'power1.inOut'
                },
                onUpdate: (self) => {
                    let newIndex = Math.round(self.progress * (mainData.length - 1));
                    setActiveIndex(newIndex);
                },
            }
        });

        // Animate sections vertically
        tl.to(sections, {
            yPercent: -100 * (sections.length - 1),
            ease: 'none'
        });
    }, [section_1, mainData]);

    const scrollToSection = (index) => {
        if (sectionRefs.current[index]) {
            setActiveIndex(index);  

            gsap.to(window, {
                scrollTo: {
                    y: sectionRefs.current[index].offsetTop, 
                    autoKill: false
                },
                duration: 0.8,  
                ease: 'power2.inOut',
            });
        }
    };

    return (
        <div className='both_section_tabs container'>
            <h1 className='process_c'>Our Process</h1>
        <div 
            className="container" 
            id="section_section" 
            ref={containerRef}
        >
           
            {/* Left Section - Tabs */}
          
            <div className="left_section">           
              <div className="tab_left_img">
              <img class="dark-version" src="./images/circle.png" alt="" />
              <img class="light-version" src ="./images/light-process-section.png" alt =""/>
              </div>
                <div className="tabs_holder">
                    <div className="tabs">
                        {mainData?.map((section, sectionIndex) => (
                            <div
                                key={sectionIndex}
                                className={`tab ${activeIndex === sectionIndex ? 'active' : ''}`}
                                onClick={() => scrollToSection(sectionIndex)}  
                            >
                                {section?.main_heading || `Section ${sectionIndex + 1}`}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Section - Content */}
            <div className="right_section">
                <div className="second_section">
                    {mainData?.map((section, sectionIndex) => (
                        <div
                            key={sectionIndex}
                            className={`content_section_wrapper ${activeIndex === sectionIndex ? 'active' : ''}`}
                            ref={(el) => (sectionRefs.current[sectionIndex] = el)}
                        >
                          <div className="des_flex">
                           <h1>{sectionIndex+1}</h1>
                            <div className="description_outer">
                                {(Array.isArray(section?.scroll_menu) ? section.scroll_menu : []).map((item, itemIndex) => (
                                    <div key={itemIndex} className="description_area">
                                        <h3>{item?.heading || `Heading ${itemIndex + 1}`}</h3>
                                        <p>{item?.description || `Description ${itemIndex + 1}`}</p>
                                    </div>
                                ))}
                            </div>
                          </div>
                        </div>
                    ))}
                </div>
            </div>

            </div>
        </div>
    );
};

export default SecondSection;