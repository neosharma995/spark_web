'use client'
import { useContext, useState } from 'react';
import { SectorDataContext } from '@/context/apiContext';
import './secondSection.css';

const SecondSectionResponsive = () => {
  const pagesDataApi = useContext(SectorDataContext);
  const mainData = pagesDataApi?.pagesDataApi?.find(page => page.slug === 'home')?.acf?.second_section || [];

  const [activeTab, setActiveTab] = useState(mainData?.[0]?.main_heading || ''); // Default to first item

  return (
    <div className="second-section-inner-res" style={{marginTop:'130px'}}>
      <div className="tabs-container">
        {mainData.map((section, index) => (
          <button
            key={index}
            className={`tab-button-second ${activeTab === section.main_heading ? 'active' : ''}`}
            onClick={() => setActiveTab(section.main_heading)}
          >
            {section.main_heading}
          </button>
        ))}
      </div>

      {/* Content for the active tab */}
      <div className="tab-content">
        {mainData.map((section, index) => 
          section.main_heading === activeTab && (
            <div key={index} className="tab-panel">
              {section.scroll_menu.map((item, idx) => (
                <div key={idx} className="tab-item">
                  <h3>{item.heading}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SecondSectionResponsive;
