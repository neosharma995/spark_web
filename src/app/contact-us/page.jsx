import React from 'react'
import FormSection from './components/formSection'
import MapSection from './components/mapSection'

const Page = () => {
  return (
    <div className='page-main-outer'>
      <div className='contact-us-page'>
        <FormSection />
        <MapSection />
      </div>
    </div>
  )
}

export default Page