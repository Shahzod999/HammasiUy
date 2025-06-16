import { Map, MapRef, Marker, NavigationControl } from "@vis.gl/react-maplibre";
import darkStyle from "../../components/common/MapContainer/lib/dark.json";
import "../../components/common/MapContainer/style.scss";
import "maplibre-gl/dist/maplibre-gl.css";

import type { StyleSpecification } from "maplibre-gl";

import SVG from "react-inlinesvg";
import { useAppSelector } from "../../hooks/redux";
import { selectedUserLocation } from "../../store/slices/userLocationSlice";
import { useGetByMapQuery } from "../../api/endpoints/getByMapApiSlice";
import { useRef, useState } from "react";
import { formatPrice } from "../../utils/priceFormat";
import { useURLState } from "../../hooks/useURLState";

interface MapBoundary {
  northEast: { lat: number; lng: number };
  southWest: { lat: number; lng: number };
}

interface Property {
  _id: string;
  coordinates: {
    lat: number;
    long: number;
  };
  currency: string;
  price: number;
  rooms: number;
}

const MapHolder = () => {
  const { setParam } = useURLState();
  const [bounds, setBounds] = useState<MapBoundary | null>(null);
  const { data, isLoading } = useGetByMapQuery(bounds, {
    skip: !bounds, // не запрашиваем, пока не появятся границы
  });
  const isDark = window.Telegram.WebApp.colorScheme === "dark";
  const lightStyle = "https://tiles.openfreemap.org/styles/liberty";

  const userLocation = useAppSelector(selectedUserLocation);

  const mapRef = useRef<MapRef | null>(null);

  const onMoveEnd = () => {
    const b = mapRef.current?.getBounds();
    if (b) {
      setBounds({
        northEast: { lat: b.getNorthEast().lat, lng: b.getNorthEast().lng },
        southWest: { lat: b.getSouthWest().lat, lng: b.getSouthWest().lng },
      });
    }
  };

  return (
    <div className="map-container">
      <Map
        ref={mapRef}
        onMoveEnd={onMoveEnd}
        initialViewState={{
          longitude: userLocation.lon,
          latitude: userLocation.lat,
          zoom: 16,
          pitch: 15,
        }}
        mapStyle={isDark ? (darkStyle as StyleSpecification) : lightStyle}
        attributionControl={false}
        style={{ width: "100%", height: "100vh" }}>
        {/* User marker */}
        <Marker
          longitude={userLocation.lon}
          latitude={userLocation.lat}
          color="red"
          anchor="bottom"
          className="Marker">
          <SVG src="/svg/pin.svg" />
        </Marker>

        {/* Property markers */}
        {!isLoading &&
          data &&
          data.map((property: Property) => (
            <Marker
              key={property._id}
              longitude={property.coordinates.long}
              latitude={property.coordinates.lat}
              anchor="bottom"
              onClick={() => setParam("productId", property._id)}
              className="PropertyMarker">
              <div className="property-marker">
                <div className="price">
                  {formatPrice(property.price)} {property.currency}
                </div>
                <div className="rooms">{property.rooms} комн.</div>
              </div>
            </Marker>
          ))}

        <NavigationControl position="top-right" showCompass={false} />
      </Map>
    </div>
  );
};

export default MapHolder;
