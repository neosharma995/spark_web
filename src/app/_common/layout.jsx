'use client'
import React, { useContext, useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SectorDataContext } from '@/context/apiContext';
import Footer from './footer/footer';
import Header from './header/header';
import Loader from '@/app/_common/loader/loader';

const Layout = ({ children }) => {
  const { headerDataApi } = useContext(SectorDataContext);
  const mainData = headerDataApi?.find((page) => page.slug === 'header')?.acf;

  const [isLoading, setIsLoading] = useState(true);
  const loaderRef = useRef(null);

  useEffect(() => {
    let timeout;

    if (mainData) {
      // Animate the Loader out first, then set isLoading false
      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 1, // Fade out in 1 second
        ease: 'power2.out',
        onComplete: () => {
          setIsLoading(false);
        },
      });
    } else {
      // If mainData is not available, reload the page after 5 seconds
      timeout = setTimeout(() => {
        window.location.reload();
      }, 50000);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [mainData]);

  return (
    <>
      {/* Loader with GSAP animation */}
      {isLoading && (
        <div ref={loaderRef}>
          <Loader />
        </div>
      )}
      {!isLoading && (
        <>
          <Header />
          <main>{children}</main>
          <Footer />
        </>
      )}
    </>
  );
};

export default Layout;
