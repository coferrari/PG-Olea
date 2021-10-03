import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../../redux/actions/index";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import Carousel from "../../components/Carousel/Carousel";
import {
  addProductsToChart,
  removeProductsFromChart,
} from "../../redux/actions/index";

export function ProductDetail() {
  const dispatch = useDispatch();
  const { idParams } = useParams();

  const product = useSelector(
    (state) => state.productDetailReducer.productDetail
  );

  const { id, image, name, price } = useSelector(
    (state) => state.productDetailReducer.productDetail
  );

  const productsCart = useSelector(
    (state) => state.carritoReducer.productsCarrito
  );

  const isInStore = productsCart?.filter((product) => product.id == id);

  const quantity = 1;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(productsCart));
  }, [productsCart]);

  const handleAddToChart = (e) => {
    e.preventDefault();
    dispatch(addProductsToChart({ id, image, name, price, quantity }));
  };

  const handleRemoveFromChart = (e) => {
    e.preventDefault();
    dispatch(removeProductsFromChart(parseInt(id)));
  };

  useEffect(() => {
    dispatch(getProductDetail(idParams));
  }, [dispatch, idParams]);

  return (
    <div className="container">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Carousel img={product.image} />
          <Card.Title>{product?.name}</Card.Title>
          <Card.Text>{product?.description}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>Precio: ${product?.price} </ListGroupItem>
          <ListGroupItem>Reviews: {product?.rating} </ListGroupItem>
        </ListGroup>
        {!isInStore.length ? (
        <Button
          variant="dark"
          type="submit"
          onClick={(e) => handleAddToChart(e)}
        >
          Agregar al carrito
        </Button>
        ):(
        <Button
          variant="secondary"
          type="submit"
          onClick={(e) => handleRemoveFromChart(e)}
        >
          Eliminar del carrito
        </Button>
        )}
      </Card>
    </div>
  );
}
