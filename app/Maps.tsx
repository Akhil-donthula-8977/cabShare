import React, { useEffect } from "react";
import { LatLngTuple, LatLngExpression } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";

const icon = L.icon({
  iconUrl: "./62766-map-symbol-computer-location-icons-free-download-png-hd.png",
  iconSize: [38, 38],
});

const position: LatLngExpression =[51.505, -0.09]

function ResetCenterView(props) {
  const { selectPosition } = props;
  const map = useMap();

  useEffect(() => {
    if (selectPosition && selectPosition.lat && selectPosition.lon) {
      map.setView(
        L.latLng(selectPosition.lat, selectPosition.lon),
        map.getZoom(),
        {
          animate: true,
        }
      );
    }
  }, [selectPosition, map]);

  return null;
}

export default function Maps(props) {
  const { selectPosition } = props;
  const locationSelection: LatLngTuple | null =
    selectPosition && selectPosition.lat && selectPosition.lon
      ? [selectPosition.lat, selectPosition.lon]
      : null;

  return (
    <MapContainer center={position} zoom={8} style={{ width: "100%", height: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=XDIj4SEae3KKT2IQ5BHM"
      />
      {locationSelection && (
        <Marker position={[51.505, -0.09]} icon={icon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}
      <ResetCenterView selectPosition={selectPosition} />
    </MapContainer>
  );
}
