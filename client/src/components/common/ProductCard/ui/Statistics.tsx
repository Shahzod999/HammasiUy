import { HouseDetails } from "../../../../types/home";
import SVG from "react-inlinesvg";
import { formatDate } from "../../../../utils/formatDate";
import "./statistics.scss";

const Statistics = ({ details }: { details: HouseDetails }) => {
  return (
    <div className="homeCardStats">
      <div className="meta-views meta-item">
        <SVG src="/svg/eye.svg" />
        <span>{details?.views || 0}</span>
      </div>
      <div className="meta-item">
        <SVG src="/svg/created.svg" />
        <span>{formatDate(details.published_date)}</span>
      </div>
      <div className="meta-favorites meta-item">
        <SVG src="/svg/heart.svg" />
        <span>{details?.favorites || 0}</span>
      </div>
    </div>
  );
};

export default Statistics;
