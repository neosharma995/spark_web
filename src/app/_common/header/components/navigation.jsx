'use client';
import React, { useState, useRef, useEffect, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SectorDataContext } from '@/context/apiContext';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Navigation = () => {
  const [isNavVisible, setNavVisible] = useState(false);
  const [isLoremVisible, setLoremVisible] = useState(false);
  const [isScrolling, setScrolling] = useState(false);

  const navRef = useRef(null);
  const loremRef = useRef(null);
  const navContainerRef = useRef(null);
  const scrollImgRef = useRef(null);

  // Hover timing refs (keep your original 0.3s behavior)
  const hoverInDelay = useRef(null);
  const hoverOutDelay = useRef(null);

  // Hover TL for glow pulse
  const hoverGlowTl = useRef(null);

  const pagesDataApi = useContext(SectorDataContext);
  const mainData = pagesDataApi?.pagesDataApi?.find((page) => page.slug === 'contact-us')?.acf;
  const { headerDataApi } = useContext(SectorDataContext);
  const mainDataHeader = headerDataApi?.find((page) => page.slug === 'header')?.acf;

  // ---------- Smooth open/close helpers (CLICK ONLY) ----------
  const openPanel = (ref, setVisible) => {
    setVisible(true); // mount it
    requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      gsap.set(el, { height: 0, autoAlpha: 0, overflow: 'hidden' });
      const h = el.scrollHeight || el.getBoundingClientRect().height || 0;
      gsap.to(el, {
        height: h,
        autoAlpha: 1,
        duration: 0.35,
        ease: 'power2.out',
        onComplete: () => gsap.set(el, { height: 'auto' })
      });
    });
  };

  const closePanel = (ref, setVisible) => {
    const el = ref.current;
    if (!el) { setVisible(false); return; }
    gsap.to(el, {
      height: 0,
      autoAlpha: 0,
      duration: 0.28,
      ease: 'power2.in',
      onComplete: () => setVisible(false)
    });
  };

  const toggleNav = () => {
    if (isNavVisible) {
      closePanel(navRef, setNavVisible);
    } else {
      if (isLoremVisible) closePanel(loremRef, setLoremVisible);
      openPanel(navRef, setNavVisible);
    }
  };

  const toggleLorem = () => {
    if (isLoremVisible) {
      closePanel(loremRef, setLoremVisible);
    } else {
      if (isNavVisible) closePanel(navRef, setNavVisible);
      openPanel(loremRef, setLoremVisible);
    }
  };

  const closeBoth = () => {
    if (isNavVisible) closePanel(navRef, setNavVisible);
    if (isLoremVisible) closePanel(loremRef, setLoremVisible);
  };

  // --- Scroll image fade/scale (unchanged) ---
  useEffect(() => {
    if (!scrollImgRef.current) return;
    const el = scrollImgRef.current;
    gsap.killTweensOf(el);
    if (isScrolling) {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out', delay: 0.2 }
      );
    } else {
      gsap.to(el, { opacity: 0, scale: 0.8, duration: 0.5, ease: 'power3.in', delay: 0.2 });
    }
  }, [isScrolling]);

  // --- Hover animation: Lift + Glow Pulse (only on scroll logo) ---
  const handleScrollImageHover = () => {
    // keep your original delayed hide behavior
    if (hoverOutDelay.current) { hoverOutDelay.current.kill(); hoverOutDelay.current = null; }

    const el = scrollImgRef.current;
    if (!el) return;

    // kill previous hover TL if any
    if (hoverGlowTl.current) hoverGlowTl.current.kill();

    // Build timeline: lift + scale, then pulse boxShadow while hovered
    hoverGlowTl.current = gsap.timeline();
    hoverGlowTl.current
      .to(el, { scale: 1.08, y: -6, duration: 0.22, ease: 'power2.out' }, 0)
      .to(
        el,
        {
          // soft golden glow pulse; adjust rgba for your brand color if you want
          boxShadow: '0 8px 24px rgba(0,0,0,0.18), 0 0 24px rgba(213,165,78,0.35)',
          duration: 0.6,
          ease: 'power1.inOut',
          yoyo: true,
          repeat: -1
        },
        0.05
      );

    hoverInDelay.current = gsap.delayedCall(0.3, () => setScrolling(false));
  };

  const handleScrollImageLeave = () => {
    // keep your original delayed show behavior
    if (hoverInDelay.current) { hoverInDelay.current.kill(); hoverInDelay.current = null; }

    const el = scrollImgRef.current;
    if (!el) return;

    // stop pulsing and return to normal
    if (hoverGlowTl.current) { hoverGlowTl.current.kill(); hoverGlowTl.current = null; }
    gsap.to(el, {
      scale: 1,
      y: 0,
      boxShadow: '0 0 0 rgba(0,0,0,0)',
      duration: 0.25,
      ease: 'power2.inOut'
    });

    hoverOutDelay.current = gsap.delayedCall(0.3, () => setScrolling(true));
  };

  // --- Scroll trigger for the container (unchanged) ---
  useEffect(() => {
    gsap.to(navContainerRef.current, {
      scrollTrigger: {
        trigger: navContainerRef.current,
        start: 'top top+=20',
        toggleClass: { targets: navContainerRef.current, className: 'scrolled-nav' },
        onEnter: () => setScrolling(true),
        onLeaveBack: () => setScrolling(false)
      }
    });
  }, []);

  // --- Close on scroll away from top (unchanged) ---
  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY > 20) {
        setScrolling(true);
        closeBoth();
      } else {
        setScrolling(false);
      }
    };
    window.addEventListener('scroll', handleWindowScroll);
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  const handleNavLinkClick = () => {
    closeBoth();
  };

  return (
    <div className={`navigation-container ${isScrolling ? 'scrolled-nav' : ''}`} ref={navContainerRef}>
      {/* Scroll image with Lift + Glow Pulse hover */}
      <div className="scroll-img" ref={scrollImgRef}>
        {isScrolling && (
          <div
            onMouseEnter={handleScrollImageHover}
            onMouseLeave={handleScrollImageLeave}
            className="xyz"
          >
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

      {!isScrolling && (
        <div className="navigation-inner">
          {isNavVisible && (
            <div className="nav-wrapper" ref={navRef}>
              <div className="menu-wrapper-main">
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
                    <li><Link href="/" onClick={handleNavLinkClick}>Home</Link></li>
                    <li><Link href="/about-us" onClick={handleNavLinkClick}>About</Link></li>
                    <li><Link href="/internship" onClick={handleNavLinkClick}>Internship</Link></li>
                    <li><Link href="/portfolio" onClick={handleNavLinkClick}>Portfolio</Link></li>
                    <li><Link href="/our-services" onClick={handleNavLinkClick}>Our Services</Link></li>
                    <li><Link href="/blog" onClick={handleNavLinkClick}>Blogs</Link></li>
                  </ul>
                  <div className="after-nav-area">
                    <ul>
                      <li><Link href="/contact-us" onClick={handleNavLinkClick}>Get In Touch</Link></li>
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
                    <li><a href={`mailto:${mainDataHeader.email_id}`}>{mainDataHeader.email_id}</a></li>
                  )}
                  {mainDataHeader?.contact_no && (
                    <li><a href={`tel:${mainDataHeader.contact_no}`}>{mainDataHeader.contact_no}</a></li>
                  )}
                </ul>
                <ul className="address">
                  <li>{mainDataHeader?.address}</li>
                </ul>
              </nav>
              <div className="after-nav-area">
                <div className="social-icons">
                  <a href={mainData?.facebook_link || '#'} target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
                  <a href={mainData?.instragram_link || '#'} target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                  <a href={mainData?.linkedin_link || '#'} target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
                </div>
              </div>
            </div>
          )}

          <div className="all-buttons-container">
            {(!isNavVisible && !isLoremVisible) ? (
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
            ) : (
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
