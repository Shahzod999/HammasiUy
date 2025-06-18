import UrgentlySell from "../../UrgentlySell/UrgentlySell";

import Statistics from "../ui/Statistics";
import MainInfo from "../ui/MainInfo";
import Information from "../ui/Information";
import OpenMap from "../../MapContainer/OpenMap/OpenMap";
import { House } from "../../../../types/home";
import NearbyItem from "./NearbyItem";
import ContactInfo from "./ContactInfo";

import CustomSwiper from "../../CustomSwiper/CustomSwiper";
const ProductContent = ({ product }: { product: House }) => {
  const { images, text, details, address, contact, inputNumber } = product;

  const imagesArray = images?.map((image) => image.path);

  return (
    <div className="single-product container">
      <section className="single-product-section sticky__section">
        <div className="product-gallery">
          {details.is_urgent && <UrgentlySell />}
          <CustomSwiper images={imagesArray} showPagination />
        </div>

        <div className="price-section">
          <div className="price-main">
            {details.price.toLocaleString()} {details.currency}
          </div>
          <div className="price-secondary">
            {details.price_per_m2.toLocaleString()} {details.currency}/м²
          </div>
        </div>

        <ContactInfo contact={contact} inputNumber={inputNumber} />
        <div className="quick-specs">
          <MainInfo details={details} />
        </div>
      </section>

      <section className="single-product-section above_sticky__section">
        <div className="accordion-sections">
          <div className="accordion-section">
            <details>
              <summary>Описание</summary>
              <div className="accordion-content">
                <p>{text}</p>
                {details.comment && (
                  <p className="highlight-text">{details.comment}</p>
                )}
              </div>
            </details>
          </div>

          <div className="accordion-info">
            <Information details={details} />
          </div>

          <div className="accordion-section">
            <details>
              <summary>Рядом есть</summary>
              <div className="accordion-content">
                <div className="nearby-list">
                  {details.nearby_facilities.map((place, index) => (
                    <NearbyItem key={index} place={place} />
                  ))}
                </div>
              </div>
            </details>
          </div>
        </div>
        <div className="single-product-section__address">
          {address.city}, {address.district}, {address.street},{" "}
          {address.house_number}
        </div>

        <OpenMap
          map="map"
          long={address.coordinates.long}
          lat={address.coordinates.lat}
        />

        <div className="meta-row">
          <Statistics details={details} />
        </div>
      </section>
    </div>
  );
};

export default ProductContent;
