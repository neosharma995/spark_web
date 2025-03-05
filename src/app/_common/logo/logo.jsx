'use client';
import { useContext } from 'react';
import Image from 'next/image';
import { SectorDataContext } from '@/context/apiContext';
import { useTheme } from '@/context/ThemeContext';
 

const Logo = ( ) => {
  const { isLightMode } = useTheme();  
  const { headerDataApi } = useContext(SectorDataContext);
  const mainData = headerDataApi?.find(page => page.slug === 'header')?.acf;

  if (!mainData) return null; // Handle cases where data is not yet loaded

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden', // Ensures the image doesn't overflow
      }}
    >
      <Image
        src={isLightMode ? mainData.lite_mode_logo : mainData.logo}
        alt="Logo"
        width={200} // Ensure the width matches the container
        height={80} // Ensure the height matches the container
        style={{ objectFit: 'contain' }} // Maintain aspect ratio while fitting
      />
    </div>
    
  );
};

export default Logo;
