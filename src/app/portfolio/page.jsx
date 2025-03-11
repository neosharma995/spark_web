'use client'
 
// import FullScreenView from '../_homepage/Components/fullScreen'
// import PortfolioDesk from './components/portFolioPage'
import Portfolio from './components/portfolio'
import PortfolioMobile from './components/portfolio'
 

const Page = () => {
 
  return (

    <div className="page-main-outer">
      {/* <FullScreenView /> */}

      <div className="desktop_view">
        <Portfolio />
      </div>

      {/* <div className="mobile_view">

        <PortfolioMobile />
      </div> */}
    </div>
  )
}

export default Page