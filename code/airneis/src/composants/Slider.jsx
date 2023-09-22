import React, { useState, useEffect } from 'react';
import Carousel from 'better-react-carousel';
import axios from 'axios';

const Gallery = () => {
  const [autoplay, setAutoplay] = useState(true);
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get('http://airneis.ddns.net:3000/carousel/affichage_carousel.php')
      .then(response => setImages(response.data))
  }, []);

  const handleInteraction = () => {
    setAutoplay(false);
  };

  return (
    <Carousel cols={1} rows={1} gap={10} loop autoplay={autoplay ? 3000 : false} showDots dotColor={"#000000"} dotColorActive={"#333333"} onClick={handleInteraction}>
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <img src={`http://airneis.ddns.net:3000/img/carousel/${image.id}.jpg`} alt={image.id} style={{ width: '100%' }} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Gallery;