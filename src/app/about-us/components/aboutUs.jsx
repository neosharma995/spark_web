'use client';
import { useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import { SectorDataContext } from '@/context/apiContext';

const AboutUsMain = () => {
  const pagesDataApi = useContext(SectorDataContext);
  const mainData = pagesDataApi?.pagesDataApi?.find(page => page.slug === 'about-us')?.acf?.third_section;
  const [mainImage, setMainImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Set initial main image on mount if available
  useEffect(() => {
    if (mainData?.image_gallery?.length > 0) {
      setMainImage(mainData.image_gallery[0].images);
    }
  }, [mainData]);

  // When a thumbnail is clicked, show the loader then update the main image.
  const handleThumbnailClick = (newMainImage) => {
    // Set loading state to show loader overlay
    setIsLoading(true);
    
      
      setMainImage(newMainImage);
    
  };

  // When the image has finished loading, hide the loader.
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="about-us-main container">
      {mainData && (
        <div className="first-section-inner">
          <div className="page-title">
            <h1>{mainData.slider_text}</h1>
          </div>
          <div className="short-description">
            <p>{mainData.small_description}</p>
          </div>

          <div className="image-gallery-container">
            {mainImage && (
              <div className="top-big-image" style={{ position: 'relative' }}>
                <Image
                  src={mainImage}
                  alt="Main Image"
                  layout="responsive"
                  width={100}
                  height={100}
                  onLoadingComplete={handleImageLoad}
                />
                
                {isLoading && (
                  <div className="image-loader">
            
                  </div>
                )}
              </div>
            )}

            <div className="description-column-main">
              <h2 className="page-heading lite-bg-heading">{mainData.heading}</h2>
              <div className="main-description">
                <p>{mainData.main_description}</p>
              </div>

              <div className="image-gallery inline-thumbnails">
                {mainData.image_gallery?.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${mainImage === image.images ? 'active' : ''}`}
                    onClick={() => handleThumbnailClick(image.images)}
                  >
                    <Image
                      src={image.images}
                      alt={`Thumbnail ${index + 1}`}
                      layout="fixed"
                      width={200}
                      height={100}
                      className="thumbnail-image"
                    />
                    <div className="overlay"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutUsMain;
