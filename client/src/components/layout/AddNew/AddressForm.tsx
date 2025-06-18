import { ChangeEvent, useState } from "react";
import "./formSection.scss";
import { useAppSelector } from "../../../hooks/redux";
import { selectedUserLocation } from "../../../store/slices/userLocationSlice";
import OpenMap from "../../common/MapContainer/OpenMap/OpenMap";
import { Address } from "../../../types/home";

interface AddressFormProps {
  data: Address;
  onChange: (address: Address) => void;
}

const AddressForm = ({ data, onChange }: AddressFormProps) => {
  const userLocation = useAppSelector(selectedUserLocation);
  const [newLocation, setNewLocation] = useState({
    long: userLocation.lon,
    lat: userLocation.lat,
    zoom: 16,
  });

  const handleLocation = (location: {
    lat: number;
    long: number;
    zoom: number;
  }) => {
    setNewLocation(location);

    onChange({
      ...data,
      coordinates: {
        lat: location.lat,
        long: location.long,
      },
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value,
    });
  };

  return (
    <div className="form-section">
      <h2 className="form-section__title">Адрес объекта</h2>

      <div className="form-section__content">
        <div className="form-field">
          <label htmlFor="city" className="form-field__label">
            Город
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={data?.city}
            onChange={handleChange}
            className="form-field__input"
            placeholder="Например: Москва"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="district" className="form-field__label">
            Район
          </label>
          <input
            type="text"
            id="district"
            name="district"
            value={data?.district}
            onChange={handleChange}
            className="form-field__input"
            placeholder="Например: Хамовники"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="street" className="form-field__label">
            Улица
          </label>
          <input
            type="text"
            id="street"
            name="street"
            value={data?.street}
            onChange={handleChange}
            className="form-field__input"
            placeholder="Например: ул. Льва Толстого"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="house_number" className="form-field__label">
            Номер дома
          </label>
          <input
            type="text"
            id="house_number"
            name="house_number"
            value={data?.house_number}
            onChange={handleChange}
            className="form-field__input"
            placeholder="Например: 16к2"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="apartment" className="form-field__label">
            Квартира/Помещение
          </label>
          <input
            type="text"
            id="apartment"
            name="apartment"
            value={data?.apartment || ""}
            onChange={handleChange}
            className="form-field__input"
            placeholder="Например: 42"
            required
          />
        </div>
        <OpenMap
          map="newEstateMap"
          lat={userLocation.lat || import.meta.env.VITE_LAT}
          long={userLocation.lon || import.meta.env.VITE_LON}
          newLocation={newLocation}
          setNewLocation={handleLocation}
        />
      </div>
    </div>
  );
};

export default AddressForm;
