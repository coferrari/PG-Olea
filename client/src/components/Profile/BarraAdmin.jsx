import React from "react";
import style from "./BarraAdmin.module.css";
import { Tabs, Tab } from "react-bootstrap";
import ProductTable from "../Admin/Tables/ProductTable/ProductTable";
import UsersTable from "../Admin/Tables/UsersTable/UsersTable";
import CategoriasTable from "../Admin/Tables/CategoriasTable/CategoriasTable";
import CreateProduct from "../Admin/CreateProduct/CreateProduct";
import ProfileAdmin from "../Profile/ProfileAdmin";
import OrdersTable from "../Admin/Tables/OrdersTable";
const BarraAdmin = () => {
  return (
    <div className={style.container}>
      <Tabs
        defaultActiveKey="Perfil"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="Perfil" title="Perfil">
          <ProfileAdmin />
        </Tab>
        <Tab eventKey="Productos" title="Productos">
          <ProductTable />
        </Tab>
        <Tab eventKey="Categorias" title="Categorias">
          <CategoriasTable />
        </Tab>
        <Tab eventKey="Usuarios" title="Usuarios">
          <UsersTable />
        </Tab>
        <Tab eventKey="Ordenes" title="Ordenes">
          <OrdersTable />
        </Tab>
        <Tab eventKey="Añadir producto" title="Añadir producto">
          <CreateProduct />
        </Tab>
      </Tabs>
    </div>
  );
};
export default BarraAdmin;
