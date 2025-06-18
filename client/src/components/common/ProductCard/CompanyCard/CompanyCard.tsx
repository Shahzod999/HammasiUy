import "./CompanyCard.scss";
import { CompanyType } from "../../../../types/companyType";
import CustomSwiper from "../../CustomSwiper/CustomSwiper";
import { Link } from "react-router-dom";
import SVG from "react-inlinesvg";
const CompanyCard = ({ company }: { company: CompanyType }) => {
  const immagesArray = company.images.map((item) => item.path);
  return (
    <Link
      to={`/search/user_id=${company.user_id}`}
      className="company-card">
      <div className="company-card__img">
        <CustomSwiper images={immagesArray} showPagination />
      </div>
      <div className="company-card__info">
        <div className="company-card__info-title">
          <h2>{company.name}</h2>
          <p>{company.description}</p>
        </div>
        <div className="company-card__links">
          <span>
            <SVG src="/svg/language.svg" />
            {company.website}
          </span>
          <span>
            <SVG src="/svg/email.svg" />
            {company.email}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CompanyCard;
