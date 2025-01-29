'use client';
import { useContext, useState, useEffect } from 'react';
import { SectorDataContext } from '@/context/apiContext';

const AboutUsSection = () => {
  const { pagesDataApi } = useContext(SectorDataContext);
  const mainData = pagesDataApi?.find(page => page.slug === 'home')?.acf.about_us_section;

  // If there is an image gallery, use first image as default preview.
  const [previewImage, setPreviewImage] = useState(null);

  // When mainData or gallery changes, update previewImage if not set.
  useEffect(() => {
    if (mainData?.image_gallery?.length) {
      setPreviewImage(mainData.image_gallery[0].images);
    }
  }, [mainData]);

  // Handler to update preview image when a small gallery image is clicked.
  const handleImageClick = (imageUrl) => {
    setPreviewImage(imageUrl);
  };

  return (
    <div className='container about-us-home'>
      <h1 className='mian-about-heading' >{mainData?.heading}</h1>
      <p className='main-description'>{mainData?.main_description}</p>
      <div className="about-home-inr-cont">
        {/* Left side: Preview image */}
        <div className="about-sec-left">
          {previewImage && (
            <img
              className='preview-img'
              src={previewImage}
              alt="Gallery Preview"
            />
          )}
        </div>

        {/* Right side: Gallery Thumbnails */}
        <div className="about-sec-right">
          <h2 className='fade-bt-heading'>{mainData?.heading}</h2>
          <p className='short-description'>{mainData?.small_description}</p>

          <div className="gallery">
            {mainData?.image_gallery?.map((image, index) => (
              <div
                key={index}
                className={`about-card ${previewImage === image.images ? 'active' : ''}`}
                onClick={() => handleImageClick(image.images)}
              >
                <img
                  src={image.images}
                  alt={image.card_heading}
                  className='thumb-image'
                />
                {/* Overlay for active state */}
                {previewImage === image.images && <div className="overlay"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;
