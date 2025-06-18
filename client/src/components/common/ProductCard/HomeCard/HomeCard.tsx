import { House } from "../../../../types/home";
import "./homeCard.scss";
import { formatPrice } from "../../../../utils/priceFormat";
import SVG from "react-inlinesvg";
import UrgentlySell from "../../UrgentlySell/UrgentlySell";
import Statistics from "../ui/Statistics";
import Information from "../ui/Information";
import MainInfo from "../ui/MainInfo";
import { useURLState } from "../../../../hooks/useURLState";
import { useAppDispatch } from "../../../../hooks/redux";
import { setProduct } from "../../../../store/slices/Product/singleProductSlice";
import { getValidatedUrl } from "../../../../utils/imgGetValidatedUrl";

const HomeCard = (house: House) => {
  const { title, images, details, _id, address } = house;
  const dispatch = useAppDispatch();
  const { setParam } = useURLState();

  const handleClick = () => {
    dispatch(setProduct(house));
    setParam("productId", _id);
  };

  // Формируем полный адрес
  const fullAddress = `${address?.city}, ${address?.district}, ${
    address?.street
  } ${address?.house_number}${
    address?.apartment ? `, кв. ${address.apartment}` : ""
  }`;

  return (
    <div className="homeCard" onClick={handleClick}>
      {/* Верхняя часть - изображение и срочность */}
      <div className="homeCard__header">
        <div className="homeCard__img">
          <img src={getValidatedUrl(images[0].path)} alt={title} />
          {details?.is_urgent && <UrgentlySell />}
        </div>
      </div>

      {/* Основная информация */}
      <div className="homeCard__info">
        <div className="homeCard__title-section">
          <h2 className="homeCard__title-section__type">{details.type.name}</h2>
          <h2 className="homeCard__title-section__area">м²</h2>

          <span className="homeCard__price">
            {formatPrice(details?.price)} {details?.currency}
          </span>

          <span className="homeCard__perm2">
            {formatPrice(details?.price_per_m2)} {details?.currency}
          </span>
        </div>

        <div className="homeCard__location">
          <SVG src="/svg/product/location.svg" />
          <span>{fullAddress}</span>
        </div>

        {/* Ключевые характеристики */}
        <MainInfo details={details} />

        {/* Подробная информация */}
        <Information details={details} />

        {/* Статистика */}
        <Statistics details={details} />
      </div>
    </div>
  );
};

export default HomeCard;
