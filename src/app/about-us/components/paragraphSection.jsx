'use client';
import Image from 'next/image';
import { useContext } from 'react';
import { SectorDataContext } from '@/context/apiContext';

const ParagraphSection = () => {
  const pagesDataApi = useContext(SectorDataContext);
  const mainData = pagesDataApi?.pagesDataApi?.find(page => page.slug === 'about-us')?.acf?.third_section;
  return (
  <div className="container">

    <div className="para-section">
            {mainData && (
              <div className='para-inner'>
               {mainData.description_section?.map((section, index) => (
                <div key={index} className='about-card-outer'>
                        <div className="card-heading">
                           <h2>{section.heading}</h2>
                        </div>

                  <div className="about-card">
                        <div className="desc-inner">
                        <div className="card-description">
                          <p>{section.description}</p>
                        </div>
                  </div>
                        <div className="card-img-sec">
                          <div className="card-img-inner">
                            <Image src={section.image}
                            alt='image'
                            layout="responsive" 
                            width={100} 
                            height={100} 
                            />
                           </div>
                        </div>
                           </div>
                        </div>
                        ))}
               </div>
            )}
        </div>
                            </div>
  )
}

export default ParagraphSection