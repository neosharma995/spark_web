'use client'
import { useEffect } from 'react'
import FullScreenView from '../_homepage/Components/fullScreen'
import Portfolio from './components/portFolioPage'
import { toast } from 'sonner'

const Page = () => {
  useEffect(()=>{
   


    setTimeout(()=>{
      toast.warning('Please right-click and drag to explore more about the portfolio.')
    },2500)
    
  

  },[])
  return (

    <div className="page-main-outer">
      <FullScreenView/>
      <Portfolio />
    </div>
  )
}

export default Page