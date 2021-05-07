import { Moki } from '../components/index'
import { Accordion, Card } from 'react-bootstrap';
import QrCodeReader from '../components/General/QrCodeReader'; 

const Wallet = () => {
  return (
    <div>
            <br />
      <h6>Wallet</h6>
      <br />
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header style={{padding: "1px"}}>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
              Send
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {<QrCodeReader/>}
              <br />
              {<Moki func={"transfer"} />}
            </Card.Body>

          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header style={{padding: "1px"}}>
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