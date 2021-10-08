import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  InputGroup,
  Row,
  Col,
  Container,
  Image,
} from "react-bootstrap";
import { getCategories } from "../../../redux/actions";
import { getToken } from "../../../utils/index";
import axios from "axios";
import { GET_PRODUCTS_URL } from "../../../consts";
import swal from "sweetalert";

export default function CreateProduct() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoryReducer.categories);
  const [newProduct, setNewProduct] = useState({
    name: undefined,
    price: 0,
    newItem: true,
    image: [],
    stock: 0,
    description: "",
    categoryID: [],
    brand: 1,
  });
  const [image, setImage] = useState();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    if (newProduct.name === undefined) {
      e.preventDefault();
      swal("Ingrese un nombre al producto");
    } else if (newProduct.price === 0) {
      e.preventDefault();
      swal("Ingrese un precio valido");
    } else if (newProduct.image.length === 0) {
      e.preventDefault();
      swal("Agregue una foto por lo menos");
    } else if (newProduct.description.length < 50) {
      e.preventDefault();
      swal("Ingrese una descripcion con al menos 50 caracteres");
    } else if (newProduct.categoryID.length < 1) {
      e.preventDefault();
      swal("Ingrese una categoria al menos");
    } else if (newProduct.stock < 1) {
      e.preventDefault();
      swal("Ingrese un stock");
    } else {
      console.log(newProduct, "", newProduct.categoryID.length);

      e.preventDefault();
      await axios.post(`${GET_PRODUCTS_URL}create`, newProduct, {
        headers: {
          authorization: getToken(),
        },
      });

      swal("Este producto ha sido creado exitosamente");
    }
  };

  const onChangeInput = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };
  const onChangeImage = (e) => {
    setImage(e.target.value);
  };
  const onAddImage = (image) => {
    if (image?.length < 10 || image === undefined) {
      swal("Ingrese un url valido");
    } else if (!newProduct.image.includes(image)) {
      setNewProduct({
        ...newProduct,
        image: [...newProduct.image, image],
      });
    } else if (newProduct.image.includes(image)) {
      setNewProduct({
        ...newProduct,
        image: newProduct.image.filter((e) => e != image),
      });
    }
  };
  const categoris = (catID) => {
    if (!newProduct.categoryID.includes(catID)) {
      setNewProduct({
        ...newProduct,
        categoryID: [...newProduct.categoryID, catID],
      });
    } else if (newProduct.categoryID.includes(catID)) {
      setNewProduct({
        ...newProduct,
        categoryID: newProduct.categoryID.filter((e) => e != catID),
      });
    }
  };

  return (
    <div className="container">
      <div className="col-lg-4 mx-auto text-center">
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="nombre"
              placeholder="Ingrese nombre"
              name="name"
              onChange={(e) => {
                onChangeInput(e);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese Precio"
              name="price"
              onChange={(e) => {
                onChangeInput(e);
              }}
              min="0"
              defaultValue="0"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Imagenes</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type="imagenes"
                placeholder="Ingrese Imagenes"
                name="imagenes"
                onChange={(e) => {
                  onChangeImage(e);
                }}
              />
              <Button
                onClick={() => onAddImage(image)}
                variant="outline-secondary"
              >
                Añadir
              </Button>
            </InputGroup>
            <Form.Group className="mb-3">
              <Form.Label>Imagenes Cargadas</Form.Label>
              <Container>
                {newProduct.image?.map((e) => (
                  <Row>
                    <Col xs={6} md={4}>
                      <Button
                        onClick={() =>
                          setNewProduct({
                            ...newProduct,
                            image: newProduct.image.filter((j) => j != e),
                          })
                        }
                      >
                        x
                      </Button>
                      <Image src={e} rounded />
                    </Col>
                  </Row>
                ))}
              </Container>
            </Form.Group>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripcion</Form.Label>
            <Form.Control
              as="textarea"
              style={{ height: "100px" }}
              type="descripcion"
              placeholder="Ingrese Descripcion"
              name="description"
              onChange={(e) => {
                onChangeInput(e);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Seleccione las Categorias</Form.Label>
            <div>
              {categories?.map((cat) => {
                return (
                  <span key={cat.id}>
                    <Button
                      variant={
                        newProduct.categoryID.includes(cat.id)
                          ? "dark"
                          : "secondary"
                      }
                      onClick={() => categoris(cat.id)}
                    >
                      {cat.nameCategory}
                    </Button>{" "}
                  </span>
                );
              })}
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese Stock"
              name="stock"
              onChange={(e) => {
                onChangeInput(e);
              }}
              min="0"
              defaultValue="0"
            />
          </Form.Group>
          <Button variant="dark" type="submit">
            Agregar Producto
          </Button>
        </Form>
      </div>{" "}
    </div>
  );
}
