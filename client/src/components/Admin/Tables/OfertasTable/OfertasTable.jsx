import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./OfertasTable.module.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { offerCategory, offerProduct } from "../../../../cart/index";
import { productOfert, categoryOfert } from "../../../../auth/admin";
import Ofertas from "./Ofertas";
import swal from "sweetalert";
function OfertasTable() {
  const [value, onChange] = useState(new Date());
  const [offCat, setOffCat] = useState({
    idCat: 0,
    offCat: 0,
  });
  const [productOff, setProductOff] = useState({
    idProduct: 0,
    offProduct: 0,
  });
  const categories = useSelector((state) => state.categoryReducer.categories);
  const product = useSelector((state) => state.productsReducer.products);
  const onChangeProduct = (e) => {
    e.preventDefault();
    setProductOff({
      ...productOff,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitProduct = async (e) => {
    e.preventDefault();
    if (!productOff.idProduct && !productOff.offProduct && !value) {
      return alert("faltan parametros");
    }
    let valor = value.toLocaleDateString();
    offerProduct(productOff, valor);
    setProductOff({
      idProduct: 0,
      offProduct: 0,
    });
    await productOfert(productOff.idProduct, productOff.offProduct, valor);
    swal("Se agrego la oferta");
  };
  const onChangeCat = (e) => {
    e.preventDefault();
    setOffCat({
      ...offCat,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmitCat = async (e) => {
    e.preventDefault();
    if (!offCat.idCat && !offCat.offCat && !value) {
      return alert("faltan parametros");
    }
    let valor = value.toLocaleDateString();
    offerCategory(offCat, valor);
    const res = await categoryOfert(offCat.idCat, offCat.oofCat, valor);
    setOffCat({
      idCat: 0,
      offCat: 0,
    });
    swal("Se agrego la oferta");
  };

  return (
    <div className={styles.main}>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="Producto" title="Producto">
          <Calendar onChange={onChange} value={value} />
          <form
            className={styles.container}
            onSubmit={(e) => onSubmitProduct(e)}
          >
            <select onChange={(e) => onChangeProduct(e)} name="idProduct">
              <option value="">Seleccione un producto</option>
              {product &&
                product.map((p) => (
                  <option value={p.id} key={p.id}>
                    {p.name}
                  </option>
                ))}
            </select>
            <input
              type="range"
              defaultValue="0"
              min={0}
              max={100}
              step={5}
              required
              name="offProduct"
              onChange={(e) => onChangeProduct(e)}
            />
            <label>{productOff.offProduct} % de descuento</label>
            <Button type="submit">Enviar</Button>
          </form>
        </Tab>
        <Tab eventKey="Categorias" title="Categorias">
          <Calendar onChange={onChange} value={value} />
          <form className={styles.container} onSubmit={(e) => onSubmitCat(e)}>
            <select onChange={(e) => onChangeCat(e)} name="idCat">
              <option value="">Seleccione una categoria</option>
              {categories &&
                categories.map((c) => (
                  <option value={c.id} key={c.id}>
                    {c.nameCategory}
                  </option>
                ))}
            </select>

            <input
              defaultValue="0"
              type="range"
              min={0}
              max={100}
              step={5}
              required
              name="offCat"
              onChange={(e) => onChangeCat(e)}
            />
            <label> {offCat.offCat} % de descuento</label>
            <Button type="submit">Enviar</Button>
          </form>
        </Tab>
        <Tab eventKey="Ofertas" title="Ofertas">
          <Ofertas />
        </Tab>
      </Tabs>
    </div>
  );
}

export default OfertasTable;
