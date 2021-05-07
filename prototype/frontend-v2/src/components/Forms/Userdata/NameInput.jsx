import { RiCheckboxCircleFill } from 'react-icons/ri';
import { HiXCircle } from 'react-icons/hi';
import { VscLoading } from 'react-icons/vsc';
import { useEffect, useContext, useState } from 'react';
import { Context } from '../../../utils/Store'
import { USERDATA } from '../../../utils/ContractData';
import { TxModal } from '../../index'

const NameInput = () => {
  const [state, dispatch] = useContext(Context);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [lock, setLock] = useState(true);

  const changeHandler = async (e) => {
    e.preventDefault();
    let newValue = e.target.value;
    setName(newValue);
    setImg(<VscLoading />)
    setTimeout(async () => {
      let nameAddress = await state.userdata.methods.getAddress(newValue.toLowerCase()).call();
      let addressName = await state.userdata.methods.getName(state.account).call();
      if(nameAddress != "0x0000000000000000000000000000000000000000") {
        setImg(<HiXCircle />) // username vergeben
        setBtnDisabled(true);
      } else if(addressName != "") {
        setImg(<HiXCircle />) // addresse hat bereits einen usernamen
        setBtnDisabled(true);
      } else {
        setImg(<RiCheckboxCircleFill />);
        setBtnDisabled(false);
      }
    },1000)
  }

  const setNameTx = async () => {
    setLock(false)
    const data = state.userdata.methods.setName(name.toLowerCase()).encodeABI();
    const args = { from: state.account, to: USERDATA, data };
    await dispatch({ type: 'SET_TX', payload: args });
    await dispatch({ type: 'SET_MODAL', payload: true });
  }

  useEffect(async () => {
    setLock(true)
  }, [name, img, btnDisabled])


  return (
    <div>
    <label className="label">Name: &nbsp;</label>
    <input
      className="input input-long"
      type="text"
      name="name"
      value={name}
      onChange={changeHandler}
      onFocus={() => setImg(<VscLoading />)}
      onBlur={() => { if (name === '') setImg(''); }}
    /> <div className={"formStatusIcon"}>{img}</div>
    <button className="btn" onClick={setNameTx} disabled={btnDisabled}>
      senden
  </button>
  {!lock && state.modal && <TxModal />}
  </div>
  );
}

export default NameInput;