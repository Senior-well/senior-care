import React from 'react';

const ImagesDuplicate = ({ images, alt, animationClass, styles }) => {
    return ( 
        <div className={`image-wrapper ${animationClass}`}>
            <img src={images} alt={alt} style={styles}/>
        </div>
    );
}

export default ImagesDuplicate;