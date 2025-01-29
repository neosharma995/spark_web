import React from 'react';
import Image from 'next/image';

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader-content">
        <div className="loader-image">
          <Image
            src="/siteLogo/logo.jpg"
            alt="Loading..."
            width={100}
            height={100}
            className="loading-img"
          />
        </div>
        <div className="loader-text">
          <h1>Welcome!  to the Sparkweb Solutions</h1>
        </div>
      </div>
    </div>
  );
};

export default Loader;
