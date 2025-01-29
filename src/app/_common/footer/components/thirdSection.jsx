"use client";
import { useContext } from 'react';
import { SectorDataContext } from '@/context/apiContext';
   
const ThirdSection = () => {
    const { footerDataApi } = useContext(SectorDataContext);
    const mainData = footerDataApi?.find(page => page.slug === 'footer')?.acf?.contact

  return (
    <div className='section' >
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

        }</div>
  )
}

export default ThirdSection