"use client";
import { useContext } from 'react';
import { SectorDataContext } from '@/context/apiContext';
import Link from 'next/link';
import { FaMapMarkerAlt } from 'react-icons/fa'; // Import the new icon

const FirstSection = () => {

    const { footerDataApi } = useContext(SectorDataContext);
    const mainData = footerDataApi?.find(page => page.slug === 'footer')?.acf?.address;
    
    return (
        <div className='section'>
            <h3>{mainData?.heading}</h3>
            <p>{mainData?.address}</p>
            <Link className='open-map' href='/'>
                Open Map <FaMapMarkerAlt />
            </Link>
       </div>
    );
}

export default FirstSection;
