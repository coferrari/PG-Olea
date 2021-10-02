import { Link } from "react-router-dom";
import Register from "../Register/Register";
import { isAuthorized, decodeToken } from "../../utils/index";
import { Navbar, Container, Nav } from "react-bootstrap";
import Logo from "../../img/OLEA marca de agua-07.png";
import style from "./Navbar.module.css";

const NavResponsive = () => {
  const validate = isAuthorized();
  if (validate) {
    const user = decodeToken();
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
                <Nav.Link>Almacén</Nav.Link>
                <Nav.Link>Cosmética</Nav.Link>
                <Nav.Link>Decoración</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link>{user.username}</Nav.Link>
                <Nav.Link>
                  <Link to="/account">
                    <li>Mi cuenta</li>
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/logout">
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
              <Nav.Link>Almacén</Nav.Link>
              <Nav.Link>Cosmética</Nav.Link>
              <Nav.Link>Decoración</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link>
                <Link to="/login">
                  <li>Iniciar sesión</li>
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/register">
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
