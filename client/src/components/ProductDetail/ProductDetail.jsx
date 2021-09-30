import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../../redux/actions/index";
import styles from "./ProductDetail.module.css";

export function ProductDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector(
    (state) => state.productDetailReducer.productDetail
  );

  const [numOfImg, setNumOfImg] = useState(0);

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, id]);
  console.log(product);
  function imgNext() {
    if (product.image[numOfImg + 1]) {
      setNumOfImg(numOfImg + 1);
    }
  }
  function imgPrev() {
    if (product.image[numOfImg - 1]) {
      setNumOfImg(numOfImg - 1);
    }
  }
  console.log(numOfImg);
  return (
    <div className={styles.container}>
      <button onClick={() => imgPrev()}>-</button>
      <img src={product.image?.[numOfImg]} alt="imagenproducto" />
      <button onClick={() => imgNext()}>+</button>
      <h1>{product?.name}</h1>
      <span>{product?.price}</span> <br />
      <span>{product?.description}</span> <br />
      <span>{product?.rating}</span> <br />
    </div>
  );
}
