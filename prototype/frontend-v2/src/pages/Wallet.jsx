import { Moki } from '../components/index'
import { Accordion, Card } from 'react-bootstrap';
import QrCodeReader from '../components/General/QrCodeReader'; 

const Wallet = () => {
  return (
    <div>
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
              Send
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {<Moki func={"transfer"} />}
              {<QrCodeReader />}
            </Card.Body>

          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
              Receive
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              {<Moki func={"receive"} />}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
}

export default Wallet;