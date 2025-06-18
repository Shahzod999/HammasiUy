import SVG from "react-inlinesvg";
import { useURLState } from "../../../../hooks/useURLState";
import "./openMap.scss";
import OpenFromSide from "../../OpenFromSide/OpenFromSide";
import MapContainer from "../MapContainer";

type OpenMapProps = {
  map: string;
  lat: number;
  long: number;
  newLocation?: {
    lat: number;
    long: number;
    zoom: number;
  };
  setNewLocation?: (location: {
    lat: number;
    long: number;
    zoom: number;
  }) => void;
};

const OpenMap = ({
  map,
  lat,
  long,
  newLocation,
  setNewLocation,
}: OpenMapProps) => {
  const { setParam, getParam, deleteParam } = useURLState();
  const initialMap = getParam(map);

  return (
    <>
      <div
        className="location-info"
        onClick={() => setParam(map, `${lat},${long}`)}>
        <img src="/worldMap.jpg" alt="" />
        <div className="location-info-text">
          <SVG src="/svg/world.svg" />
          <span>Смотреть на карте</span>
        </div>
      </div>
      <OpenFromSide
        isOpen={Boolean(initialMap)}
        onClose={() => deleteParam(map)}>
        <MapContainer
          long={Number(newLocation?.long || long)}
          lat={Number(newLocation?.lat || lat)}
          zoom={newLocation?.zoom || 16}
          setNewLocation={setNewLocation}
        />
      </OpenFromSide>
    </>
  );
};

export default OpenMap;
