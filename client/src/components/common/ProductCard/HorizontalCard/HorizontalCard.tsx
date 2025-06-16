import SVG from "react-inlinesvg";
import { House } from "../../../../types/home";
import "./HorizontalCard.scss";
import { useURLState } from "../../../../hooks/useURLState";
import { setProduct } from "../../../../store/slices/Product/singleProductSlice";
import { useAppDispatch } from "../../../../hooks/redux";
import { getValidatedUrl } from "../../../../utils/imgGetValidatedUrl";
import Information from "../ui/Information";

const HorizontalCard = (house: House) => {
  const { title, images, details, _id } = house;
  const dispatch = useAppDispatch();
  const { setParam } = useURLState();

  const handleClick = () => {
    dispatch(setProduct(house));
    setParam("productId", _id);
  };

  return (
    <div className="horizontal-card-container" onClick={handleClick}>
      <div className="horizontal-card">
        <div className="horizontal-card__image">
          <img
            src={getValidatedUrl(images[0].preview)}
            alt={title}
            loading="lazy"
          />
        </div>
        <div className="horizontal-card__content">
          <h2 className="horizontal-card__title">{title}</h2>
          <p className="horizontal-card__price">
            {details.price.toLocaleString()} {details.currency}
          </p>
          <p className="horizontal-card__info">
            {details.area} м² · {details.rooms} комн. · {details.floor} этаж
          </p>
          <p className="horizontal-card__renovation">
            Ремонт: {details.renovation}
          </p>
          {details.is_urgent && (
            <div className="horizontal-card__urgent">
              <SVG src="/svg/flame.svg" />
              <span> Срочно</span>
            </div>
          )}
        </div>
      </div>
      <Information details={details} />
    </div>
  );
};

export default HorizontalCard;
