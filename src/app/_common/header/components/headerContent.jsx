'use client';
import { useContext, useState, useEffect, useRef } from 'react';
import { SectorDataContext } from '@/context/apiContext';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu, FiX } from 'react-icons/fi';
import EnquiryPopup from '../../popup/enqueryPopup';
import StickeyForm from '../../stickeyForm/stickeyForm';
import Logo from '../../logo/logo';
import { FaMobile } from "react-icons/fa";

import { gsap } from 'gsap';
import { useTheme } from '@/context/ThemeContext';
 

const HeaderContent = () => {
  const { isLightMode, toggleTheme } = useTheme();

  const { headerDataApi } = useContext(SectorDataContext);
  const mainData = headerDataApi?.find((page) => page.slug === 'header')?.acf;

  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isStickyFormOpen, setIsStickyFormOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const popupRef = useRef(null);
  const stickyFormRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Setup audio
  useEffect(() => {
    if (mainData?.music) {
      const audioFile = new Audio(mainData.music);
      setAudio(audioFile);
    }
    return () => {
      if (audio) audio.pause();
    };
  }, [mainData?.music]);

  const toggleMusic = () => {
    if (audio) {
      if (isPlaying) {
        audio.muted = true;
      } else {
        audio.muted = false;
        if (audio.paused) audio.play();
      }
      setIsPlaying(!isPlaying);
      setIsMobileMenuOpen(false);
    }
  };

  const toggleDarkMode = () => {
   
    setIsMobileMenuOpen(false);
  };

 

  const togglePopup = () => {
    setIsPopupOpen((prev) => !prev);
    setIsMobileMenuOpen(false);
  };

  const toggleStickyForm = () => {
    setIsStickyFormOpen((prev) => !prev);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Automatically close mobile menu if the window width is more than 1024px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    // Check initial width (in case user refreshes on a wide screen)
    if (window.innerWidth > 1024) {
      setIsMobileMenuOpen(false);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]);

  // Animate mobile menu appearance/disappearance using GSAP
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power4.out' }
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: 'power3.in',
        });
      }
    }
  }, [isMobileMenuOpen]);

  // Function to close mobile menu after clicking a link.
  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div>
      <div className="header">
        <div className="call-header-buttons">
          <Link href={`tel:${mainData?.contact_no}`} className="desktop-call">            
           <span>
           <FaMobile />
           <h3>{mainData?.contact_no}</h3>
           </span>
          </Link>
          <button onClick={toggleStickyForm} className="sticky-form-button">
            <img src='/images/support.png' />
            <span className='enq-now-text'>
              Enquiry Now
            </span> 
          </button>
          <div className="mobile-call mobile-menu-1-icons">
            <div className="menu-item" onClick={togglePopup}>
              <Image src={mainData?.enquery_icon} alt="Enquiry Icon" width={30} height={30} />
            </div>
            <div className="menu-item" onClick={toggleMusic}>
              <Image src={mainData?.music_icon} alt="Music Icon" width={30} height={30} />
            </div>
          </div>
        </div>

        {/* Header Logo */}
        <div className="header-logo-main">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        {/* Desktop Icons (Hidden in Mobile) */}
        <div className="icons desktop-icons">
          <Image
            src={mainData?.enquery_icon}
            alt="Enquiry Icon"
            onClick={togglePopup}
            width={35}
            height={35}
            style={{ cursor: 'pointer' }}
          />
          <Image
            src={isLightMode ? mainData?.dark_mode_icon : mainData?.light_mode_icon}
            alt="Mode Icon"
            className="lite-dark-mode"
            onClick={toggleTheme}
            width={35}
            height={35}
            style={{ cursor: 'pointer' }}
          />
          <Image
            src={mainData?.music_icon}
            alt="Music Icon"
            onClick={toggleMusic}
            width={35}
            height={35}
            style={{ cursor: 'pointer' }}
          />
        </div>

        <div className="mobile-menu-2-icons">
          <div className="menu-item" onClick={toggleDarkMode}>
            <Image
              src={isLightMode ? mainData?.dark_mode_icon : mainData?.light_mode_icon}
              alt="Mode Icon"
              width={30}
              height={30}
              onClick={toggleTheme}
            />
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="hamburger-menu" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
          </div>
        </div>

        {/* Mobile Menu Dropdown with Icons */}
        {isMobileMenuOpen && (
          <div className="mobile-menu" ref={mobileMenuRef}>
            <nav>
              <ul>
                <li>
                  <Link href="/" onClick={handleMobileLinkClick}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about-us" onClick={handleMobileLinkClick}>
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/internship" onClick={handleMobileLinkClick}>
                    Internship
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio" onClick={handleMobileLinkClick}>
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link href="/our-services" onClick={handleMobileLinkClick}>
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link href="/blog" onClick={handleMobileLinkClick}>
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us" onClick={handleMobileLinkClick}>
                    Get In Touch
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>

      {/* Sticky Form */}
      {isStickyFormOpen && (
        <div className="stikey-side-popup" ref={stickyFormRef}>
          <StickeyForm onClose={toggleStickyForm} />
        </div>
      )}

      {/* Enquiry Popup */}
      {isPopupOpen && (
        <div className="enquery-popup" ref={popupRef}>
          <EnquiryPopup onClose={togglePopup} />
        </div>
      )}
    </div>
  );
};

export default HeaderContent;
