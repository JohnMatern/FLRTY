import { useEffect, useContext, useState } from 'react';
import { Context } from '../../../utils/Store'
import { CircularProgress } from '@material-ui/core';
import { Table } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
const dateOptions = {year: 'numeric', month: 'numeric', day: 'numeric'};
const timeOptions = {hour: '2-digit', minute: '2-digit' }

// unchanged Copy paste from Grouplist

const MyGrouplist = () => {
  let history = useHistory();
  const [state, dispatch] = useContext(Context);
  const [groupAddresses, setGroupAddresses] = useState("");
  const [img, setImg] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [content, setContent] = useState("");
  const [data, setData] = useState("");

  const getGroupAddresses = async () => {
    //setGroupAddresses(await state.store.methods.getGrouplist().call())
  }

  const loadData = async () => {
    let ldata = [];
    for (let i = groupAddresses.length; i > 0; i--) {
      let group = await state.group.methods.getGroup(group).call();
      let groupName = await state.group.methods.getName(group).call();

      await ldata.push({
        "group": group,
        "groupName": groupName,
      })
    }
    console.log(ldata)
    setData(ldata);
  }
  const groupClick = (address) => {
    console.log(address) //onClick={() => { groupClick(c.group) }}
    //history.push('/group/' + address)
  }
  const tableOutput = async () => {
    let tableRows = data.map((c) => (
      <tr key={c.group} onClick={() => { groupClick(c.group) }}>
        <td>
          <div>
            {c.groupName}
          </div>
          <div>
            Ersteller: {c.groupName}
          </div>
        </td>
      </tr>
    ));
    setContent(tableRows);
  }

  useEffect(async () => {
    if (groupAddresses == "") {
      await getGroupAddresses();
    } else {
      if (data.length == "") {
        await loadData();
      } else {
        await tableOutput();
      }
    }
  }, [groupAddresses, data])

  if (!content) {
    return (
      <CircularProgress />
    )
  }
  return (
    <div className='Grouplist'>
      <br />
      <Table striped hover size="sm">
        <thead>
          <tr>
            <th scope="col">Gruppenname</th>
            <th scope="col">Gruppenbeschreibung</th>
          </tr>
        </thead>
        <tbody>
          {content}
        </tbody>
      </Table>
    </div>
  );
}

export default MyGrouplist;