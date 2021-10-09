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
import { getCategories, getProductDetail } from "../../../redux/actions";
import { getToken } from "../../../utils/index";
import axios from "axios";

import swal from "sweetalert";
import { useParams } from "react-router";
import { GET_PRODUCTS } from "../../../redux/actions/types";
import {
  GET_PRODUCTS_URL,
  ADD_CATEGORY_PRODUCT,
  DELET_CATEGORY_PRODUCT,
} from "../../../consts";

export default function EditProduct() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoryReducer.categories);
  const product = useSelector(
    (state) => state.productDetailReducer.productDetail
  );
  const { productid } = useParams();
  const [newProduct, setNewProduct] = useState({});
  const [editCats, setEditCats] = useState(false);
  const [image, setImage] = useState();
  const [verImagenes, setVerImagenes] = useState({ compr: false, click: 0 });
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProductDetail(productid));
  }, [dispatch]);

  const handleSubmit = async (e) => {
    {
      e.preventDefault();
      await axios.put(`${GET_PRODUCTS_URL}${productid}`, newProduct, {
        headers: {
          authorization: getToken(),
        },
      });

      return swal("Este producto ha sido modificado");
    }
  };
  const handleEdit = () => {
    if (verImagenes.click === 0) {
      setNewProduct(product);
      setVerImagenes({ click: 1, compr: !verImagenes.compr });
    } else setVerImagenes({ ...verImagenes, compr: !verImagenes.compr });
    console.log(newProduct);
  };
  const onChangeInput = (e) => {
    console.log(product, "newProduct", newProduct);
    e.preventDefault();
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
    console.log(newProduct);
  };
  const categoris = async (catID) => {
    if (!newProduct.categoryID.includes(catID)) {
      await axios.post(
        `${ADD_CATEGORY_PRODUCT}`,
        {
          categoriesID: [catID],
          productID: productid,
        },
        {
          headers: {
            authorization: getToken(),
          },
        }
      );
      setNewProduct({
        ...newProduct,
        categoryID: [...newProduct.categoryID, catID],
      });
    } else if (newProduct.categoryID.includes(catID)) {
      await axios.delete(
        `${DELET_CATEGORY_PRODUCT}`,
        {
          data: {
            categoriesID: [catID],
            productID: productid,
          },
        },
        {
          headers: {
            authorization: getToken(),
          },
        }
      );

      setNewProduct({
        ...newProduct,
        categoryID: newProduct.categoryID.filter((e) => e != catID),
      });
    }
  };
  const onChangeImage = (e) => {
    setImage(e.target.value);
  };
  const onAddImage = (image) => {
    if (image.length < 10) {
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

  return (
    <div className="container">
      <div className="col-lg-4 mx-auto text-center">
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="nombre"
              name="name"
              defaultValue={product.name}
              onChange={(e) => onChangeInput(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese Precio"
              name="price"
              min="0"
              onChange={(e) => onChangeInput(e)}
              defaultValue={product.price}
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
              <Form.Label>Imagenes Cargadas</Form.Label>{" "}
              <span>
                <Button
                  onClick={(e) =>
                    handleEdit(
                      setNewProduct({
                        ...newProduct,
                        image: [...product.image, e.target.value],
                      })
                    )
                  }
                >
                  Ver Imagenes
                </Button>
              </span>
              {verImagenes.compr ? (
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
              ) : (
                ""
              )}
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
              onChange={(e) => onChangeInput(e)}
              defaultValue={product.description}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Seleccione las Categorias</Form.Label>

            <div>
              {editCats ? (
                categories?.map((cat) => {
                  return (
                    <span key={cat.id}>
                      <Button
                        variant={
                          newProduct.categoryID?.includes(cat.id)
                            ? "dark"
                            : "secondary"
                        }
                        onClick={() => {
                          categoris(cat.id);
                        }}
                      >
                        {cat.nameCategory}
                      </Button>{" "}
                    </span>
                  );
                })
              ) : (
                <Button
                  onClick={() => {
                    console.log(product);
                    setNewProduct({
                      ...newProduct,
                      categoryID: product.categories.map((e) => e.id),
                    });
                    console.log(newProduct);
                    setEditCats(true);
                  }}
                >
                  Editar Categorias
                </Button>
              )}
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese Stock"
              name="stock"
              min="0"
              onChange={(e) => onChangeInput(e)}
              defaultValue={product.stock}
            />
          </Form.Group>
          <Button variant="dark" type="submit">
            Completar Edicion
          </Button>
        </Form>
      </div>{" "}
    </div>
  );
}
