import { CircularProgress } from '@material-ui/core';
import { useEffect, useContext, useState } from 'react';
import { Context } from '../../../utils/Store'
import { MANAGER } from '../../../utils/ContractData';
import { TxModal } from '../../index'

const CreateGroup = () => {
  const [state, dispatch] = useContext(Context);
  const [init, setInit] = useState(false);
  const [img, setImg] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [name, setName] = useState("");
  const [des, setDes] = useState("");

  const sendTx = async () => {
    const data = state.manager.methods.createGroup(
      name, 
      des
    ).encodeABI();
    const args = { from: state.account, to: MANAGER, data };
    await dispatch({ type: 'SET_TX', payload: args });
    await dispatch({ type: 'SET_MODAL', payload: true });
    setTimeout(async () => {
      await dispatch({ type: 'SET_MODAL', payload: true });
    },1000)
  }

  const onChangeHandler = (e) => {
    switch (e.target.id) {
      case "groupname":
        setName(e.target.value);
        break;

      case "shortDesc":
        setDes(e.target.value);
        break;

        default:
        break;
    }
    setTimeout(async () => {
      if(e.target.value == "") {
        setBtnDisabled(true);
      }
    })
  }

  const manageButton = () => {
    setTimeout(async () => {
      if(name == "" || des == "") {
        setBtnDisabled(true);
      } else {
        setBtnDisabled(false);
      }
    },1000)
  }

  useEffect(async () => {
    setInit(true);
    manageButton();
  }, [name, des, btnDisabled])

  if (!init) {
    return (
      <CircularProgress />
    )
  } 

  return (
    <div className="formDiv" style={{ width: "100%", marginTop: "20px" }}>
        <div className="form-group">
          <label htmlFor="groupname">Gruppenname:</label>
          <input type="text" className="form-control" id="groupname" placeholder="" onChange={onChangeHandler} />
        </div>
        <div className="form-group">
          <label htmlFor="shortDesc">Gruppenbeschreibung:</label>
          <textarea className="form-control" id="shortDesc" rows="4" onChange={onChangeHandler}></textarea>
        </div>
        <button className="btn" onClick={sendTx} disabled={btnDisabled}>absenden</button>
      {state.modal && <TxModal />}
    </div >
  );
}

export default CreateGroup;