import React from "react";
import style from "./BarraAdmin.module.css";
import {
  Navbar,
  Container,
  NavDropdown,
  Nav,
  Tabs,
  Tab,
} from "react-bootstrap";
import ProductTable from "../Admin/Tables/ProductTable/ProductTable";
import UsersTable from "../Admin/Tables/UsersTable/UsersTable";
import CategoriasTable from "../Admin/Tables/CategoriasTable/CategoriasTable";
const BarraAdmin = () => {
  return (
    <div className={style.container}>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="Perfil" title="Perfil">
          <h1>Perfil</h1>
        </Tab>
        <Tab eventKey="Productos" title="Productos">
          <h1>Productos</h1>
          <ProductTable />
        </Tab>

        <Tab eventKey="Categorias" title="Categorias">
          <CategoriasTable />
        </Tab>
        <Tab eventKey="Usuarios" title="Usuarios">
          <UsersTable />
        </Tab>
        <Tab eventKey="Ordenes" title="Ordenes">
          <h1>Ordenes</h1>
        </Tab>
      </Tabs>
    </div>
  );
};
export default BarraAdmin;
