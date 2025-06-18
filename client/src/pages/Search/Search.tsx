import "./search.scss";
import { useNavigate } from "react-router-dom";
import SVG from "react-inlinesvg";
import HeaderTitle from "../../components/common/HeaderTitle/HeaderTitle";

import CategoryList from "../../components/layout/CategoryList/CategoryList";
import { CategoryType } from "../../types/catgoryTypes";
const Search = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: CategoryType) => {
    navigate(`/search/category=${category._id}`);
  };

  return (
    <div className="search-page container">
      <HeaderTitle title="Поиск" />
      <main className="search-page__content">
        <input
          className="search-input"
          type="text"
          placeholder="Введите город или район"
        />

        <section className="search-options">
          <div className="search-option" onClick={() => navigate("/map")}>
            <SVG src="/svg/pin.svg" className="icon" />
            <p>На карте</p>
          </div>
          <div
            className="search-option"
            onClick={() => navigate("/search/isUrgent=true")}>
            <SVG src="/svg/product/special.svg" className="icon" />
            <p>Срочно</p>
          </div>
          <div
            className="search-option"
            onClick={() => navigate("/search/mortgage=true")}>
            <SVG src="/svg/product/mortgage.svg" className="icon" />
            <p>Ипотека</p>
          </div>
          <div
            className="search-option"
            onClick={() => navigate("/companies")}>
            <SVG src="/svg/company.svg" className="icon" />
            <p>Все компании новостроек</p>
            <SVG src="/svg/official.svg" className="icon" />
          </div>
        </section>

        <h2 className="search-page__title">Виды недвижимости</h2>
        <CategoryList handleCategoryClick={handleCategoryClick} />
      </main>
    </div>
  );
};

export default Search;
