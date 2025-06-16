import { ChangeEvent, useState } from "react";
import "./formSection.scss";

import { HouseDetails } from "../../../types/home";
import Button from "../../ui/Button/Button";

interface DetailsFormProps {
  data: HouseDetails;
  onChange: (details: HouseDetails) => void;
}

const currencies = ["rub", "usd", "eur", "so'm"];
const renovationTypes = [
  "Евроремонт",
  "Косметический",
  "Дизайнерский",
  "Черновая",
  "Под ключ",
  "Предчистовая",
  "Чистовая",
  "Лофт",
  "Авторский",
  "Эксклюзивный",
];
const bathroomTypes = [
  "Совмещенный",
  "Раздельный",
  "2 санузла",
  "3 санузла",
  "4 санузла",
  "На улице",
  "Санузел",
];
const balconyTypes = ["Да", "Нет", "Лоджия", "Терраса", "Террасы"];
const materialTypes = [
  "Кирпич",
  "Монолит",
  "Панель",
  "Монолит-кирпич",
  "Дерево",
];
const commonFacilities = [
  "Метро",
  "Школа",
  "Детский сад",
  "Парк",
  "Супермаркет",
  "Поликлиника",
  "Фитнес-клуб",
  "Торговый центр",
  "Рестораны",
  "Кафе",
  "Река",
  "Лес",
  "Озеро",
];

const DetailsForm = ({ data, onChange }: DetailsFormProps) => {
  const [facilityInput, setFacilityInput] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      onChange({
        ...data,
        [name]: checked,
      });
      return;
    }

    if (name === "year_built" || name === "rooms" || name === "price") {
      const numValue = parseInt(value);

      // For price, also update price per m²
      if (name === "price") {
        const numericArea = parseFloat(data.area);
        if (!isNaN(numericArea) && numericArea > 0) {
          const pricePerM2 = Math.round(numValue / numericArea);
          onChange({
            ...data,
            price: isNaN(numValue) ? 0 : numValue,
            price_per_m2: isNaN(pricePerM2) ? 0 : pricePerM2,
          });
        } else {
          onChange({
            ...data,
            price: isNaN(numValue) ? 0 : numValue,
          });
        }
      } else {
        onChange({
          ...data,
          [name]: isNaN(numValue) ? 0 : numValue,
        });
      }
    } else if (name === "area") {
      // Clean area input to remove non-numeric characters except decimal point
      const numericValue = value.replace(/[^\d.]/g, "");
      const numericArea = parseFloat(numericValue);

      // Calculate price per m²
      if (!isNaN(numericArea) && numericArea > 0) {
        const pricePerM2 = Math.round(data.price / numericArea);
        onChange({
          ...data,
          area: numericValue,
          price_per_m2: isNaN(pricePerM2) ? 0 : pricePerM2,
        });
      } else {
        onChange({
          ...data,
          area: numericValue,
        });
      }
    } else {
      onChange({
        ...data,
        [name]: value,
      });
    }
  };

  const addFacility = (facility: string) => {
    if (facility && !data.nearby_facilities.includes(facility)) {
      onChange({
        ...data,
        nearby_facilities: [...data.nearby_facilities, facility],
      });
    }
    setFacilityInput("");
  };

  const removeFacility = (facility: string) => {
    onChange({
      ...data,
      nearby_facilities: data.nearby_facilities.filter((f) => f !== facility),
    });
  };

  const filteredFacilities = commonFacilities.filter(
    (facility) => !data.nearby_facilities.includes(facility)
  );

  return (
    <div className="form-section">
      <h2 className="form-section__title">Характеристики объекта</h2>

      <div className="form-section__content">
        <div className="form-field">
          <label htmlFor="material" className="form-field__label">
            Материал
          </label>
          <select
            id="material"
            name="material"
            value={data.material}
            onChange={handleChange}
            className="form-field__select">
            <option value="">Выберите материал</option>
            {materialTypes.map((material) => (
              <option key={material} value={material}>
                {material}
              </option>
            ))}
          </select>
        </div>
        <div className="form-field__group">
          <div className="form-field">
            <label htmlFor="year_built" className="form-field__label">
              Год постройки
            </label>
            <input
              type="number"
              id="year_built"
              name="year_built"
              value={data.year_built || ""}
              onChange={handleChange}
              className="form-field__input"
              placeholder="Например: 2020"
              min="1800"
              required
              inputMode="numeric"
            />
          </div>
          {data.completion_year && (
            <div className="form-field">
              <label htmlFor="completion_year" className="form-field__label">
                Год сдачи
              </label>
              <input
                type="number"
                id="completion_year"
                name="completion_year"
                value={data.completion_year || ""}
                onChange={handleChange}
                className="form-field__input"
                placeholder="Например: 2030"
                min="1800"
                inputMode="numeric"
              />
            </div>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="area" className="form-field__label">
            Площадь
          </label>
          <div className="form-field__area-group">
            <input
              type="number"
              id="area"
              name="area"
              value={data.area}
              onChange={handleChange}
              className="form-field__input"
              placeholder="Например: 85"
              required
              inputMode="numeric"
            />
            <span className="form-field__area-unit">м²</span>
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="rooms" className="form-field__label">
            Количество комнат
          </label>
          <input
            type="number"
            id="rooms"
            name="rooms"
            value={data.rooms || ""}
            onChange={handleChange}
            className="form-field__input"
            placeholder="Например: 3"
            min="0"
            required
            inputMode="numeric"
          />
        </div>

        <div className="form-field">
          <label htmlFor="ceiling_height" className="form-field__label">
            Высота потолков
          </label>
          <div className="form-field__area-group">
            <input
              type="text"
              id="ceiling_height"
              name="ceiling_height"
              value={data.ceiling_height}
              onChange={handleChange}
              className="form-field__input"
              placeholder="Например: 2.5"
              required
              inputMode="decimal"
            />
            <span className="form-field__area-unit">м</span>
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="floor" className="form-field__label">
            Этаж
          </label>
          <input
            type="text"
            id="floor"
            name="floor"
            value={data.floor}
            onChange={handleChange}
            className="form-field__input"
            placeholder="Например: 5/9"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="price" className="form-field__label">
            Цена
          </label>
          <div className="form-field__price-group">
            <input
              type="number"
              id="price"
              name="price"
              value={data.price || ""}
              onChange={handleChange}
              className="form-field__input"
              placeholder="Например: 15000000"
              required
              min="0"
              inputMode="decimal"
            />
            <select
              id="currency"
              name="currency"
              value={data.currency}
              onChange={handleChange}
              className="form-field__select form-field__currency-select">
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* <div className="form-field">
          <label htmlFor="price_per_m2" className="form-field__label">
            Цена за м²
          </label>
          <input
            type="number"
            id="price_per_m2"
            name="price_per_m2"
            value={data.price_per_m2 || ""}
            className="form-field__input"
            disabled
          />
          <span className="form-field__helper-text">
            Рассчитывается автоматически
          </span>
        </div> */}

        <div className="form-field">
          <label htmlFor="renovation" className="form-field__label">
            Ремонт
          </label>
          <select
            id="renovation"
            name="renovation"
            value={data.renovation}
            onChange={handleChange}
            className="form-field__select">
            <option value="">Выберите тип ремонта</option>
            {renovationTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="bathroom" className="form-field__label">
            Санузел
          </label>
          <select
            id="bathroom"
            name="bathroom"
            value={data.bathroom}
            onChange={handleChange}
            className="form-field__select">
            <option value="">Выберите тип санузла</option>
            {bathroomTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="balcony" className="form-field__label">
            Балкон
          </label>
          <select
            id="balcony"
            name="balcony"
            value={data.balcony}
            onChange={handleChange}
            className="form-field__select">
            <option value="">Выберите</option>
            {balconyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="heating" className="form-field__label">
            Отопление
          </label>
          <input
            type="text"
            id="heating"
            name="heating"
            value={data.heating}
            onChange={handleChange}
            required
            className="form-field__input"
            placeholder="Например: центральное, электричество"
          />
        </div>

        <div className="form-field">
          <label htmlFor="parking" className="form-field__label">
            Парковка
          </label>
          <input
            type="text"
            id="parking"
            name="parking"
            value={data.parking}
            onChange={handleChange}
            className="form-field__input"
            placeholder="Например: 1 машиноместо"
          />
        </div>

        <div className="form-field form-field--full">
          <label className="form-field__label">Инфраструктура рядом</label>
          <div className="form-field__facilities">
            <div className="form-field__facilities-input">
              <input
                type="text"
                value={facilityInput}
                onChange={(e) => setFacilityInput(e.target.value)}
                className="form-field__input"
                placeholder="Добавить объект инфраструктуры"
              />

              <Button type="button" onClick={() => addFacility(facilityInput)}>
                Добавить
              </Button>
            </div>

            <div className="form-field__facilities-suggestions">
              {filteredFacilities.map((facility) => (
                <button
                  key={facility}
                  type="button"
                  className="form-field__facilities-tag form-field__facilities-suggestion"
                  onClick={() => addFacility(facility)}>
                  + {facility}
                </button>
              ))}
            </div>

            <div className="form-field__facilities-selected">
              {data.nearby_facilities.map((facility) => (
                <div key={facility} className="form-field__facilities-tag">
                  {facility}
                  <button
                    type="button"
                    className="form-field__facilities-remove"
                    onClick={() => removeFacility(facility)}>
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="form-field form-field--full">
          <label htmlFor="comment" className="form-field__label">
            Комментарий
          </label>
          <textarea
            id="comment"
            name="comment"
            value={data.comment}
            onChange={handleChange}
            className="form-field__textarea"
            placeholder="Дополнительная информация об объекте"
          />
        </div>

        <div className="form-field">
          <div className="form-field__checkbox-group">
            <label className="form-field__checkbox-label">
              <input
                type="checkbox"
                name="mortgage"
                checked={data.mortgage}
                onChange={handleChange}
              />
              Возможна ипотека
            </label>
          </div>
        </div>

        <div className="form-field">
          <div className="form-field__checkbox-group">
            <label className="form-field__checkbox-label">
              <input
                type="checkbox"
                name="is_urgent"
                checked={data.is_urgent}
                onChange={handleChange}
              />
              Срочная продажа
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsForm;
