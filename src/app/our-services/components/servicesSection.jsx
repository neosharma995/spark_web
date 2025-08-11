"use client";
import React, { useEffect, useContext, useState } from "react";
import { gsap } from "gsap";
import ContactPopup from "./popupForm";
import { ScrollTrigger } from "gsap/all";
import Image from 'next/image';
import { SectorDataContext } from "@/context/apiContext";

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {


  const pagesDataApi = useContext(SectorDataContext);
  const [selectedService, setSelectedService] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const mainData = pagesDataApi?.pagesDataApi?.find(
    (page) => page.slug === "our-services"
  )?.acf;

  console.log("mainData", mainData);

  const pageTitle =
    pagesDataApi?.pagesDataApi?.find((page) => page.slug === "our-services")
      ?.title?.rendered || "";

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
          backgroundPosition: `50% ${
            window.innerHeight * (1 - getRatio(section))
          }px`,
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
    <div className='container'>
       <div className="services-section">
        <div className='page-title'>
          <h1>{pageTitle}</h1>
        </div>
        
      {mainData?.services.map((service, index) => (
        <div className="inner-section" key={index}>
          <section className="panel">
          
            <div className="inner-service-content">
              <div className="service-text">
                <div className="section-number"> <span>{index + 1}</span></div>
                <div className="text-card">{service.service_name}</div>
                <p className="subheading">{service.short_description}</p>
                <p className="pharagraph">{service.long_description}</p>

                <div className="contact-button">
                  <button
                    onClick={(e) => handleContactClick(e, service.service_name)}
                    className="btn"
                  >
                    Talk To Our Experts
                  </button>
                </div>
              </div>
              <div className="service-img">
                  <Image src={service.service_image}
                      alt={service.service_image}
                      className=''
                      layout="responsive"
                      width={100}
                      height={100}
                  />
                
              </div>
            </div>
          </section>
        </div>
      ))}

      <ContactPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        serviceNames={
          mainData?.services?.map((service) => service.service_name) || []
        }
        selectedService={selectedService}
      />
    </div>
    </div>
   
  );
};

export default ServicesSection;
