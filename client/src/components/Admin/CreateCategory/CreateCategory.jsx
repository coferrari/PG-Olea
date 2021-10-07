import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../../redux/actions";
import { Button, Form, Modal } from "react-bootstrap";
import { createCategory } from "../../../auth/admin";
const CreateCategory = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  let products = useSelector((state) => state.productsReducer.products);
  const [input, setInput] = useState({
    texto: "",
    productos: [],
  });
  const [productosName, setProductosName] = useState([]);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const handleInputChange = (e) => {
    setInput((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const addProduct = (e) => {
    let value = e.target.value.split(" ");
    console.log(value);
    let step = [...input.productos];
    step[input.productos.length] = e.target.value[0];
    let productsName = [...productosName];
    console.log(e.target.value[1]);
    productsName[productosName.length] = e.target.value[1];
    e.preventDefault();
    setInput((previous) => {
      return {
        productos: step,
      };
    });
    setProductosName(productsName);
  };
  const filterProduct = (e, name) => {
    e.preventDefault();
    setInput((previous) => {
      return {
        ...previous,
        productos: input.productos.filter((c) => c === name),
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCategory(input);
    setShow(false);
  };
  return (
    <div>
      <Button variant="primary" onClick={() => setShow(true)}>
        Crear una categoria
      </Button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Crear una categoria
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre de la categoria</Form.Label>
              <Form.Control
                type="category"
                placeholder="Ingrese nombre de la categoria"
                name="texto"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Select
              onChange={(e) => {
                addProduct(e);
              }}
              aria-label="Default select example"
            >
              <option>Despliegue el menu</option>
              {products?.map((c) => {
                return (
                  <option key={c.id} value={[c.id, c.name]}>
                    {c.name}
                  </option>
                );
              })}
            </Form.Select>
            {productosName?.map((c) => {
              return (
                <div>
                  <div>
                    {c}
                    <button onClick={(e) => filterProduct(e, c)}>x</button>
                  </div>
                </div>
              );
            })}
          </Form>
          <Button
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Crear
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default CreateCategory;
