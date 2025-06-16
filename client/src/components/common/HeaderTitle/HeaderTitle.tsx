import "./headerTitle.scss";
import SVG from "react-inlinesvg";

type HeaderTitleProps = {
  title: string;
  icon?: string;
  iconClick?: () => void;
};

const HeaderTitle = ({ title, icon, iconClick }: HeaderTitleProps) => {
  return (
    <header className="header-title">
      <h2>{title}</h2>
      {icon && <SVG src={icon} onClick={iconClick} />}
    </header>
  );
};

export default HeaderTitle;
