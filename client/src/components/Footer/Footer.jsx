import React from "react";
import logo from "../../img/OLEA marca de agua-08.png";
import { Link } from "react-router-dom";
import style from "./Footer.module.css";
import { Container } from "react-bootstrap";

function Footer() {
  return (
    <div>
      <footer className={style.footer}>
        <div className={style.footer__flex}>
          <div className={style.footer__flexitem}>
            <h5 className={style.subtitles}>somos olea</h5>
            <ul className={style.ul}>
              <li className={style.list}>Lorem Ipsum is simply dummy text</li>
              <li className={style.list}>
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s.
              </li>
            </ul>
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
              <Link to="https://www.instagram.com/somos.olea/" target="_BLANK">
                @somosolea
              </Link>
              <div>
                <Link
                  to="https://www.instagram.com/somos.olea/"
                  target="_BLANK"
                >
                  <img
                    className={style.footerimg}
                    src="./img/icon_instagram.png"
                    alt="Instagram"
                  />
                </Link>
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
              method="post"
            >
              <input
                type="email"
                className={style.footer__flexemail}
                name="email"
                placeholder="name@example.com"
              />
              <input
                type="submit"
                className={style.footer__flexbutton}
                value="Suscribite"
              />
            </form>
          </div>
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
