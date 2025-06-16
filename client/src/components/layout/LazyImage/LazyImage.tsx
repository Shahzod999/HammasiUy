import { useState } from "react";

const LazyImage = ({ src }: { src: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="image-wrapper">
      {!isLoaded && (
        <div className="image-placeholder">
          <span>Загрузка...</span>
        </div>
      )}
      <img
        src={src}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = "/default.png";
        }}
        style={{ display: isLoaded ? "block" : "none" }}
      />
    </div>
  );
};
export default LazyImage;
