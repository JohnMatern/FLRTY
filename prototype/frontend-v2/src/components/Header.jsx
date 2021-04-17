import { Redirect } from 'react-router-dom';
import { Context } from '../utils/Store';
import { useEffect, useContext, useState } from 'react';
import Person from '../media/person.png';
import { Moki, Vote } from './index';
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';
import { ReactComponent as Logo } from '../media/flarity.svg';

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
    <div>
      <Row>
        <Jumbotron>
          <Col>
            <Logo />
          </Col>
          <Col>
            Adresse: &nbsp; {address}
          </Col>
          <Col>
            Name: &nbsp; {username}
          </Col>
          <Col>
            Moki: &nbsp;
          <Moki func={'balanceOf'}
              payload={{ address: state.account }}
            />
          </Col>
          <Col>
            Vote:
          <Vote func={'balanceOf'}
              payload={{ address: state.account }}
            />
          </Col>
          {/*<div className="photo">
              <img src={Person} />
            </div>*/}
        </Jumbotron>
      </Row>
    </div>
  );
}

export default Header;