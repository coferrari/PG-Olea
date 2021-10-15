import React from "react";
import ReactDOM from "react-dom";
import style from "../Map/Map.module.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = ({ position, address }) => {
  const position1 = position ? [position[0], position[1]] : "[]";
  console.log(position);
  return position ? (
    <div id="mapid" className={style.map}>
      <MapContainer
        center={position1}
        zoom={15}
        scrollWheelZoom={false}
        className={style.map}
      >
        <TileLayer
          attribution='<a  href="https://www.google.com/maps/dir//-37.4581198,-61.9376018/@-37.4580681,-62.0078425,12z">OpenGoogleMaps</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position1}>
          <Popup>
            Sucursal de <br />
            Olea en
            <br />
            {address}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  ) : (
    <div>Esta cargando</div>
  );
};
export default Map;
