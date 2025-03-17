"use client";
import { useContext } from 'react';
import Image from 'next/image';
import { SectorDataContext } from '@/context/apiContext';

const FourthSection = () => {
    const { footerDataApi } = useContext(SectorDataContext);
    const darkLogo = footerDataApi?.find(page => page.slug === 'footer')?.acf?.logo;
    const lightLogo = footerDataApi?.find(page => page.slug === 'footer')?.acf?.light_logo;
    // console.log(dlightLogo)

    return (
        <div className='section'>
            <Image
                src={darkLogo}
                alt='Logo'
                layout="responsive" 
                width={100} 
                height={50}
                className='logo-image'
            />
               <Image
                src={lightLogo}
                alt='Logo'
                layout="responsive" 
                width={100} 
                height={50}
                className='dark-logo'
            />
            
        </div>
    );
}

export default FourthSection