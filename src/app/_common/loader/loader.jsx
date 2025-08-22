import React from 'react';
import Image from 'next/image';

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader-content">
        <div className="loader-image">
          <Image
            src="/logo.jpg"
            alt="Loading..."
            width={300}
            height={100}
            className="loading-img"
          />
        </div>
   
      </div>
    </div>
  );
};

export default Loader;
