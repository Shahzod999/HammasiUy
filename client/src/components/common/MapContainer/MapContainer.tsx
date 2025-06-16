import { Map, Marker, NavigationControl } from "@vis.gl/react-maplibre";
import darkStyle from "./lib/dark.json";
import "./style.scss";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import type { StyleSpecification } from "maplibre-gl";
import Loading from "../Loading/Loading";
import SVG from "react-inlinesvg";
import { useAppSelector } from "../../../hooks/redux";
import { selectedUserLocation } from "../../../store/slices/userLocationSlice";
interface MapContainerProps {
  long: number | undefined;
  lat: number | undefined;
  zoom: number;
  setNewLocation?: (location: {
    long: number;
    lat: number;
    zoom: number;
  }) => void;
  isFetching?: boolean;
}

const MapContainer = ({
  long,
  lat,
  zoom,
  setNewLocation,
  isFetching,
}: MapContainerProps) => {
  const [moveStart, setMoveStart] = useState(false);

  const isDark = window.Telegram.WebApp.colorScheme === "dark";
  const lightStyle = "https://tiles.openfreemap.org/styles/liberty";

  const mapRef = useRef<any>(null);
  const timerRef = useRef(0);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo({ center: [long, lat], zoom });
    }
  }, [long, lat]);

  if (!long || !lat) return <Loading />;

  const handleMove = () => {
    setMoveStart(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const handleMoveEnd = (evt: any) => {
    setMoveStart(false);

    const center = evt.target.getCenter();

    const latDifference = Math.abs(center.lat - lat);
    const lngDifference = Math.abs(center.lng - long);

    if (latDifference < 1e-10 && lngDifference < 1e-10) return;

    timerRef.current = setTimeout(() => {
      setNewLocation?.({
        long: center.lng,
        lat: center.lat,
        zoom: mapRef.current.getZoom(),
      });
    }, 1000);
  };

  const userLocation = useAppSelector(selectedUserLocation);
  const handleResetLocation = () => {
    setNewLocation?.({
      long: userLocation.lon,
      lat: userLocation.lat,
      zoom: zoom,
    });
  };
  return (
    <div className="map-container">
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: long,
          latitude: lat,
          zoom,
          pitch: 15,
        }}
        mapStyle={isDark ? (darkStyle as StyleSpecification) : lightStyle}
        attributionControl={false}
        onMoveEnd={handleMoveEnd}
        onMoveStart={handleMove}
        style={{ width: "100%", height: "100vh" }}>
        {setNewLocation ? (
          // для маркера который всегда по середине экрана и указывает новую локацию
          <>
            <div
              className={`Marker__Iconlocation ${
                moveStart ? "MarkerMoveStart" : ""
              }`}>
              <div className="MarkerSvgPin">
                <SVG src="/svg/pin.svg" />
                {isFetching && <span className="loading-circle"></span>}
              </div>
              <div className="MarkerShadowEffect"></div>
            </div>
            <div className="resetLocation" onClick={handleResetLocation}>
              <SVG src="/svg/location.svg" />
            </div>
          </>
        ) : (
          // для маркера который на месте не двигается от карты
          <Marker
            longitude={long}
            latitude={lat}
            color="red"
            anchor="bottom"
            className="Marker">
            <SVG src="/svg/pin.svg" />
          </Marker>
        )}
        <NavigationControl position="top-right" showCompass={false} />
      </Map>
    </div>
  );
};

export default MapContainer;
