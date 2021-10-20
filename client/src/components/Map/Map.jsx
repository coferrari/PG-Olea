import React from "react";

import style from "../Map/Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  MapConsumer,
} from "react-leaflet";
import { useSelector } from "react-redux";

const Map = ({ position, address }) => {
  const position1 = position ? [position[0], position[1]] : "[]";

  return position ? (
    <div id="mapid" className={style.map}>
      <MapContainer
        center={position1}
        zoom={15}
        scrollWheelZoom={false}
        className={style.map}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapConsumer>
          {(map) => {
            map.flyTo(position1 === null ? [0, 0] : position1);
            map.zoom = 15;
            return null;
          }}
        </MapConsumer>
        <Marker position={position1}>
          <Popup>
            Sucursal de
            <br />
            Olea en
            <br />
            {address}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  ) : (
    <div></div>
  );
};
export default Map;
