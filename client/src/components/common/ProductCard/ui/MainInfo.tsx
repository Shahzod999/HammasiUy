import { HouseDetails } from "../../../../types/home";
import SVG from "react-inlinesvg";
import "./mainInfo.scss";

const MainInfo = ({ details }: { details: HouseDetails }) => {
  return (
    <div className="homeCardhighlights">
      <div className="highlight-item">
        <SVG src="/svg/product/rooms.svg" />
        <span>{details?.rooms} комн.</span>
      </div>
      <div className="highlight-item">
        <SVG src="/svg/product/size.svg" />
        <span>{details?.area}</span>
      </div>
      <div className="highlight-item">
        <SVG src="/svg/product/building.svg" />
        <span>{details?.floor} этаж</span>
      </div>
    </div>
  );
};

export default MainInfo;
