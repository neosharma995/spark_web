'use client';
import { useContext } from 'react';
import Link from 'next/link';
import { SectorDataContext } from '@/context/apiContext';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const MapSection = () => {
    const pagesDataApi = useContext(SectorDataContext);
    const mainData = pagesDataApi?.pagesDataApi?.find(page => page.slug === 'contact-us')?.acf;
    return (
        <div className='container'>
            <div className='contact-map-section'>
                <div className='map-column'>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9958.619367097743!2d77.18110754756752!3d31.07440810621951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8b786154f8baad31%3A0x97626bf9fbffadd!2sSpark%20Web%20Solutions!5e1!3m2!1sen!2sin!4v1731308820253!5m2!1sen!2sin"
                        width="1045"
                        height="495"
                        style={{ border: 0, borderRadius: '8px', }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
                <div className='contact-card'>
                    <div className='card'>
                        <div className='card-ipper-sec'>
                            <div className='card-heading-area'>
                                <h3 className='main-heading'>{mainData?.card_heading}</h3>
                            </div>
                            <div className='card-description-area'>
                                <div className='in-map-inner'>
                                    <h4 className='sub-heading'>Main Office Address:</h4>
                                    <p className='description'>{mainData?.main_office_address}</p>
                                </div>
                                <div className='in-map-inner'>
                                    <h4 className='sub-heading'>Phone Number:</h4>
                                    <a className="description" href={`tel:${mainData?.phone_number}`}>{mainData?.phone_number}</a>
                                </div>
                                <div className='in-map-inner'>
                                    <h4 className='sub-heading'>Email ID:</h4>
                                    <a href={`mailto:${mainData?.email_id}`} className='description'>{mainData?.email_id}</a>
                                </div>
                            </div>
                        </div>
                        <div className='bottom-bar'>
                            <div className='social-icons'>
                                <Link href={mainData?.facebook_link || '#'} passHref>
                                    <FaFacebookF />
                                </Link>
                                <Link href={mainData?.instragram_link || '#'} passHref>
                                    <FaInstagram />
                                </Link>
                                <Link href={mainData?.linkedin_link || '#'} passHref>
                                    <FaLinkedinIn />
                                </Link>
                            </div>
                            <div className='send-msg-cplumn'>
                                <h3>Send us an Message</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MapSection;
