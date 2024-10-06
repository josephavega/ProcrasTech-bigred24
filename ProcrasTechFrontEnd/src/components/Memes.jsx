//src/RandomImageDisplay.js

import React, { useState, useEffect } from 'react';


const images = [
    'assets/image1.jpg',
    'assets/image2.jpg',
    'assets/image3.jpg',
    'assets/image4.jpg',
    'assets/image5.jpg',
    // Add more image paths as needed
];

const RandomImageDisplay = () => {
    const [currentImage, setCurrentImage] = useState('');

    useEffect(() => {
        const changeImage = () => {
            const randomIndex = Math.floor(Math.random() * images.length);
            setCurrentImage(images[randomIndex]);
        };

        // Change image immediately and set an interval for 5 minutes
        changeImage();
        const interval = setInterval(changeImage, 300000); // 300000 ms = 5 minutes

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <div>
            {currentImage && (
                <img
                    src={currentImage}
                    alt="Random Display"
                    style={{ width: '100%', height: 'auto' }} // Adjust styles as needed
                />
            )}
        </div>
    );
};

export default RandomImageDisplay;