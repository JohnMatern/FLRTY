import { Project, Manager } from '../components/index.js';
import { useEffect, useContext, useState } from 'react';
import { Context } from '../utils/Store'
import { Accordion, Card } from 'react-bootstrap';

const MyProjects = () => {
  const [state, dispatch] = useContext(Context);
  return (
    <div className="page">
      <br />
      <h6>Projekte verwalten</h6>
      <br />
      <div>
        <Accordion defaultActiveKey="1">
          <Card>
            <Card.Header style={{ padding: "1px" }}>
              <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                + Neues Projekt anlegen
            </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Manager func={'createProject'} />
              </Card.Body>

            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header style={{ padding: "1px" }}>
              <Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
                Meine Projekte
            </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body style={{ padding: "3px" }}>
              <Project func={'getProjects'} filter={state.address} />
              </Card.Body>

            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
      {/*<Group func={'getGroups'} /> */}
    </div>
  );
}

export default MyProjects;