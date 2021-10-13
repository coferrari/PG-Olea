import React from "react";
import ReactDOM from "react-dom";
import style from "../Map/Map.module.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = () => {
  const position = [51.505, -0.09];

  return (
    <div id="mapid" className={style.map}>
      <MapContainer
        center={[-37.4581198, -61.9376018]}
        zoom={15}
        scrollWheelZoom={false}
        className={style.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.google.com/maps/place/Garibaldi+283,+B7540+Coronel+Suarez,+Provincia+de+Buenos+Aires,+Argentina/@-37.458023,-61.9376245,3a,75y,319.55h,86.22t/data=!3m6!1e1!3m4!1sk2gYBjj1wksUMAllKYjkmw!2e0!7i13312!8i6656!4m5!3m4!1s0x95eb732905e84f9d:0xd762d889ba83e14c!8m2!3d-37.4580888!4d-61.9378025">OpenGoogleMaps</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[-37.4581198, -61.9376018]}>
          <Popup>
            Sucursal de Olea en
            <br /> Coronel Suarez
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
export default Map;
