import "./CategoryListSkeleton.scss";

const CategoryListSkeleton = () => {
  return (
    <div className="property-card category-list-skeleton shimer">
      <span className="badge" />
      <p className="skeleton-text" />
      <span className="property-card__description skeleton-text" />
    </div>
  );
};

export default CategoryListSkeleton;
