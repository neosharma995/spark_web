"use client";
import { useContext } from 'react';
import { SectorDataContext } from '@/context/apiContext';
import FirstSection from './firstSection'
import SecondSetion from './secondSection'
import ThirdSection from './thirdSection'
import FourthSection from './fourthSection'

const MainFooter = () => {
    const { footerDataApi } = useContext(SectorDataContext);
    const mainData = footerDataApi?.find(page => page.slug === 'footer')?.acf

  return (
    <div>
     <div className='footer'>
    <div className='footer-inner'>
    <div className='first-section'>
      <FirstSection/>
    </div>
    <div className='second-section'>
      <SecondSetion/>
    </div>
<div className='third-section'>
      <ThirdSection/>

</div>
<div className='forth-section'>
  <FourthSection/>
</div>
    </div>
    <div className='copyright-section'>
        {/* <p>{mainData?.copyright}</p> */}
        <p> Copyright © 2025 Spark Web Solution. All rights reserved </p>
    </div>
    </div>
    </div>
  )
}

export default MainFooter