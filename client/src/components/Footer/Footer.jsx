
import React, { useState, useEffect } from "react";

import logo from "../../img/OLEA marca de agua-08.png";
import style from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import Map from "../Map/Map";
import { STORES_URL } from "../../consts";
import { Dropdown, DropdownButton } from "react-bootstrap";
import axios from "axios";
import { suscribeNewsLetter } from "../../auth/users";
import { decodeToken } from "../../utils";
import swal from "sweetalert";
function Footer() {
  const [stores, setStores] = useState(null);
  const [address, setAddress] = useState("Eliga el local que desee localizar");
  const [position, setPosition] = useState();
  useEffect(() => {
    axios.get(STORES_URL).then((response) => {
      setStores(response.data);
    });
    if (stores !== null) {
      setAddress(stores[0].address);
    }
  }, []);
 const [input, setInput] = useState("");
  const onChange = (e) => {
    setInput(e.target.value);
  };
  const user = decodeToken();
  const suscribe = async (e) => {
    e.preventDefault();
    try {
      const x = await suscribeNewsLetter(input);
    } catch (err) {
      swal("Registre su email primero");
      
    }
  };

  return (
    <div>
      <footer className={style.footer}>
        <div className={style.footer__flex}>
          <div className={style.footer__flexitem}>
            <h5 className={style.subtitles}>somos olea</h5>
            <ul className={style.ul}>
              <li className={style.list}>
                OLEA nace con la intención de incorporar productos amigables con
                el medio ambiente en nuestra vida diaria.
              </li>
              <li className={style.list}>
                Es por eso que decidimos acercarte alimentos saludables,
                cosmética natural, objetos sustentables y muchas cosas más.
              </li>
            </ul>
          </div>
          <div>
            <div>
              <DropdownButton id="dropdown-item-button" title={address}>
                {stores?.map((e) => {
                  return (
                    <Dropdown.Item
                      onClick={() => {
                        setAddress(e.address);
                        setPosition(e.location);
                      }}
                      as="button"
                    >
                      {e.address}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
              <Map position={position} address={address} />
            </div>
          </div>
          <div className={style.footer__flexitem}>
            <h5 className={style.subtitles}>contacto</h5>
            <ul className={style.ul}>
              <li className={style.list}>Garibaldi 283</li>
              <li className={style.list}>Coronel Suárez</li>
              <li className={style.list}>
                Lu a Vi 9:30-12:30, 17:30-19:30 y Sa 10-12:30
              </li>
            </ul>
            <div className={style.footer__socialmediasecondary}>
              <a
                href="https://www.instagram.com/somos.olea/"
                target="_BLANK"
                rel="noreferrer"
                className={style.somosolea}
              >
                @somosolea
              </a>
              <div className={style.containericon}>
                <a
                  href="https://www.instagram.com/somos.olea/"
                  target="_BLANK"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className={style.igicon}
                  />
                </a>
              </div>
            </div>
          </div>

          <div className={style.footer__flexitem}>
            <h5 className={style.subtitles}>newsletter</h5>
            <ul className={style.ul}>
              <li className={style.list}>
                Si querés suscribirte a nuestro newsletter semanal con
                novedades, dejanos tu mail
              </li>
            </ul>
            <form
              className={style.footer__flexformnewsletter}
              action=""
              onSubmit={(e) => suscribe(e)}
              autocomplete="off"
            >
              <input
                type="email"
                className={style.footer__flexemail}
                name="email"
                onChange={onChange}
                placeholder="name@example.com"
              />
              <input
                type="submit"
                className={style.footer__flexbutton}
                value="Suscribite"
              />
            </form>
          </div>
          {/* // ) : (
          //   <div className={style.footer__flexitem}>
          //     <h5 className={style.subtitles}>newsletter</h5>
          //     <ul className={style.ul}>
          //       <li className={style.list}>
          //         Usted esta suscripto a nuestro newsletter semanal, desea
          //         anular la suscripción?
          //       </li>
          //     </ul>
          //   </div>
          // )} */}
        </div>
        <div className={style.footer__socialmedia}>
          <div className={style.footer__socialmediaprincipal}>
            <div>
              <img
                className={style.footer_logo}
                src={logo}
                alt="Almacén sustentable"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
