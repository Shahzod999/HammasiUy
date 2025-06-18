import { useGetPropertyByIdQuery } from "../../api/endpoints/propertiesApiSlice";
import { useURLState } from "../../hooks/useURLState";
import MapHolder from "./MapHolder";
import "./MapPage.scss";

const MapPage = () => {
  const { getParam } = useURLState();
  const id = getParam("productId");
  useGetPropertyByIdQuery(id, {
    skip: !id,
  });

  return (
    <div className="map-page">
      <MapHolder />
    </div>
  );
};

export default MapPage;
