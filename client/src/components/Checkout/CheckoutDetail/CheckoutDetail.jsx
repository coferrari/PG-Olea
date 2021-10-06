import React from "react";
import { Card, ListGroup, Nav, Button } from "react-bootstrap";
import ItemsCart from "../../ItemsCart/ItemsCart";

const Details = ()=>{
    return <div>
    <Card style={{ width: '18rem' }}>
        <Card.Header> 3 - Detalle de tu Compra</Card.Header>
        <ItemsCart/>
    </Card>
</div>

}
export default Details;