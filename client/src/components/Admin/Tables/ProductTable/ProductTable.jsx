import React, { useEffect, useState } from "react";
import { useHistory, Redirect, Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getToken, decodeToken } from "../../../../utils/index";
import { getProducts } from "../../../../redux/actions";
export default function ProductTable() {
  const dispatch = useDispatch();
  let products = useSelector((state) => state.productsReducer.products);
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  console.log(products);
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Descripción</th>
            <th>Edit</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((e) => {
            return (
              <tr>
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td>{e.price}</td>
                <td>{e.stock}</td>
                <td>{e.description}</td>
                <td>Update</td>
                <td>Remove</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
