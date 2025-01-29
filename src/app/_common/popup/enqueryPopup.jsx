"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import { toast } from 'sonner';
 

const EnquiryPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    yourfirstname: '',
    yourlastname: '',
    youremail: '',
    yournumber: '',
    yourmessage: '',
  });


  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit form data using FormData
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('yourfirstname', formData.yourfirstname);
    formDataToSend.append('yourlastname', formData.yourlastname);
    formDataToSend.append('youremail', formData.youremail);
    formDataToSend.append('yournumber', formData.yournumber);
    formDataToSend.append('yourmessage', formData.yourmessage);
    formDataToSend.append('_wpcf7_unit_tag', '414');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/contact-form-7/v1/contact-forms/414/feedback`, {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Enquiry sent successfully!');
        onClose()
      } else {
        toast.error(`Error: ${result.message}`);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className='enquery-popup-container'>
      <div className='enquery-popup-content'
        style={{
          backgroundImage: "url('/images/377dfb3a6f6be92038a856784c55436b.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      
      >
        <div className="form-inner-overlay"></div>
        <div className='main-enq-pop-area-frm'>
      <div className='form-top-bar'>
        <h2></h2>
        <button type='button' onClick={onClose} className='close-btn-x'>
        <Image
              src="/images/123.png"
              layout="responsive"
              width={100}
              height={100}
              className='close-button-x-img'
            />  
        </button>
      </div>
       
        <form onSubmit={handleSubmit}>
          <div className='container-for-four'>
            <div className='form-control'>
              <label htmlFor='yourfirstname'>First Name</label>
              <input
                className='form-input-design'
                type='text'
                id='yourfirstname'
                name='yourfirstname'
                value={formData.yourfirstname}
                onChange={handleChange}
                required
              />
            </div>

            <div className='form-control'>
              <label htmlFor='yourlastname'>Last Name</label>
              <input
              className='form-input-design'
                type='text'
                id='yourlastname'
                name='yourlastname'
                value={formData.yourlastname}
                onChange={handleChange}
                required
              />
            </div>

            <div className='form-control'>
              <label htmlFor='youremail'>Email Address</label>
              <input
                className='form-input-design'
                type='email'
                id='youremail'
                name='youremail'
                value={formData.youremail}
                onChange={handleChange}
                required
              />
            </div>

            <div className='form-control'>
              <label htmlFor='yournumber'>Mobile Number</label>
              <input
                className='form-input-design'
                type='tel' 
                id='yournumber'
                name='yournumber'
                value={formData.yournumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className='form-control'>
            <label htmlFor='yourmessage'>Your Message</label>
            <textarea
              className='form-input-design'
              id='yourmessage'
              name='yourmessage'
              value={formData.yourmessage}
              onChange={handleChange}
            ></textarea>
          </div>

          <button className='hover-effect-btn' type='submit'>Send Enquiry</button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default EnquiryPopup;
