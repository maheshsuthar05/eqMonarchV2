import FuseLoading from '@fuse/core/FuseLoading';
import React, { useState } from 'react';

const ImageDialog = ({ title, imageUrl }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <>
      <img src={imageUrl} alt="" onLoad={() => setImageLoaded(true)} />
      {!imageLoaded && <FuseLoading />}
    </>
  );
};

export default ImageDialog;
