import { useGetPropertiesQuery } from "../../api/endpoints/propertiesApiSlice";
import GridList from "../../components/layout/GridList/GridList";
import "./filteredPage.scss";
import { useParams } from "react-router-dom";
import Loading from "../../components/common/Loading/Loading";
import EmptyPage from "../../components/common/EmptyPage/EmptyPage";

const FilteredPage = () => {
  const { category } = useParams();
  const { data: houses, isLoading, error } = useGetPropertiesQuery(category);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <EmptyPage />;
  }

  return (
    <div className="filtered-page container  container__side">
      <GridList products={houses?.properties} />
    </div>
  );
};

export default FilteredPage;

// важно пагинацию както надо решить и лимит
