import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCategories } from "../../../../redux/actions";
import { Button, Table } from "react-bootstrap";
export default function CategoriasTable() {
  const dispatch = useDispatch();
  const history = useHistory();
  const categories = useSelector((state) => state.categoryReducer.categories);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Categoria</th>
            <th>Cantidad de productos</th>
            <th>Eliminar categoria</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((categories) => {
            return (
              <tr>
                <td>{categories.nameCategory}</td>
                <td></td>
                <td>Eliminar esta categoria</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
