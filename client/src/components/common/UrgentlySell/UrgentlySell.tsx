import "./urgentlySell.scss";
import SVG from "react-inlinesvg";

const UrgentlySell = () => {
  return (
    <div className="urgently-sell__badge">
      <SVG src="/svg/flame.svg" />
      <span>Срочная продажа</span>
    </div>
  );
};

export default UrgentlySell;
