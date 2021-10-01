import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions/index";
import { Product } from "../Product/Product";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import CarosuelBoots from "react-bootstrap/Carousel";

export default function Carousel({ img }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsReducer.products);

  const [product, setProduct] = useState(0);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const newItemProducts = img
    ? img
    : products.filter((products) => products.newItem === true);

  function productNext() {
    if (product < newItemProducts.length - 1 || product < img?.length - 1) {
      setProduct(product + 1);
    }
  }
  function productPrev() {
    if (product >= 1) {
      setProduct(product - 1);
    }
  }

  return (
    <div>
      {img ? (
        <div className="container">
          .<button onClick={() => productPrev()}>-</button>
          <button onClick={() => productNext()}>+</button>
          {img?.map((p, i) => {
            if (product === i) {
              return <Card.Img variant="top" src={p} />;
            }
          })}
        </div>
      ) : (
        <div>
          <CarosuelBoots variant="dark" desvanecerse="true">
            {newItemProducts?.map((p, i) => {
              return (
                <CarosuelBoots.Item>
                  <Link to={`/product/${p.id}`}>
                    <img
                      className="d-block w-100"
                      src={p.image[0]}
                      alt="First slide"
                    />
                  </Link>
                  <CarosuelBoots.Caption>
                    <h5>{p.className}</h5>
                    <p>{p.price} $</p>
                  </CarosuelBoots.Caption>
                </CarosuelBoots.Item>
              );
            })}
          </CarosuelBoots>
        </div>
      )}
    </div>
  );
}
