'use client';
import { useContext } from 'react';
import Image from 'next/image';
import { SectorDataContext } from '@/context/apiContext';
const FirstSection = () => {
  const pagesDataApi = useContext(SectorDataContext);
  const mainData = pagesDataApi?.pagesDataApi?.find(page => page.slug === 'internship')?.acf?.first_section;
  const mainDataSecond = pagesDataApi?.pagesDataApi?.find(page => page.slug === 'internship')?.acf?.second_section;


  // Function to strip HTML tags from the description
  const stripHtmlTags = (html) => {
    if (!html) return '';
    return html.replace(/<\/?[^>]+(>|$)/g, ""); // Regex to remove HTML tags
  };


  return (
    <div className='container'>
      <div className='page-title'>
        <div className="programe-heading">
          <h1>{mainData?.programe}</h1>
        </div>
        <div className="programe-img">
          <Image src={mainData?.program_icon}
            alt='img'
            width={100}
            height={100} />
        </div>
        <div className="programe-name-heading">
          <h1>{mainData?.programe_name}</h1>
        </div>
      </div>
      <div className='first-section'>
        <div className='paragraph-section'>
          <p>{mainData?.description}</p>
        </div>
        <div className='image-section'>
          <Image src={mainData?.image} alt='img'
            layout="responsive"
            width={100}
            height={50}
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      </div>
      <div className='second-section'>
        <h2>{mainDataSecond?.heading}</h2>
        <p>{stripHtmlTags(mainDataSecond?.description)}</p>
      
      </div>
    </div>
  )
}

export default FirstSection