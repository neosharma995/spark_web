'use client'
import { useEffect } from 'react'
import FullScreenView from '../_homepage/Components/fullScreen'
import PortfolioDesk from './components/portFolioPage'
import PortfolioMobile from './components/portfolio'
import { toast } from 'sonner'

const Page = () => {
  useEffect(() => {
    setTimeout(() => {
      toast.warning('Please right-click and drag to explore more about the portfolio.')
    }, 2500)

  }, [])
  return (

    <div className="page-main-outer">
      <FullScreenView />

      <div className="desktop_view">
        <PortfolioDesk />
      </div>

      <div className="mobile_view">

        <PortfolioMobile />
      </div>
    </div>
  )
}

export default Page