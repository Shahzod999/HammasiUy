import { ChangeEvent } from "react";
import "./HandleImage.scss";
import { ImagePreview } from "../../../types/home";
import { getValidatedUrl } from "../../../utils/imgGetValidatedUrl";

interface HandleImageProps {
  onChange: (images: ImagePreview[]) => void;
  accept?: string;
  label?: string;
  buttonText?: string;
  maxFiles?: number;
  className?: string;
  images: ImagePreview[];
  setImages: (images: ImagePreview[]) => void;
}

const HandleImage = ({
  onChange,
  accept = "image/*",
  label = "Images",
  buttonText = "Select files",
  maxFiles = 10,
  className = "",
  images,
  setImages,
}: HandleImageProps) => {
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newImages: ImagePreview[] = [];
    const totalFiles = Math.min(files.length, maxFiles);

    for (let i = 0; i < totalFiles; i++) {
      const file = files[i];
      if (file.type.startsWith("image/")) {
        const imageUrl = URL.createObjectURL(file);
        newImages.push({
          file,
          preview: imageUrl,
          path: `${file.name}-${Date.now()}`,
        });
      }
    }

    const updatedImages = [...images, ...newImages];
    setImages(updatedImages);
    onChange(updatedImages);
  };

  const removeImage = (path: string) => {
    const updatedImages = images.filter((img) => img.path !== path);
    setImages(updatedImages);
    onChange(updatedImages);
  };

  return (
    <div className={`image-upload ${className}`}>
      {label && <label className="image-upload__label">{label}</label>}

      <div className="image-upload__container">
        <div className="image-upload__dropzone">
          <input
            type="file"
            id="image-upload"
            onChange={handleImageChange}
            className="image-upload__input"
            accept={accept}
            multiple
          />
          <label htmlFor="image-upload" className="image-upload__trigger">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                fill="currentColor"
              />
            </svg>
            <span>{buttonText}</span>
            <div className="image-upload__hint">
              {accept === "image/*" ? "PNG, JPG, GIF up to 10MB" : accept}
            </div>
          </label>
        </div>

        <div className="image-upload__status">
          {images.length > 0
            ? `${images.length} file${images.length !== 1 ? "s" : ""} selected`
            : "No files selected"}
        </div>
      </div>

      {images.length > 0 && (
        <div className="image-upload__previews">
          {images.map((image) => (
            <div key={image.path} className="image-upload__preview">
              <div className="image-upload__preview-inner">
                <img
                  src={getValidatedUrl(image.preview)}
                  alt={image.path}
                  className="image-upload__preview-image"
                  onLoad={() => URL.revokeObjectURL(image.preview)}
                />
                <button
                  type="button"
                  className="image-upload__remove"
                  onClick={() => removeImage(image.path)}
                  aria-label="Remove image">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
                <div className="image-upload__preview-name">{image.path}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HandleImage;
