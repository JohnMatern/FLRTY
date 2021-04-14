import { Redirect } from 'react-router-dom';
import { Context } from '../utils/Store'
import { useEffect, useContext, useState } from 'react';
import Person from '../media/person.png'
import { Moki, Vote } from './index'

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
    <div className="header">
      <div className="logo"></div>

      <div className="dataWrapper">
        <div className="adresse">Adresse: &nbsp; {address}</div>
        <div className="tokenWrapper">
          <div className="name">Name: &nbsp; {username}</div>
          <div className="moki">Moki: &nbsp;
            <Moki func={'balanceOf'}
              payload={{ address: state.account }}
            />
          </div>
          <div className="vote">Vote: 
            <Vote func={'balanceOf'} 
              payload={{ address: state.account }} 
            />
          </div>
        </div>
      </div>

      {/*<div className="photo">
        <img src={Person} />
  </div>*/}


    </div>
  );
}

export default Header;