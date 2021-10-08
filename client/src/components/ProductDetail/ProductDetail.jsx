import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getProductDetail } from "../../redux/actions/index";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import Carousel from "../../components/Carousel/Carousel";
import { updateCart } from "../../redux/actions/index";
import { isAuthorized, decodeToken } from "../../utils/index";
import { addOrEditCart, removeProductCart } from "../../cart/index";

export function ProductDetail() {
  const dispatch = useDispatch();
  const { idParams } = useParams();
  const [add, setAdd] = useState(false);
  const [remove, setRemove] = useState(false);
  const validate = isAuthorized();
  const product = useSelector(
    (state) => state.productDetailReducer.productDetail
  );

  const { id, image, name, price } = useSelector(
    (state) => state.productDetailReducer.productDetail
  );

  const { productsCarrito } = useSelector((state) => state.carritoReducer);

  const quantity = 1;

  useEffect(() => {
    if (add) {
      const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart"));
      const cartAdded = [
        ...cartFromLocalStorage,
        { id, name, image, price, quantity },
      ];
      localStorage.setItem("cart", JSON.stringify(cartAdded));
      dispatch(updateCart(cartAdded));
      setAdd(false);
    }
    if (remove) {
      const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart"));
      const cartRemoved = cartFromLocalStorage.filter(
        (product) => product.id !== id
      );
      localStorage.setItem("cart", JSON.stringify(cartRemoved));
      dispatch(updateCart(cartRemoved));
      setRemove(false);
    }
  }, [dispatch, add, remove, id, image, name, price]);

  const isInStore = productsCarrito.filter((product) => product.id === id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    setAdd(true);
    if (validate) {
      const user = decodeToken();
      const username = user.username;
      addOrEditCart({
        productID: id,
        quantity: quantity,
        username: username,
      });
    }
  };

  const handleRemoveFromCart = (e) => {
    e.preventDefault();
    setRemove(true);
    if (validate) {
      const user = decodeToken();
      const username = user.username;
      removeProductCart({
        productID: id,
        username: username,
      });
    }
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
        {isInStore.length === 0 && (
          <Button
            variant="dark"
            type="submit"
            onClick={(e) => handleAddToCart(e)}
          >
            Agregar al carrito
          </Button>
        )}
        {isInStore.length > 0 && (
          <Button
            variant="secondary"
            type="submit"
            onClick={(e) => handleRemoveFromCart(e)}
          >
            Eliminar del carrito
          </Button>
        )}
      </Card>
    </div>
  );
}
