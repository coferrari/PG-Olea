import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../../redux/actions/index";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import Carousel from "../../components/Carousel/Carousel";

export function ProductDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector(
    (state) => state.productDetailReducer.productDetail
  );
  const imgs = useSelector(
    (state) => state.productDetailReducer.productDetail.image
  );

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, id]);

  return (
    <div className="container">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Img variant="top" src={imgs?.[0]} />
          <Card.Title>{product?.name}</Card.Title>
          <Card.Text>{product?.description}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>Precio: {product?.price} $ </ListGroupItem>
          <ListGroupItem>Reviews: {product?.rating} </ListGroupItem>
        </ListGroup>
      </Card>
    </div>
  );
}
