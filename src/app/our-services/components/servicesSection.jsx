"use client";
import React, { useEffect, useContext, useState } from "react";
import { gsap } from "gsap";
import ContactPopup from './popupForm';
import { ScrollTrigger } from "gsap/all";
import { SectorDataContext } from '@/context/apiContext';

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  const pagesDataApi = useContext(SectorDataContext);
  const [selectedService, setSelectedService] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const mainData = pagesDataApi?.pagesDataApi?.find(page => page.slug === 'our-services')?.acf;

  console.log('mainData', mainData);

  const handleContactClick = (e, serviceName) => {
    e.preventDefault();
    setSelectedService(serviceName);
    setIsPopupOpen(true);
  };

  useEffect(() => {
    const getRatio = (el) =>
      window.innerHeight / (window.innerHeight + el.offsetHeight);

    gsap.utils.toArray("section").forEach((section) => {
      const bgElement = section.querySelector(".bg");
      if (!bgElement) return;

      section.bg = bgElement;

      gsap.fromTo(
        section.bg,
        {
          backgroundPosition: "50% 0px",
        },
        {
          backgroundPosition: `50% ${window.innerHeight * (1 - getRatio(section))}px`,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    });
  }, [mainData]);

  return (
    <div className="services-section">
      {mainData?.services.map((service, index) => (
        <div key={index}>
          <section className="panel">
            <div
              className="bg"
              style={{ 
                        backgroundImage: `url(${service.service_background_image})`, 
                        
                      }}
            >
                </div>
              <div className="inner-service-content">

                <h1>{service.service_name}</h1>
                <p>{service.short_description}</p>
                <p>{service.long_description}</p>
                <div className="contact-button">
                  <button
                    onClick={(e) => handleContactClick(e, service.service_name)}
                    className="btn"
                  >
                    Talk To Our Experts
                  </button>
              </div>
            </div>
          </section>
        </div>
      ))}

      <ContactPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        serviceNames={mainData?.services?.map(service => service.service_name) || []}
        selectedService={selectedService}
      />
    </div>
  );
};

export default ServicesSection;
