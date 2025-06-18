import "./HomeCardSkeleton.scss";

const HomeCardSkeleton = () => {
  return (
    <div className="home-card-skeleton skeleton shimer">
      <div className="home-card-skeleton__header">
        <div className="home-card-skeleton__img"></div>
      </div>

      <div className="home-card-skeleton__info">
        <div className="home-card-skeleton__title-section">
          <div className="skeleton-text"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-text price"></div>
          <div className="skeleton-text"></div>
        </div>

        <div className="home-card-skeleton__details">
          <div className="skeleton-text"></div>
        </div>

        <div className="home-card-skeleton__statistics info-skeleton">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="home-card-skeleton__content">
          <div className="home-card-skeleton__details">
            <div className="skeleton-text"></div>
          </div>

          <div className="home-card-skeleton__details">
            <div className="skeleton-text"></div>
          </div>

          <div className="home-card-skeleton__details">
            <div className="skeleton-text"></div>
          </div>
          <div className="home-card-skeleton__details">
            <div className="skeleton-text"></div>
          </div>

          <div className="home-card-skeleton__details">
            <div className="skeleton-text"></div>
          </div>
        </div>

        <div className="home-card-skeleton__statistics">
          <span></span>
          <span className="home-card-skeleton__statistics__longer"></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default HomeCardSkeleton;
