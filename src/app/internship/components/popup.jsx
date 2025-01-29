'use client'
import React from 'react';
import Image from 'next/image';
import { toast } from 'sonner';

const PopupForm = ({ mainData, formData, setFormData, goBack, activeTab }) => {
  const handleFieldChange = (e, formType) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      additionalFields: {
        ...prev.additionalFields,
        [formType]: {
          ...prev.additionalFields[formType],
          [name]: value,
        },
      },
    }));
  };

  const handleSubmitOption3 = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append('subject', 'Looking for Training');
    formDataToSend.append('name', formData.additionalFields?.option3?.name);
    formDataToSend.append('mobile-number', formData.additionalFields?.option3?.mobile);
    formDataToSend.append('email', formData.additionalFields?.option3?.email);
    formDataToSend.append('course', formData.additionalFields?.option3?.course);
    formDataToSend.append('additional-info', formData.additionalFields?.option3?.additionalInfo);
    formDataToSend.append('_wpcf7_unit_tag', '476');
  
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/wp-json/contact-form-7/v1/contact-forms/476/feedback`,
        {
          method: 'POST',
          body: formDataToSend,
        }
      );
  
      if (response.ok) {
        toast.success('Form Submitted Successfully');
  
        // Clear form data
        setFormData((prev) => ({
          ...prev,
          additionalFields: {
            ...prev.additionalFields,
            option3: {
              name: '',
              mobile: '',
              email: '',
              course: '',
              additionalInfo: '',
            },
          },
        }));
  
        goBack();
      } else {
        const error = await response.json();
        toast.error(`Submission Failed: ${error.message || 'Unknown error'}`);
      }
    } catch (error) {
      toast.error(`Submission Failed: ${error.message || 'Unknown error'}`);
    }
  };
  

  return (
    <div className="internsip-popup"
      style={{
        backgroundImage: "url('/images/377dfb3a6f6be92038a856784c55436b.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="internsip-popup-inner">

        <div className='internsip-popup-heading-section'>
          <div className="main-heading">
            <h2></h2>
          </div>

          <div>
            <button type="button" className="close-btn-x" onClick={goBack}>
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



        <form onSubmit={handleSubmitOption3} className='internsip-popup-form'>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className='form-input-design'
              value={formData?.additionalFields?.option3?.name || ''}
              onChange={(e) => handleFieldChange(e, 'option3')}
              required
            />
          </div>
          <div className="form-group">
            <label>Mobile Number:</label>
            <input
              type="tel"
              name="mobile"
              className='form-input-design'
              value={formData?.additionalFields?.option3?.mobile || ''}
              onChange={(e) => handleFieldChange(e, 'option3')}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              className='form-input-design'
              value={formData?.additionalFields?.option3?.email || ''}
              onChange={(e) => handleFieldChange(e, 'option3')}
              required
            />
          </div>
          <div className="form-group">
            <label>Course Interested:</label>
            <select
              className='form-input-design'
              name="course"
              value={formData?.additionalFields?.option3?.course ?? activeTab}
              onChange={(e) => handleFieldChange(e, 'option3')}
              required
            >
              <option value="">Select a course</option>
              {mainData?.map((course, index) => (
                <option key={index} value={course.course_name}>
                  {course.course_name}
                </option>
              ))}
            </select>

          </div>
          <div className="form-group full-width">
            <label>Additional Information:</label>
            <textarea
              className='form-input-design'
              name="additionalInfo"
              rows="4"
              value={formData?.additionalFields?.option3?.additionalInfo || ''}
              onChange={(e) => handleFieldChange(e, 'option3')}
            ></textarea>
          </div>
          <div className="next-btn-st-form">

            <button type="submit" className="hover-effect-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
