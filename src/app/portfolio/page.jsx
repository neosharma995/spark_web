'use client'
import { useEffect } from 'react'
import FullScreenView from '../_homepage/Components/fullScreen'
import Portfolio from './components/portFolioPage'
import { toast } from 'sonner'

const Page = () => {
  useEffect(()=>{
   


    setTimeout(()=>{

      toast.warning('Please Press the right click button and see the more about protfoilio')
    },5000)
    
  

  },[])
  return (

    <div className="page-main-outer">
      <FullScreenView/>
      <Portfolio />
    </div>
  )
}

export default Page