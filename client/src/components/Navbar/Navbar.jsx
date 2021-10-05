import { Link, useHistory } from "react-router-dom";
import Register from "../Register/Register";
import { isAuthorized, decodeToken } from "../../utils/index";
import { Navbar, Container, Nav } from "react-bootstrap";
import Logo from "../../img/OLEA marca de agua-07.png";
import style from "./Navbar.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/actions";

const NavResponsive = () => {
  const validate = isAuthorized();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoryReducer.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  if (validate) {
    const user = decodeToken();
    console.log(categories);
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Link to="/">
              <Navbar.Brand>
                <img height="140px" src={Logo} alt="Olea" />
              </Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                {categories?.map((category) => {
                  return (
                    <Nav.Link>
                      <Link
                        to={`/category/${category.nameCategory}`}
                        className={style.links}
                      >
                        {category.nameCategory}
                      </Link>
                    </Nav.Link>
                  );
                })}
                </Nav>
              <Nav className={style.containersession}>
                <Nav.Link className={style.username}>{user.username}</Nav.Link>
                <Nav.Link>
                  <Link to="/account" className={style.linkssesion}>
                    <li>Mi cuenta</li>
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/logout" className={style.linkssesion}>
                    <li>Cerrar sesión</li>
                  </Link>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Link to="/">
            <Navbar.Brand>
              <img height="140px" src={Logo} alt="Olea" />
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">

              {categories?.map((category) => {
                return (
                  <Nav.Link>
                    <Link
                      to={`/category/${category.nameCategory}`}
                      className={style.links}
                    >
                      {category.nameCategory}
                    </Link>
                  </Nav.Link>
                );
              })}

            </Nav>
            <Nav>
              <Nav.Link>
                <Link to="/login" className={style.linkssesion}>
                  <li>Iniciar sesión</li>
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/register" className={style.linkssesion}>
                  <li>Registrarse</li>
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavResponsive;
