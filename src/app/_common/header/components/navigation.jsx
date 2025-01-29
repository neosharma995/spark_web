'use client';
import React, { useState, useRef, useEffect, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SectorDataContext } from '@/context/apiContext';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Navigation = () => {
  const [isNavVisible, setNavVisible] = useState(false);
  const [isLoremVisible, setLoremVisible] = useState(false);
  // isScrolling will be true when user scrolls down more than 20px.
  // When at the top, we always show the inner navigation (Menu/Contact).
  const [isScrolling, setScrolling] = useState(false);

  const navRef = useRef(null);
  const loremRef = useRef(null);
  const navContainerRef = useRef(null);
  const scrollImgRef = useRef(null);

  const pagesDataApi = useContext(SectorDataContext);
  const mainData = pagesDataApi?.pagesDataApi?.find((page) => page.slug === 'contact-us')?.acf;
  const { headerDataApi } = useContext(SectorDataContext);
  const mainDataHeader = headerDataApi?.find((page) => page.slug === 'header')?.acf;

  // Functions to open either menu or contact with a hover delay.
  const toggleNav = () => {
    // Delay the menu display by 0.3s before setting state
    gsap.delayedCall(0.3, () => {
      setNavVisible(true);
      setLoremVisible(false);
    });
  };

  const toggleLorem = () => {
    gsap.delayedCall(0.3, () => {
      setLoremVisible(true);
      setNavVisible(false);
    });
  };

  const closeBoth = () => {
    // Animate close for each open section if needed
    setNavVisible(false);
    setLoremVisible(false);
  };

  // When hovering over the scroll image, remove the scrolling state with a delay.
  const handleScrollImageHover = () => {
    gsap.delayedCall(0.3, () => {
      setScrolling(false);
    });
  };

  // When mouse leaves the scroll image, bring it back after a delay.
  const handleScrollImageLeave = () => {
    gsap.delayedCall(0.3, () => {
      setScrolling(true);
    });
  };

  // --- GSAP Animations ---

  // Animate the scroll image when isScrolling changes.
  useEffect(() => {
    if (scrollImgRef.current) {
      if (isScrolling) {
        // Animate scroll image in: fade and scale in
        gsap.killTweensOf(scrollImgRef.current);
        gsap.fromTo(
          scrollImgRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out', delay: 0.2 }
        );
      } else {
        // Animate scroll image out
        gsap.killTweensOf(scrollImgRef.current);
        gsap.to(scrollImgRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          ease: 'power3.in',
          delay: 0.2
        });
      }
    }
  }, [isScrolling]);

  // Animate menu section open and close on hover or click.
  useEffect(() => {
    if (isNavVisible && navRef.current) {
      gsap.killTweensOf(navRef.current);
      gsap.fromTo(
        navRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.2 }
      );
    } else if (!isNavVisible && navRef.current) {
      gsap.killTweensOf(navRef.current);
      gsap.to(navRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: 'power3.in',
        delay: 0.2
      });
    }
  }, [isNavVisible]);

  // Animate contact section open and close on hover or click.
  useEffect(() => {
    if (isLoremVisible && loremRef.current) {
      gsap.killTweensOf(loremRef.current);
      gsap.fromTo(
        loremRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.2 }
      );
    } else if (!isLoremVisible && loremRef.current) {
      gsap.killTweensOf(loremRef.current);
      gsap.to(loremRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: 'power3.in',
        delay: 0.2
      });
    }
  }, [isLoremVisible]);

  // GSAP scroll trigger for the container
  useEffect(() => {
    gsap.to(navContainerRef.current, {
      scrollTrigger: {
        trigger: navContainerRef.current,
        start: 'top top+=20', // Trigger when the top is 20px from top
        toggleClass: { targets: navContainerRef.current, className: 'scrolled-nav' },
        onEnter: () => setScrolling(true),
        onLeaveBack: () => setScrolling(false)
      }
    });
  }, []);

  // Listen for window scroll events.
  // When the user scrolls beyond 20px, we reset any open menus and show the scroll image.
  // Otherwise (at the top), we hide the scroll image and always show the navigation inner.
  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY > 20) {
        setScrolling(true);
        closeBoth();
      } else {
        // At the top, always show the inner navigation (buttons) and hide the scroll image.
        setScrolling(false);
      }
    };
    window.addEventListener('scroll', handleWindowScroll);
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  const handleNavLinkClick = () => {
    closeBoth();
  };

  // --- (Optional) Hover animations for menu (if you need additional effects on menu items, add them here) ---
  // For example, you could add delay on hover in/out for menu items.
  // For now, these are not attached to the links so they won't interfere with your base code.
  // Uncomment and adjust if needed:
  //
  // const handleMenuHover = (e) => {
  //   gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3, ease: 'power3.out', delay: 0.1 });
  // };
  // const handleMenuHoverOut = (e) => {
  //   gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: 'power3.in', delay: 0.1 });
  // };

  return (
    <div
      className={`navigation-container ${isScrolling ? 'scrolled-nav' : ''}`}
      ref={navContainerRef}
    >
      {/* When scrolling, display the scroll image */}
      <div className="scroll-img" ref={scrollImgRef}>
        {isScrolling && (
          <div onMouseEnter={handleScrollImageHover} onMouseLeave={handleScrollImageLeave} className="xyz">
            <Image
              className="nav-logo-menu"
              src={mainDataHeader?.scroll_image_menu}
              alt="Logo"
              layout="responsive"
              width={100}
              height={100}
            />
          </div>
        )}
      </div>
      

      {/* Always show navigation inner when not scrolling.
          On top, the inner navigation (Menu/Contact) is always visible. */}
      {!isScrolling && (
        <div className="navigation-inner">
          {isNavVisible && (
            <div className="nav-wrapper" ref={navRef}>
              <div className="menu-wrapper-main">
                {/* Hover on the logo may also trigger the menu open */}
                <div onMouseEnter={toggleNav}>
                  <Link href="/" className="nav-link-logo-menu">
                    <Image
                      className="nav-logo-menu"
                      src={mainDataHeader?.lite_mode_logo}
                      alt="Logo"
                      layout="responsive"
                      width={100}
                      height={50}
                    />
                  </Link>
                </div>
                <nav className="main-header-navigation">
                  <ul>
                    <li>
                      <Link href="/" onClick={handleNavLinkClick}>
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link href="/about-us" onClick={handleNavLinkClick}>
                        About
                      </Link>
                    </li>
                    <li>
                      <Link href="/internship" onClick={handleNavLinkClick}>
                        Internship
                      </Link>
                    </li>
                    <li>
                      <Link href="/portfolio" onClick={handleNavLinkClick}>
                        Portfolio
                      </Link>
                    </li>
                    <li>
                      <Link href="/our-services" onClick={handleNavLinkClick}>
                        Our Services
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog" onClick={handleNavLinkClick}>
                        Blogs
                      </Link>
                    </li>
                  </ul>
                  <div className="after-nav-area">
                    <ul>
                      <li>
                        <Link href="/contact-us" onClick={handleNavLinkClick}>
                          Get In Touch
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          )}

          {isLoremVisible && (
            <div className="contact-menu-wrapper" ref={loremRef}>
              <Link href="/" className="nav-link-logo-menu">
                <Image
                  className="nav-logo-menu"
                  src={mainDataHeader?.lite_mode_logo}
                  alt="Logo"
                  layout="responsive"
                  width={100}
                  height={50}
                />
              </Link>
              <nav className="stickey-contsct-wrapper">
                <h5>Contact Us</h5>
                <ul className="mail-no">
                  {mainDataHeader?.email_id && (
                    <li>
                      <a href={`mailto:${mainDataHeader.email_id}`}>
                        {mainDataHeader.email_id}
                      </a>
                    </li>
                  )}
                  {mainDataHeader?.contact_no && (
                    <li>
                      <a href={`tel:${mainDataHeader.contact_no}`}>
                        {mainDataHeader.contact_no}
                      </a>
                    </li>
                  )}
                </ul>
                <ul className="address">
                  <li>{mainDataHeader?.address}</li>
                </ul>
              </nav>
              <div className="after-nav-area">
                <div className="social-icons">
                  <a
                    href={mainData?.facebook_link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href={mainData?.instragram_link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href={mainData?.linkedin_link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedinIn />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* The buttons for the user to choose which section to open */}
          <div className="all-buttons-container">
            {(!isNavVisible && !isLoremVisible) && (
              <div className="menu-button-container">
                <button
                  onClick={toggleNav}
                  aria-label="Open Menu"
                  className="navbar-buttons-main navigation-menu-btn"
                >
                  Menu
                </button>
                <span className="menu-devider">|</span>
                <button
                  onClick={toggleLorem}
                  aria-label="Show Contact Information"
                  className="navbar-buttons-main navigation-contact-btn"
                >
                  Contact
                </button>
              </div>
            )}
            {(isNavVisible || isLoremVisible) && (
              <button
                onClick={closeBoth}
                aria-label="Close Menu or Contact"
                className="close-btn-navigation navbar-buttons-main"
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navigation;
