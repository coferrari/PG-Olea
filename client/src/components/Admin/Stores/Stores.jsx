import React, { useState, useEffect } from "react";
import { Button, Card, InputGroup, FormControl, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Map from "../../Map/Map";
import { getStores } from "../../../redux/actions/index";
import axios from "axios";
import { STORES_URL } from "../../../consts";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  MapConsumer,
} from "react-leaflet";
import style from "../Stores/Stores.module.css";
function Stores() {
  const dispatch = useDispatch();
  const stores = useSelector((state) => state.storesReducer.stores);
  const [address, setAddress] = useState("");
  const [position, setPosition] = useState([]);

  useEffect(() => {
    dispatch(getStores());
  }, [dispatch, position]);
  const onChangeAddress = (e) => {
    e.preventDefault();
    setAddress(e.target.value);
  };

  const onClickAddress = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://api.geoapify.com/v1/geocode/search?text=${address}&limit=1&format=json&apiKey=7cdeaa9562f54434850b50b6174ba3e0`
      )
      .then((response) => {
        const pos = response.data.results[0];
        setPosition([pos.lat, pos.lon]);
      })
      .catch((error) => error);
  };

  return (
    <div>
      {stores.length === 0 ? (
        <div>
          <h1>No hay locales agregados</h1>
          <h3>Agregar Locales</h3>
          <div className="container">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Ingrese la direccion de la Sucursal</Form.Label>
              </Form.Group>
              <Form.Group className="mb-3">
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Ingrese una direccion"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    onChange={(e) => {
                      onChangeAddress(e);
                    }}
                  />

                  <Button
                    variant="outline-secondary"
                    id="button-addon2"
                    onClick={(e) => onClickAddress(e)}
                  >
                    Button
                  </Button>
                </InputGroup>
              </Form.Group>
            </Form>
            {position.length === 0 ? (
              <h3>Por favor ingrese una direccion</h3>
            ) : (
              <div id="mapid" className={style.map}>
                <MapContainer
                  center={position}
                  zoom={15}
                  scrollWheelZoom={false}
                  className={style.map}
                >
                  <TileLayer
                    attribution='<a  href="https://www.google.com/maps/dir//-37.4581198,-61.9376018/@-37.4580681,-62.0078425,12z">OpenGoogleMaps</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={position}>
                    <Popup>
                      Sucursal de <br />
                      Olea en
                      <br />
                      {address}
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="container">
          {stores.map((e) => {
            return (
              <div>
                <label>{e.address}</label>
                <Button
                  onClick={async () => {
                    await axios.delete(STORES_URL + "/" + e.id);
                    await dispatch(getStores());
                  }}
                >
                  x
                </Button>
                <Map position={e.location} address={e.address} />
              </div>
            );
          })}
          <div className="container">
            <Form onSubmit={(e) => e.preventDefault()}>
              <Form.Group className="mb-3">
                <Form.Label>Ingrese la direccion de la Sucursal</Form.Label>
              </Form.Group>
              <Form.Group className="mb-3">
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Ingrese una direccion"
                    onChange={(e) => {
                      onChangeAddress(e);
                    }}
                  />

                  <Button
                    onClick={async (e) => {
                      await onClickAddress(e);
                    }}
                  >
                    Button
                  </Button>
                </InputGroup>
              </Form.Group>
            </Form>
            {position.length === 0 ? (
              <h3>Por favor ingrese una direccion</h3>
            ) : (
              <div id="mapid" className={style.map}>
                <MapContainer
                  center={position}
                  zoom={15}
                  scrollWheelZoom={false}
                  className={style.map}
                >
                  <MapConsumer>
                    {(map) => {
                      map.flyTo(position);
                      map.zoom = 15;
                      return null;
                    }}
                  </MapConsumer>
                  <TileLayer
                    attribution='<a  href="https://www.google.com/maps/dir//-37.4581198,-61.9376018/@-37.4580681,-62.0078425,12z">OpenGoogleMaps</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={position}>
                    <Popup>
                      Sucursal de <br />
                      Olea en
                      <br />
                      {address}
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Stores;
