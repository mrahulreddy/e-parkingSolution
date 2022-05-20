import React from "react";
import { Accordion, Card } from "react-bootstrap";

const Accordians = (props) => {
  const { data } = props;
  return (
    <div>
      {data.map((dat) => (
        <Accordion>
          <Card>
            <Accordion.Toggle as={Card.Text} variant="link" eventKey="0">
              <Card.Header>{dat.question}</Card.Header>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>{dat.answer}</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      ))}
    </div>
  );
};

export default Accordians;
