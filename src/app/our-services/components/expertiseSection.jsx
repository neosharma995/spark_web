'use client';
import React, { useContext, useEffect, useRef } from 'react';
import { SectorDataContext } from '@/context/apiContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ExpertiseSection = () => {
    const pagesDataApi = useContext(SectorDataContext);
    const mainData = pagesDataApi?.pagesDataApi?.find(page => page.slug === 'our-services')?.acf;
    console.log(mainData)

    const expertiseList1Ref = useRef(null);
    const expertiseList2Ref = useRef(null);
    const scrollDirection = useRef('down'); // Keeps track of scroll direction

    const list1AnimRef = useRef(null);
    const list2AnimRef = useRef(null);

    useEffect(() => {
        let lastScroll = 0;

        const updateScrollDirection = () => {
            const currentScroll = window.scrollY;
            scrollDirection.current = currentScroll > lastScroll ? 'down' : 'up';
            lastScroll = currentScroll;
        };

        window.addEventListener('scroll', updateScrollDirection);

        const duplicateContentIfNeeded = (container) => {
            const items = Array.from(container.children);
            const parentWidth = container.parentElement.offsetWidth;
            let contentWidth = container.scrollWidth;

            // Duplicate the content until it fills at least 3x the parent width
            while (contentWidth < parentWidth * 3) {
                items.forEach((item) => {
                    container.appendChild(item.cloneNode(true));
                });
                contentWidth = container.scrollWidth;
            }
        };

        // Duplicate content for both lists
        if (expertiseList1Ref.current) duplicateContentIfNeeded(expertiseList1Ref.current);
        if (expertiseList2Ref.current) duplicateContentIfNeeded(expertiseList2Ref.current);

        // Animation for first list
        const animateList1 = () => {
            const container = expertiseList1Ref.current;
            return gsap.to(container, {
                x: () => (scrollDirection.current === 'down' ? -container.scrollWidth / 3 : container.scrollWidth / 3),
                repeat: -1,
                duration: 20,
                ease: 'none',
                modifiers: {
                    x: gsap.utils.unitize((x) => parseFloat(x) % (container.scrollWidth / 3)), // Seamless loop
                },
            });
        };

        // Animation for second list
        const animateList2 = () => {
            const container = expertiseList2Ref.current;
            return gsap.to(container, {
                x: () => (scrollDirection.current === 'down' ? container.scrollWidth / 3 : -container.scrollWidth / 3),
                repeat: -1,
                duration: 20,
                ease: 'none',
                modifiers: {
                    x: gsap.utils.unitize((x) => parseFloat(x) % (container.scrollWidth / 3)), // Seamless loop
                },
            });
        };

        // Store animations in refs
        list1AnimRef.current = animateList1();
        list2AnimRef.current = animateList2();

        ScrollTrigger.create({
            onUpdate: () => {
                list1AnimRef.current.invalidate().restart(); // Restart animation with updated direction
                list2AnimRef.current.invalidate().restart();
            },
        });

        return () => {
            window.removeEventListener('scroll', updateScrollDirection);
            list1AnimRef.current.kill();
            list2AnimRef.current.kill();
        };
    }, []);

    // Pause animations on hover
    const handleMouseEnter = () => {
        list1AnimRef.current.pause();
        list2AnimRef.current.pause();
    };

    // Resume animations on mouse leave
    const handleMouseLeave = () => {
        list1AnimRef.current.play();
        list2AnimRef.current.play();
    };

    return (
        <div className='expertise'>
            <h1>{mainData?.expertise_section_heading}</h1>
            <div
                className='expertises-list'
                ref={expertiseList1Ref}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {mainData?.expertise?.map((card, index) => (
                    <div key={index} className="expertise-card">
                        <div className='card_1'>
                            <div className="card-icon">
                                <img src={card.expertise_icon} alt={card.card_heading} />
                            </div>
                            <div className="card-description">
                                <h3>{card.expertise_heading}</h3>
                                <p>{card.expertise_sub_heading}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          
            <div
                className='expertises-list reverse'
                ref={expertiseList2Ref}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {mainData?.expertise_2?.map((card, index) => (
                    <div key={index} className="expertise-card">
                        <div className='card_1'>
                            <div className="card-icon">
                                <img src={card.expertise_icon} alt={card.card_heading} />
                            </div>
                            <div className="card-description">
                                <h3>{card.expertise_heading}</h3>
                                <p>{card.expertise_sub_heading}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExpertiseSection;
