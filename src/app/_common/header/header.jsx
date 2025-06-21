'use client'
import React, { useEffect, useState } from 'react';
import HeaderMain from './components/headerMain';

const Header = () => {
  
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`header-section ${isSticky ? 'sticky-header' : ''}`}>
      <HeaderMain />
    </div>
  );
};

export default Header;
