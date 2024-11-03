import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos, ArrowLeft, ArrowRight } from "@mui/icons-material";

const images = [
  "https://www.snitch.co.in/cdn/shop/files/5_WebBanner_1920x1080_2_1400x.jpg?v=1729317311",
  "https://www.snitch.co.in/cdn/shop/files/4_WebBanner_1920x1080_2_1400x.jpg?v=1729317311",
  "https://www.snitch.co.in/cdn/shop/files/3_WebBanner_1920x1080_4_1400x.jpg?v=1729317311",
  "https://www.snitch.co.in/cdn/shop/files/2_WebBanner_1920x1080_4_1400x.jpg?v=1729317311",
];

const ProductSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "opacity 1s ease-in-out",
          opacity: 1,
        }}
      />

      {/* Left Arrow */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          color: "black",
          backgroundColor: "white",
          borderRadius: "50%",
          "&:hover": { backgroundColor: "gray" },
        }}
      >
        <ArrowLeft />
      </IconButton>

      {/* Right Arrow */}
      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          color: "black",
          backgroundColor: "white",
          borderRadius: "50%",
          "&:hover": { backgroundColor: "gray" },
        }}
      >
        <ArrowRight />
      </IconButton>
    </Box>
  );
};

export default ProductSlider;
