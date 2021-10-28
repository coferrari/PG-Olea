import React, { useState, useEffect } from "react";
import { Button, InputGroup, FormControl, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Map from "../../Map/Map";
import { getStores } from "../../../redux/actions/index";
import axios from "axios";
import { STORES_URL } from "../../../consts";
import { getToken } from "../../../utils/index";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  MapConsumer,
} from "react-leaflet";
import style from "../Stores/Stores.module.css";
import swal from "sweetalert";
function Stores() {
  const dispatch = useDispatch();
  const stores = useSelector((state) => state.storesReducer.stores);
  const [address, setAddress] = useState("");
  const [position, setPosition] = useState(null);

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
  const submitStore = async (e) => {
    e.preventDefault();
    await axios.post(
      `${STORES_URL}`,
      { address: address, location: position },
      {
        headers: {
          authorization: getToken(),
        },
      }
    );

    swal("Este local se a agregado correctamente").then(function () {
      window.location = "/account";
    });
  };

  return (
    <div>
      {stores.length === 0 ? (
        <div className={style.frm}>
          <div className={"container"}>
            <h1>No hay locales agregados</h1>

            <div className={style.frm}>
              {" "}
              <Form>
                <Form.Group className="mb-3"></Form.Group>
                <Form.Group className="mb-3">
                  <h3>Agregar Locales</h3>
                  <Form.Label>
                    Ingrese la direccion de la nueva sucursal
                  </Form.Label>
                  <InputGroup className="mb-3" className={style.input}>
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
              {
                <div id="mapid" className={style.map}>
                  <MapContainer
                    center={position === null ? [0, 0] : position}
                    zoom={15}
                    scrollWheelZoom={false}
                    className={style.map}
                  >
                    <MapConsumer>
                      {(map) => {
                        map.flyTo(position === null ? [0, 0] : position);
                        map.zoom = 15;
                        return null;
                      }}
                    </MapConsumer>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={position === null ? [0, 0] : position}>
                      <Popup>
                        Sucursal de <br />
                        Olea en
                        <br />
                        {address}
                      </Popup>
                    </Marker>
                  </MapContainer>
                  <div className={style.btn}>
                    {position !== null ? (
                      <Button onClick={(e) => submitStore(e)}>
                        Agregar Local
                      </Button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="container">
            <Form>
              <Form.Group className="mb-3"></Form.Group>
              <Form.Group className="mb-3">
                <h3>Agregar Locales</h3>
                <Form.Label>
                  Ingrese la direccion de la nueva sucursal
                </Form.Label>
                <InputGroup className="mb-3" className={style.input}>
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
            {
              <div id="mapid" className={style.map}>
                <MapContainer
                  center={stores[0].location}
                  zoom={20}
                  scrollWheelZoom={false}
                  className={style.map}
                >
                  <MapConsumer>
                    {(map) => {
                      map.flyTo(
                        position === null ? stores[0].location : position
                      );
                      map.zoom = 15;
                      return position === null ? null : (
                        <Marker position={position}>
                          <Popup>
                            Sucursal de <br />
                            Olea en
                            <br />
                            {address}
                          </Popup>
                        </Marker>
                      );
                    }}
                  </MapConsumer>
                  {stores?.map((e) => (
                    <Marker position={e.location}>
                      {" "}
                      <Popup>
                        Sucursal de <br />
                        Olea en
                        <br />
                        {e.address}
                      </Popup>
                    </Marker>
                  ))}
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                </MapContainer>
                <div className={style.btn}>
                  {position !== null ? (
                    <Button onClick={(e) => submitStore(e)}>
                      Agregar Local
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            }
            <div className={style.flex}>
              <Row xs={1} md={2} className="g-4">
                {stores.map((e) => {
                  return (
                    <div className={style.stores}>
                      <div>
                        <label>{e.address}</label>
                        <Button
                          className={style.x}
                          variant="danger"
                          onClick={async () => {
                            await axios.delete(STORES_URL + "/" + e.id, {
                              headers: {
                                authorization: getToken(),
                              },
                            });
                            await dispatch(getStores());
                          }}
                        >
                          X
                        </Button>
                      </div>
                      <Map position={e.location} address={e.address} />
                    </div>
                  );
                })}
              </Row>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Stores;
