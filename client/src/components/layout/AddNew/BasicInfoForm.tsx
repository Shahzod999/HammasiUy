import { ChangeEvent, useState } from "react";
import "./formSection.scss";
import { BasicInfoType, ImagePreview } from "../../../types/home";
import HandleImage from "../../common/HandleImage/HandleImage";

interface BasicInfoFormProps {
  data: BasicInfoType;
  onChange: (basicInfo: BasicInfoType) => void;
}

const propertyClasses = [
  "Эконом",
  "Комфорт",
  "Комфорт+",
  "Бизнес",
  "Премиум",
  "Элит",
];

const BasicInfoForm = ({ data, onChange }: BasicInfoFormProps) => {
  const [images, setImages] = useState<ImagePreview[]>(data.images || []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value, images });
  };

  const handleImageChange = (newImages: ImagePreview[]) => {
    setImages(newImages);
    onChange({ ...data, images: newImages });
  };

  return (
    <div className="form-section">
      <h2 className="form-section__title">Основная информация</h2>

      <div className="form-section__content">
        <div className="form-field">
          <label htmlFor="title" className="form-field__label">
            Заголовок
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={data.title}
            onChange={handleChange}
            className="form-field__input"
            placeholder="Например: Уютный семейный дом"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="text" className="form-field__label">
            Описание
          </label>
          <textarea
            id="text"
            name="text"
            value={data.text}
            onChange={handleChange}
            className="form-field__textarea"
            placeholder="Краткое описание объекта"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="property_class" className="form-field__label">
            Класс недвижимости
          </label>
          <select
            id="property_class"
            name="property_class"
            value={data.property_class}
            onChange={handleChange}
            className="form-field__select">
            {propertyClasses.map((className) => (
              <option key={className} value={className}>
                {className}
              </option>
            ))}
          </select>
        </div>

        <HandleImage
          onChange={handleImageChange}
          images={images}
          setImages={setImages}
        />
      </div>
    </div>
  );
};

export default BasicInfoForm;
