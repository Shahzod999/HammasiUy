import HeaderTitle from "../../components/common/HeaderTitle/HeaderTitle";
import OpenFromSide from "../../components/common/OpenFromSide/OpenFromSide";
import CategoryList from "../../components/layout/CategoryList/CategoryList";
import AddNewProduct from "./AddNewProduct";
import { useURLState } from "../../hooks/useURLState";
import { CategoryType } from "../../types/catgoryTypes";

const MainNewProduct = () => {
  const { setParam, getParam } = useURLState();

  const initialCategory = getParam("main-new-product") || "";
  const newConstruction = getParam("new-construction") || "";

  
  const handleCategoryClick = (category: CategoryType) => {
    if (category.isNewConstruction) {
      setParam("new-construction", category._id);
    } else {
      setParam("main-new-product", category._id);
    }
  };

  return (
    <div className="main-new-product container">
      <HeaderTitle title="Тип объявления" />
      <CategoryList handleCategoryClick={handleCategoryClick} />

      <OpenFromSide
        isOpen={Boolean(initialCategory || newConstruction)}
        onClose={() => {}}>
        <AddNewProduct />
      </OpenFromSide>
    </div>
  );
};

export default MainNewProduct;

//можно обьеденить логику распределенного url по нововстройке с компонентом