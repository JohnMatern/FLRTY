import { Redirect } from 'react-router-dom';
import { UserData } from '../utils/ContractFunctions'
import { Context } from '../utils/Store'
import { useEffect, useContext, useState } from 'react';
import Person from '../media/person.png'
import { Moki } from './Contracts/index'

const Header = () => {
  const [state, dispatch] = useContext(Context);
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [mokiAmount, setMokiAmount] = useState('');
  const [voteAmount, setVoteAmount] = useState('');

  useEffect(async () => {
    if (state === 'undefined' || state.init === false) {
      return (<div>empty</div>)
    } else {
      setAddress(state.account);
      setUsername(state.username);
      setMokiAmount(state.mokiAmount);
      setVoteAmount(state.voteAmount);
    }
  }, [state])

  return (
    <div className="header">
      <div className="logo"></div>

      <div className="dataWrapper">
        <div className="adresse">Adresse: &nbsp; {address}</div>
        <div className="tokenWrapper">
          <div className="name">Name: &nbsp; {username}</div>
          <div className="moki">Moki: &nbsp; {mokiAmount}
          </div>
          <div className="vote">Vote: {voteAmount}</div>
        </div>
      </div>

      {/*<div className="photo">
        <img src={Person} />
  </div>*/}


    </div>
  );
}

export default Header;