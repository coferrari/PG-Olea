import React, { useState } from "react";
import { Card, Nav, Button } from "react-bootstrap";


const Delivery = () => {

    const [delivery, setDelivery] = useState(true)

    const handleSelected = (selectedKey) => {
        if (selectedKey === "Envío") {
            setDelivery(true)
        } else {
            setDelivery(false)
        }
    }


    return <div>
        <Card>
            <Card.Header>
                <Nav variant="pills" defaultActiveKey="#envio" onSelect={(e) => handleSelected(e)}>
                    <Nav.Item>
                        <Nav.Link href="#envio" eventKey="Envío" >Envío</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#retiro" eventKey="Retiro">Retiro</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Card.Header>
            <Card.Body eventKey={delivery}>
                {delivery === true ? (
                    <div>
                        <Card.Title>Envío</Card.Title>
                        <Card.Text>Envio card component</Card.Text>
                    </div>
                ) : (
                    <div>
                        <Card.Title>Retiro</Card.Title>
                        <Card.Text>Retiro card component</Card.Text>
                    </div>
                )}
                {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
        </Card>
    </div>

}
export default Delivery;