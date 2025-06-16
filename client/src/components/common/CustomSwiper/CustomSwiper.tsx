import { useState } from "react";
import "./customSwiper.scss";
import { getValidatedUrl } from "../../../utils/imgGetValidatedUrl";

interface CustomSwiperProps {
  images: string[];
  initialIndex?: number;
  showPagination?: boolean;
  className?: string;
}

const CustomSwiper: React.FC<CustomSwiperProps> = ({
  images,
  initialIndex = 0,
  showPagination = true,
  className = "",
}) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  // Handle navigation
  const goToSlide = (index: number) => {
    if (index >= 0 && index < images.length) {
      setActiveIndex(index);
    }
  };

  const goToNextSlide = () => {
    goToSlide((activeIndex + 1) % images.length);
  };

  const goToPrevSlide = () => {
    goToSlide((activeIndex - 1 + images.length) % images.length);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 20) {
      // Swipe left
      goToNextSlide();
    } else if (touchEndX - touchStartX > 20) {
      // Swipe right
      goToPrevSlide();
    }
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div
      className={`custom-swiper ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}>
      <div
        className="custom-swiper-wrapper"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`custom-swiper-slide ${
              index === activeIndex ? "active" : ""
            }`}>
            <div className="custom-zoom-container">
              <img
                src={getValidatedUrl(image)}
                alt={`Slide ${index + 1}`}
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>

      {showPagination && images.length > 1 && (
        <div className="custom-pagination">
          {images.map((_, index) => (
            <span
              key={index}
              onClick={() => goToSlide(index)}
              className={`custom-pagination-bullet ${
                index === activeIndex ? "custom-pagination-bullet-active" : ""
              }`}>
              <i></i>
              <b></b>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSwiper;
