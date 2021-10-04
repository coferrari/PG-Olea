import React from "react";
import { Card, ListGroup} from "react-bootstrap";

const Data = () => {
    return <div>
        <Card style={{ width: '18rem' }}>
            <Card.Header>Datos Personales</Card.Header>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <input type="text" placeholder = "Nombre" />
                </ListGroup.Item>
                <ListGroup.Item>
                    <input type="text" placeholder = "Apellido" />
                </ListGroup.Item>
                <ListGroup.Item>
                    <input type="text" placeholder = "Mail" />
                </ListGroup.Item>
                <ListGroup.Item>
                    <input type="text" placeholder = "Teléfono" />
                </ListGroup.Item>
            </ListGroup>
        </Card>
    </div>

}
export default Data;