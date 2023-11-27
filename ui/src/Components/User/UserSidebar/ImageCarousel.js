import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import { Link } from "react-router-dom";

const ImageCarousel = () => {
  const imageStyle = {
    width: "100%", // Set your preferred width
    height: "400px", // Set your preferred height
    objectFit: "cover", // To maintain aspect ratio and cover the container
  };
  const [featuredData, setFeaturedData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/featured')
      .then((res) => {
        const top3FeaturedData = res.data.slice(0, 3);
        setFeaturedData(top3FeaturedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="mr-[90px]">
    <Carousel
      showArrows={true}
      showStatus={false}
      showThumbs={false}
      autoPlay={true}
      interval={2000}
    >
      {featuredData.map((item, index) => (
        <div key={index}>
          <Link to={`/productbycategory/${item.category}`}>
            <img
              src={`data:image/png;base64,${item.featuredimage}`}
              alt={`Featured Image ${index + 1}`}
              style={imageStyle}
            />
          </Link>
        </div>
      ))}
    </Carousel>
    </div>
  );
};

export default ImageCarousel;
