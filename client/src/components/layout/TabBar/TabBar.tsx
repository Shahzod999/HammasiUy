import { Link, useLocation } from "react-router-dom";
import "./tabBar.scss";
import SVG from "react-inlinesvg";
import useAnimateOnChange from "../../../hooks/useAnimateOnChange";
import { useAppSelector } from "../../../hooks/redux";
import { selectedFavoritesAmount } from "../../../store/slices/Product/productFavoriteSlice";

const TabBar = () => {
  const { pathname } = useLocation();
  const favoritesAmount = useAppSelector(selectedFavoritesAmount);
  const animatePrice = useAnimateOnChange(favoritesAmount);
  // hapticVibration
  return (
    <div className="tab-bar">
      <Link
        to="/"
        className={`tab-bar__item ${
          pathname == "/" && "tab-bar__item__active"
        }`}>
        <SVG src="/svg/home.svg" className="tab-bar__item__icon" />
        <span>Главная</span>
      </Link>

      <Link
        to="/search"
        className={`tab-bar__item ${
          pathname == "/search" && "tab-bar__item__active"
        }`}>
        <SVG src="/svg/search.svg" className="tab-bar__item__icon" />
        <span>Поиск</span>
      </Link>

      <Link
        to="/addNewProduct"
        className={`tab-bar__item ${
          pathname == "/addNewProduct" && "tab-bar__item__active"
        }`}>
        <SVG src="/svg/add.svg" className="tab-bar__item__addIcon" />
      </Link>

      <Link
        to="/favorite"
        className={`tab-bar__item ${
          pathname == "/favorite" && "tab-bar__item__active"
        }`}>
        <SVG
          src="/svg/heart.svg"
          className={`tab-bar__item__icon heartSvg ${
            animatePrice ? "price-anim" : ""
          }`}
        />
        <span>Liked</span>
      </Link>

      <Link
        to="/profile"
        className={`tab-bar__item ${
          pathname == "/profile" && "tab-bar__item__active"
        }`}>
        <SVG src="/svg/profile.svg" className="tab-bar__item__icon" />
        <span>Профиль</span>
      </Link>
    </div>
  );
};

export default TabBar;
