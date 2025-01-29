"use client";
import { useContext } from 'react';
import { SectorDataContext } from '@/context/apiContext';

const SecondSection = () => {
    const { footerDataApi } = useContext(SectorDataContext);
    const mainData = footerDataApi?.find(page => page.slug === 'footer')?.acf?.get_in_touch
    
  return (
    <div className='section'>
        <h3>{mainData?.heading}</h3>
        {mainData &&(
            mainData.items?.map((item, index) => (
                <div key={index}>
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                        <p>{item.name}</p>
                    </a>
                </div>
            ))
        )

        }
    </div>
  )
}

export default SecondSection