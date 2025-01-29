import React from 'react'
import HeaderContent from './headerContent'
import Navigation from './navigation'

const HeaderMain = () => {
  return (
    <div className='header-container'>
      <HeaderContent />
      <Navigation />
    </div>
  )
}

export default HeaderMain