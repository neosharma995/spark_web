'use client';
import { useContext, useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { SectorDataContext } from '@/context/apiContext';
import ContactPopup from './popupForm';
import { gsap } from 'gsap';

const ServicesSection = () => {
    const pagesDataApi = useContext(SectorDataContext);
    const mainData = pagesDataApi?.pagesDataApi?.find(page => page.slug === 'our-services')?.acf;
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedService, setSelectedService] = useState('');
    const serviceCardsRef = useRef([]);
    const isScrolling = useRef(false);



    const handleContactClick = (e, serviceName) => {
        e.preventDefault();
        setSelectedService(serviceName);
        setIsPopupOpen(true);
    };

    useEffect(() => {
        const handleScroll = (e) => {
            e.preventDefault();
            if (isScrolling.current) return;
    
            const isScrollDown = e.deltaY > 0;
            const isScrollUP = e.deltaY < 0;

            // Scroll
            if (isScrollDown && activeIndex < serviceCardsRef.current.length - 1) {
                isScrolling.current = true;
                setActiveIndex((prevIndex) => prevIndex + 1);
            }
            else if (isScrollUP && activeIndex > 0 && window.scrollY === 0) {
                isScrolling.current = true;
                setActiveIndex((prevIndex) => prevIndex - 1);
            } else {
                window.scrollBy(0, e.deltaY);
                return;
            }
    
            setTimeout(() => {
                isScrolling.current = false;
            }, 800);
        };
    
        window.addEventListener('wheel', handleScroll, { passive: false });
    
        return () => {
            window.removeEventListener('wheel', handleScroll);
        };
    }, [activeIndex]);
    

    useEffect(() => {
        serviceCardsRef.current.forEach((card, index) => {
            if (index === activeIndex) {
                gsap.fromTo(
                    card,
                    { opacity: 0, y: 100 },
                    { opacity: 1, y: 0, duration: 1 }
                );
            } else {
                gsap.set(card, { opacity: 0, y: 100 });
            }
        });
    }, [activeIndex]);

    return (
        <div className='services testing-demo' style={{ overflow: 'hidden', height: '100vh' }}>
            <div className='page-title'>
                <h1>{mainData?.page_title}</h1>
            </div>
            <div className="service-cards-container">
                {mainData &&
                    mainData.services?.map((service, index) => (
                        <div
                            key={index}
                            className="service-card-outer"
                            style={{
                                backgroundImage: `url(${service.service_background_image})`,
                                top: 0,
                                left: 0,
                                width: '100%',
                                display: activeIndex === index ? 'block' : 'none',
                            }}
                           
                        >
                            <div className="service-card">
                                <div className='service-description'>
                                    <div className='service-count'>
                                        <h2>{index + 1}</h2>
                                    </div>
                                    <div className='service-name'>
                                        <h3>{service.service_name}</h3>
                                    </div>
                                    <div className="main-descp">
                                        <div className="short-description">
                                            <h4>{service.short_description}</h4>
                                        </div>
                                        <div className="long-description">
                                            <p>{service.long_description}</p>
                                        </div>
                                    </div>
                                    <div className="contact-button">
                                        <button
                                            onClick={(e) => handleContactClick(e, service.service_name)}
                                            className='btn'
                                        >
                                            Talk To Our Experts
                                        </button>
                                    </div>
                                </div>
                                <div className='service-image'>
                                    <Image
                                        src={service.service_image}
                                        alt={service.service_title}
                                        layout="responsive"
                                        width={100}
                                        height={50}
                                    />
                                </div>
                            </div>
                            <div className="overlay"></div>
                        </div>
                    ))}
            </div>
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