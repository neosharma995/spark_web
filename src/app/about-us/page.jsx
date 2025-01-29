import React from 'react'
import AboutUsMain from './components/aboutUs'
import ParagraphSection from './components/paragraphSection'
import Testimonial from '../_common/testimonial/testimonial'


const Page = () => {
  return (
    <div className='about-us-page page-main-outer'>
      <AboutUsMain/>
      <ParagraphSection/>
      <Testimonial/>
    </div>
  )
}

export default Page