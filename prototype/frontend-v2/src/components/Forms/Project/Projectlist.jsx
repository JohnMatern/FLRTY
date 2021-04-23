import { useEffect, useContext, useState } from 'react';
import { Context } from '../../../utils/Store'
import { CircularProgress } from '@material-ui/core';
import { Table } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
const dateOptions = {year: 'numeric', month: 'numeric', day: 'numeric'};
const timeOptions = {hour: '2-digit', minute: '2-digit' }

const Projectlist = () => {
  let history = useHistory();
  const [state, dispatch] = useContext(Context);
  const [projectAddresses, setProjectAddresses] = useState("");
  const [img, setImg] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [content, setContent] = useState("");
  const [data, setData] = useState("");

  const getProjectAddresses = async () => {
    setProjectAddresses(await state.store.methods.getProjectList().call())
  }

  const loadData = async () => {
    let ldata = [];
    for (let i = projectAddresses.length; i > 0; i--) {
      let project = projectAddresses[i-1];
      let projectName = await state.project.methods.getName(project).call();
      let group = await state.project.methods.getGroup(project).call();
      let groupName = await state.group.methods.getName(group).call();
      let votes = await state.vote.methods.balanceOf(project).call();
      let minVotes = await state.project.methods.getMinVotes(project).call();
      let endDate = await state.project.methods.getEndDate(project).call();
      let percentage = votes * 100 / minVotes;
      await ldata.push({
        "project": project,
        "projectName": projectName,
        "votes": votes,
        "minVotes": minVotes,
        "endDate": endDate,
        "percentage": percentage + "%",
        "group": group,
        "groupName": groupName,
      })
    }
    console.log(ldata)
    setData(ldata);
  }
  const projectClick = (address) => {
    console.log(address) //onClick={() => { projectClick(c.project) }}
    history.push('/project/' + address)
  }
  const tableOutput = async () => {
    let tableRows = data.map((c) => (
      <tr key={c.project} onClick={() => { projectClick(c.project) }}>
        <td>
          <div>
            {c.projectName}
          </div>
          <div>
            Ersteller: {c.groupName}
          </div>
        </td>
        <td style={{ width: "150px" }}>
          <div className="progress">
            <div className="progress-bar bg-success" role="progressbar" style={{ width: c.percentage }} aria-valuenow={c.votes} aria-valuemin="0" aria-valuemax="100%"></div>
          </div>
          <div>
            <center>
              {c.votes}/{c.minVotes}
            </center>
          </div>
        </td>
        <td>
          <div>
            <center>
          {new Date(c.endDate * 1000).toLocaleDateString('de-DE', dateOptions)}
          </center>
          </div>
          <div>
            <center>
          {new Date(c.endDate * 1000).toLocaleTimeString('de-DE', timeOptions)}
          </center>
          </div>
        </td>
      </tr>
    ));
    setContent(tableRows);
  }

  useEffect(async () => {
    if (projectAddresses == "") {
      await getProjectAddresses();
    } else {
      if (data.length == "") {
        await loadData();
      } else {
        await tableOutput();
      }
    }
  }, [projectAddresses, data])

  if (!content) {
    return (
      <CircularProgress />
    )
  }
  return (
    <div className='projectList'>
      <br />
      <Table striped hover size="sm">
        <thead>
          <tr>
            <th scope="col">Projekt</th>
            <th scope="col">Stimmen</th>
            <th scope="col"><center>Laufzeit</center></th>
          </tr>
        </thead>
        <tbody>
          {content}
        </tbody>
      </Table>
    </div>
  );
}

export default Projectlist;