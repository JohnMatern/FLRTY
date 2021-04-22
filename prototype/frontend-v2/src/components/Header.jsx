import { Redirect } from 'react-router-dom';
import { Context } from '../utils/Store';
import { useEffect, useContext, useState } from 'react';
import Person from '../media/person.png';
import { Moki, Vote } from './index';
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';
import logo from '../media/flarity.svg';

const Header = () => {
  const [state, dispatch] = useContext(Context);
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');

  useEffect(async () => {
    if (state === 'undefined' || state.init === false) {
      return (<div>empty</div>)
    } else {
      setAddress(state.account);
      setUsername(state.username);
    }
  }, [state])

  return (
    <div className="text-secondary" style={{fontSize: "13px"}}>
      <Row>
        <Row>
          <Col className="inline-block col">
            <img src={logo} style={{ width: "200px" }} />
          </Col>
          <Col className="inline-block">
            <Row>
              <Col style={{width: "100px"}}><strong>Name</strong></Col>
              <Col className="align-left"><strong>{username}</strong></Col>
            </Row>
            <Row>
              <Col><strong>Moki</strong></Col>
              <Col>
              <strong><Moki 
                  func={'balanceOf'} 
                  payload={{ address: state.account }}
                /></strong>
              </Col>
            </Row>
            <Row>
              <Col><strong>Vote</strong></Col>
              <Col>
              <strong><Vote 
                  func={'balanceOf'}
                  payload={{ address: state.account }}
                /></strong>
              </Col>
            </Row>
          </Col>
        </Row>
        <center>
        <strong style={{color: "lightgrey"}}>Adresse: &nbsp; {address}</strong>
        </center>
        {/*<div className="photo">
              <img src={Person} />
            </div>*/}
      </Row>
    </div>
  );
}

export default Header;