import { RiCheckboxCircleFill } from 'react-icons/ri';
import { HiXCircle } from 'react-icons/hi';
import { VscLoading } from 'react-icons/vsc';
import { useEffect, useContext, useState } from 'react';
import { Context } from '../../../utils/Store'
import { TxModal } from '../../index'

const template = () => {
  const [state, dispatch] = useContext(Context);
  const [code, setCode] = useState("");
  const [img, setImg] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);

  const changeHandler = async (e) => {
    e.preventDefault();
    let newValue = e.target.value;
    setCode(newValue);
    setImg(<VscLoading />)
    setTimeout(async () => {
      let isCode = await state.whitelist.methods.isInviteCode(newValue).call();
      if(!isCode) {
        setImg(<HiXCircle />) // code invalid
        setBtnDisabled(true);
      } else {
        setImg(<RiCheckboxCircleFill />);
        setBtnDisabled(false);
      }
    },1000)
  }

  const send = async () => {
    const data = state.whitelist.methods.addUserByCode(code).encodeABI();
    const args = { from: state.account, to: WHITELIST, data };
    await dispatch({ type: 'SET_TX', payload: args });
    await dispatch({ type: 'SET_MODAL', payload: true });
  }

  useEffect(async () => {
    
  }, [code, img, btnDisabled])


  return (
    <div className="formDiv">
    <label className="label">Invite Code: &nbsp;</label>
    <input
      className="input input-long"
      type="text"
      name="code"
      value={code}
      onChange={changeHandler}
      onFocus={() => setImg(<VscLoading />)}
      onBlur={() => { if (code === '') setImg(''); }}
    /> <div className={"formStatusIcon"}>{img}</div>
    <button className="btn" onClick={send} disabled={btnDisabled}>
      senden
  </button>
  {state.modal && <TxModal />}
  </div>
  );
}

export default template;