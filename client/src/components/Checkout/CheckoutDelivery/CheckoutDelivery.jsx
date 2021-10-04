import React from "react";
import { Card, Nav } from "react-bootstrap";


const Delivery = () => {
    return <div>
        <Card>
            <Card.Header>
                <Nav variant="pills" defaultActiveKey="#envio">
                    <Nav.Item>
                        <Nav.Link href="#envio" key="301" >Envío</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#link" key="302">Retiro</Nav.Link>
                    </Nav.Item>
                    {/* <Nav.Item>
        <Nav.Link href="#disabled" disabled>
          Disabled
        </Nav.Link>
      </Nav.Item> */}
                </Nav>
            </Card.Header>
            <div>
                
            </div>

            <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                </Card.Text>
                {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
        </Card>
    </div>

}
export default Delivery;