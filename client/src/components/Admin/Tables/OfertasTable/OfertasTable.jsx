import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./OfertasTable.module.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import { offerCategory } from "../../../../cart/index";
function OfertasTable() {
  const [value, onChange] = useState(new Date());

  const [offCat, setOffCat] = useState({
    idCat: 0,
    offCat: 0,
  });
  const onChangeCat = (e) => {
    e.preventDefault();
    setOffCat({
      ...offCat,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitCat = (e) => {
    e.preventDefault();

    if (!offCat.idCat && !offCat.offCat && !value) {
      alert("faltan parametros");
    }
    let valor = value.toLocaleDateString();
    offerCategory(offCat, valor);
    setOffCat({
      idCat: "",
      offCat: 0,
    });
  };
  return (
    <div className={styles.main}>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="Producto" title="Producto">
          <form className={styles.container}>
            <input
              type="text"
              placeholder="Ingrese el ID de una categoria"
              required
              className={styles.id}
            />
            <span>Porcentaje de descuento</span>
            <input type="range" min={0} max={100} step={5} required />

            <Button type="submit">Enviar</Button>
          </form>
        </Tab>
        <Tab eventKey="Categorias" title="Categorias">
          <Calendar onChange={onChange} value={value} />
          <form className={styles.container} onSubmit={(e) => onSubmitCat(e)}>
            <input
              type="text"
              placeholder="Ingrese el ID de una categoria"
              required
              className={styles.id}
              name="idCat"
              onChange={(e) => onChangeCat(e)}
            />
            <span>Porcentaje de descuento</span>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              required
              name="offCat"
              onChange={(e) => onChangeCat(e)}
            />

            <Button type="submit">Enviar</Button>
          </form>
        </Tab>
      </Tabs>
    </div>
  );
}

export default OfertasTable;
