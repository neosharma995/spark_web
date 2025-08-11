import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';

const ContactPopup = ({ isOpen, onClose, serviceNames, selectedService }) => {
    const [formData, setFormData] = useState({
        service: '',
        name: '',
        email: '',
        number: '',
        message: ''
    });

    // Set default service when the popup opens
    useEffect(() => {
        if (isOpen) {
            setFormData((prev) => ({
                ...prev,
                service: selectedService || '',
            }));
        }
    }, [isOpen, selectedService]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('service', formData.service);
        formDataToSend.append('your-name', formData.name);
        formDataToSend.append('your-email', formData.email);
        formDataToSend.append('your-number', formData.number);
        formDataToSend.append('your-message', formData.message);
        formDataToSend.append('_wpcf7_unit_tag', '478');

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/contact-form-7/v1/contact-forms/478/feedback`, {
                method: 'POST',
                body: formDataToSend,
            });

            const result = await response.json();

            if (response.ok) {
                toast.success('Enquiry sent successfully!');
                setFormData({ service: selectedService || '', name: '', email: '', number: '', message: '' });
                onClose();
            } else {
                toast.error(`Error: ${result.message}`);
            }
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    };

    if (!isOpen) return null;

    return (
        <div className='service-popup'>
            <div className="popup-overlay">
                <div
                    className='popup-image-container'
                
                >
                    <div className="service-popup-content">
                        <div className='form-top-bar'>
                           
                            <button className="close-btn-x" onClick={onClose}>
                                <Image
                                    src="/images/123.png"
                                    layout="responsive"
                                    width={100}
                                    height={100}
                                />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className='service-popup-form'>
                            <div className='service-popup-form-inner'>
                                <div className="form-group">
                                    <label htmlFor="service">Select a Service</label>
                                    <select
                                        id="service"
                                        name="service"
                                        className='form-input-design'
                                        required
                                        value={formData.service}
                                        onChange={handleInputChange}
                                    >
                                        <option value="" disabled>
                                            Select a Service
                                        </option>
                                        {serviceNames.map((service, index) => (
                                            <option key={index} value={service}>
                                                {service}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        className='form-input-design'
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        className='form-input-design'
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="number">Number</label>
                                    <input
                                        type="text"
                                        id="number"
                                        className='form-input-design'
                                        name="number"
                                        required
                                        value={formData.number}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        className='form-input-design'
                                        rows="4"
                                        required
                                        value={formData.message}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>
                            </div>
                            <button type="submit" className="hover-effect-btn">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPopup;
