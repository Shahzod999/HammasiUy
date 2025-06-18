import "./CategoryList.scss";
import { useGetCategoriesQuery } from "../../../api/endpoints/categoriesApiSlice";
import { getValidatedUrl } from "../../../utils/imgGetValidatedUrl";
import SVG from "react-inlinesvg";
import CategoryListSkeleton from "../Skeleton/CategoryListSkeleton/CategoryListSkeleton";
import { CategoryType } from "../../../types/catgoryTypes";

interface CategoryListProps {
  handleCategoryClick: (category: CategoryType) => void;
}

const CategoryList = ({ handleCategoryClick }: CategoryListProps) => {
  const { data, isLoading } = useGetCategoriesQuery();

  return (
    <section className="property-types">
      {isLoading
        ? Array.from({ length: 6 }).map((_, i) => (
            <CategoryListSkeleton key={i} />
          ))
        : data?.data.map((category) => (
            <div
              className="property-card"
              key={category._id}
              onClick={() => handleCategoryClick(category)}>
              <span className="badge">
                <SVG src={getValidatedUrl(category.icon)} />
              </span>
              <p>{category.name}</p>
              <span className="property-card__description">
                {category.description}
              </span>
            </div>
          ))}
    </section>
  );
};

export default CategoryList;
