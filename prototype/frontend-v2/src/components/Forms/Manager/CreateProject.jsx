import { CircularProgress } from '@material-ui/core';
import { useEffect, useContext, useState } from 'react';
import { Context } from '../../../utils/Store'
import { MANAGER } from '../../../utils/ContractData';
import { TxModal } from '../../index'

const AddProject = () => {
  const [state, dispatch] = useContext(Context);
  const [init, setInit] = useState(false);
  const [img, setImg] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [votes, setVotes] = useState("");
  const [group, setGroup] = useState("");
  const [weeks, setWeeks] = useState("");
  const [grouplist, setGrouplist] = useState([]);
  const [groupNames, setGroupNames] = useState([]);

  const sendTx = async () => {
    let grpAddr = await grouplist.filter((g) => {return g.name == group})[0].address;
    
    const data = state.manager.methods.createProject(
      name, 
      des, 
      votes, 
      grpAddr, 
      weeks
    ).encodeABI();
    const args = { from: state.account, to: MANAGER, data };
    await dispatch({ type: 'SET_MODAL', payload: true });
    await dispatch({ type: 'SET_TX', payload: args });
  }

  const onChangeHandler = (e) => {
    switch (e.target.id) {
      case "projectname":
        setName(e.target.value);
        break;

      case "shortDesc":
        setDes(e.target.value);
        break;

      case "weeks":
        setWeeks(e.target.value);
        break;

      case "minVotes":
        setVotes(e.target.value);
        break;

      case "selectGroup":
        setGroup(e.target.value);
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
      if(name == "" || des == "" || votes == "" || group == "" || weeks == "") {
        setBtnDisabled(true);
      } else {
        setBtnDisabled(false);
      }
    },1000)
  }

  const loadGroups = async () => {
    let grps = await state.store.methods.getUserGroups(state.account).call();
    grps = await grps.filter(address => address != "0x0000000000000000000000000000000000000000")

    for(let i = 0; i < grps.length; i++) {
      let gname = await state.group.methods.getName(grps[i]).call();
      await grouplist.push({name: gname, address: grps[i]})
    }
    
    const out = grouplist.map((g) => (
      <option>{g.name}</option>
    ))
    setGroupNames(out);
  }

  useEffect(async () => {
    if(!init) {
      await loadGroups();
      setInit(true);
    }
    manageButton();
  }, [name, des, weeks, votes, group, btnDisabled])

  if (!init) {
    return (
      <CircularProgress />
    )
  } else if (init && grouplist.length < 1) {
    return (
      <p>Du hast bisher keine Gruppe angelegt. Um ein Project anzulesen, lege bitte als erstes eine Gruppe an :)</p>
    )
  }

  // createProject(string memory name, string memory shortDesc, uint256 minVotes, address group, uint256 week)
  // Projektname
  // kurze Beschreibung
  // min Votes
  // Gruppenauswahl + anlegen
  // weeks
  return (
    <div className="formDiv" style={{ width: "100%", marginTop: "20px" }}>
        <div className="form-group">
          <label htmlFor="projectname">Projektname:</label>
          <input type="text" className="form-control" id="projectname" placeholder="" onChange={onChangeHandler} />
        </div>
        <div className="form-group">
          <label htmlFor="shortDesc">Projektbeschreibung:</label>
          <textarea className="form-control" id="shortDesc" rows="4" onChange={onChangeHandler}></textarea>
        </div>

        <div style={{ display: "inline-block" }}>
          <div className="form-group" style={{ display: "inline-block" }}>
            <label htmlFor="weeks">Laufzeit (Wochen):</label>
            <select className="form-control" id="weeks" onChange={onChangeHandler}>
              <option value="" disabled selected>auswählen</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <div className="form-group" style={{ display: "inline-block" }}>
            <label htmlFor="minVotes">min. Votes:</label>
            <input type="number" className="form-control" id="minVotes" placeholder="min. Votes" onChange={onChangeHandler} style={{ width: "120px" }} min="0" />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="selectGroup">Gruppe auswählen:</label>
          <select className="form-control" id="selectGroup" onChange={onChangeHandler}>
          <option value="" disabled selected>auswählen</option>
            {groupNames}
          </select>
        </div>
        <button className="btn" onClick={sendTx} disabled={btnDisabled}>absenden</button>
      {state.modal && <TxModal />}
    </div >
  );
}

export default AddProject;