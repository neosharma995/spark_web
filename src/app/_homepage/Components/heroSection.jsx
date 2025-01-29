import React from 'react'
import Image from 'next/image';

const HeroSection = () => {
  return (
    <div className='' style={{height:"100vh"}}>

        <Image  src='/image.png' 
                alt='Image'
                layout="responsive" 
                width={100} 
                height={50} 
        />
      
</div>
  )
}

export default HeroSection