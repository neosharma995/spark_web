'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import SecondForm from './components/secondForm';
import { useRouter } from 'next/navigation';

const StickeyForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    step1: '',
    additionalFields: {},
  });

  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const proceed = () => {
    if (formData.step1) {
      if (formData.step1 === 'option1') {
        router.push('/our-services');
        onClose(); 
      } else if (formData.step1 === 'option3') {
        router.push('/internship');
        onClose();
      } else {
        setTimeout(() => {
          setCurrentStep(2);
        }, 300);
      }
    }
  };
  

  const goBack = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  return (
    <div className="stickey-form">
      <div className="form-header">
        <div className="headings">
          {/* <h2>Welcome To</h2>
          <h5>Spark Web Solutions</h5> */}
        </div>
        <div className="close-popup">
          <button className="close-btn-x" onClick={onClose}>
            <Image
              src="/images/123.png"
              layout="responsive"
              width={100}
              height={100}
              alt="Close"
            />
          </button>
        </div>
      </div>

      {/* Step 1 */}
      {currentStep === 1 && (
        <>
          <div className="step">
            <h3>What brings you to our website today?</h3>
            <div className="form-group">
              <div className="option-container">
                <label>
                  <div className="heading">
                    <span>Looking for Web Solutions?</span>
                  </div>
                  <div className="input-area">
                    <input
                      type="radio"
                      name="step1"
                      value="option1"
                      checked={formData.step1 === 'option1'}
                      onChange={handleChange}
                    />
                  </div>
                </label>
              </div>
              <div className="option-container">
                <label>
                  <div className="heading">
                    <span>Join Our Team</span>
                  </div>
                  <div className="input-area">
                    <input
                      type="radio"
                      name="step1"
                      value="option2"
                      checked={formData.step1 === 'option2'}
                      onChange={handleChange}
                    />
                  </div>
                </label>
              </div>
              <div className="option-container">
                <label>
                  <div className="heading">
                    <span>Looking for Training</span>
                  </div>
                  <div className="input-area">
                    <input
                      type="radio"
                      name="step1"
                      value="option3"
                      checked={formData.step1 === 'option3'}
                      onChange={handleChange}
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className="next-btn-st-form">
            <button
              className="proceed-button"
              onClick={proceed}
              disabled={!formData.step1} // Disable the button if no option is selected
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Step 2 */}
      {currentStep === 2 && (
        <>
          {formData.step1 === 'option2' && (
            <SecondForm
              formData={formData}
              setFormData={setFormData}
              goBack={goBack}
              onClose={onClose}
            />
          )}
        </>
      )}
    </div>
  );
};

export default StickeyForm;
