import { HouseDetails } from "../../../../types/home";
import SVG from "react-inlinesvg";
import "./information.scss";

const Information = ({ details }: { details: HouseDetails }) => {
  return (
    <div className="homeDetails">
      <div className="detail-row">
        <div className="detail-label">
          <SVG src="/svg/product/timeAgo.svg" />
          <span>Год постройки:</span>
        </div>
        <span className="detail-value">{details.year_built}</span>
      </div>

      {details.completion_year && (
        <div className="detail-row">
          <div className="detail-label">
            <SVG src="/svg/product/timeAgo.svg" />
            <span>Год сдачи:</span>
          </div>
          <span className="detail-value">{details.completion_year}</span>
        </div>
      )}

      <div className="detail-row">
        <div className="detail-label">
          <SVG src="/svg/product/brick.svg" />
          <span>Материал:</span>
        </div>
        <span className="detail-value">{details.material}</span>
      </div>
      <div className="detail-row">
        <div className="detail-label">
          <SVG src="/svg/product/building.svg" />
          <span>Ремонт:</span>
        </div>
        <span className="detail-value">
          {details.renovation || "Не указан"}
        </span>
      </div>

      <div className="detail-row">
        <div className="detail-label">
          <SVG src="/svg/product/type.svg" />
          <span>Тип</span>
        </div>
        <span className="detail-value">{details.type.name}</span>
      </div>
      <div className="detail-row">
        <div className="detail-label">
          <SVG src="/svg/product/bath.svg" />
          <span>Ванная</span>
        </div>

        <span className="detail-value">{details.bathroom}</span>
      </div>
      <div className="detail-row">
        <div className="detail-label">
          <SVG src="/svg/product/balcony.svg" />
          <span>Балкон</span>
        </div>
        <span className="detail-value">{details.balcony}</span>
      </div>
      <div className="detail-row">
        <div className="detail-label">
          <SVG src="/svg/product/heating.svg" />
          <span>Отопление</span>
        </div>
        <span className="detail-value">{details.heating}</span>
      </div>
      <div className="detail-row">
        <div className="detail-label">
          <SVG src="/svg/product/height.svg" />
          <span>Высота потолков</span>
        </div>
        <span className="detail-value">{details.ceiling_height}</span>
      </div>
      <div className="detail-row">
        <div className="detail-label">
          <SVG src="/svg/product/parking.svg" />
          <span>Паркинг</span>
        </div>
        <span className="detail-value">{details.parking}</span>
      </div>

      {details.mortgage && (
        <div className="detail-row">
          <div className="detail-label">
            <SVG src="/svg/product/mortgage.svg" />
            <span>Ипотека</span>
          </div>
          <span
            className={`detail-value ${
              details.mortgage ? "available" : "unavailable"
            }`}>
            {details.mortgage ? "Доступна" : "Недоступна"}
          </span>
        </div>
      )}
    </div>
  );
};

export default Information;
