'use client';
import { useContext, useState } from 'react';
import { SectorDataContext } from '@/context/apiContext';
import PopupForm from './popup';

const ThirdSection = () => {
  const pagesDataApi = useContext(SectorDataContext);
  const mainData = pagesDataApi?.pagesDataApi?.find(page => page.slug === 'internship')?.acf?.third_section;


  const [activeTab, setActiveTab] = useState('all');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({ additionalFields: { option3: {} } });

  const filteredCourses = activeTab === 'all'
    ? mainData?.flatMap(tab => tab.courses_details)
    : mainData?.find(tab => tab.course_name === activeTab)?.courses_details;

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const goBack = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="courses-main-outer container">
      {/* Tabs Navigation */}
      <div className="tabs-container-btns">
        <button
          onClick={() => setActiveTab('all')}
          className={`tabs-button ${activeTab === 'all' ? 'active' : ''}`}
        >
          All Courses
        </button>

        {mainData?.map(tab => (
          <button
            key={tab.course_name}
            onClick={() => setActiveTab(tab.course_name)}
            className={`tabs-button ${activeTab === tab.course_name ? 'active' : ''}`}
          >
            {tab.course_name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content-wrapper">
        {filteredCourses?.map((course, index) => (
          <div key={index} className="single-course-wrapper">
            <h3>{course.course_heading}</h3>
            <p dangerouslySetInnerHTML={{ __html: course.course_description }}></p>
            <button
              className="join-cource-btn"
              onClick={togglePopup}
            >
              Join Courses
            </button>
          </div>
        ))}
      </div>

      {/* Popup Form */}
      {isPopupOpen && (
        <div className="intership-popup-outer internship-popup-overlay">
          <PopupForm
            formData={formData}
            setFormData={setFormData}
            goBack={goBack}
            mainData={mainData}
            activeTab={activeTab}
          />
        </div>
      )}
    </div>
  );
};

export default ThirdSection;
