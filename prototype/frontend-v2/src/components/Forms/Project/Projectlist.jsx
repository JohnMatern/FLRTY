import { useEffect, useContext, useState } from 'react';
import { Context } from '../../../utils/Store'
import { CircularProgress } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { Accordion, Card } from 'react-bootstrap';
import { Project } from '../../index'
const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
const timeOptions = { hour: '2-digit', minute: '2-digit' }

const Projectlist = (props) => {
  let history = useHistory();
  const [state, dispatch] = useContext(Context);
  const [projectAddresses, setProjectAddresses] = useState("");
  const [img, setImg] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [content, setContent] = useState("");
  const [data, setData] = useState("");
  const [loadProject, setLoadProject] = useState("");
  const [toggleRefresh, setToggleRefresh] = useState(state.modal);

  const getProjectAddresses = async () => {
    setProjectAddresses(await state.store.methods.getProjectList().call())
  }

  const loadData = async () => {
    let ldata = [];
    for (let i = projectAddresses.length; i > 0; i--) {
      let project = projectAddresses[i - 1];
      if (project !== "0x0000000000000000000000000000000000000000") {
        let projectName = await state.project.methods.getName(project).call();
        let group = await state.project.methods.getGroup(project).call();
        let groupName = await state.group.methods.getName(group).call();
        let votes = await state.vote.methods.balanceOf(project).call();
        let minVotes = await state.project.methods.getMinVotes(project).call();
        let endDate = await state.project.methods.getEndDate(project).call();
        let percentage = votes * 100 / minVotes;

        if (!props.filter || props.filter === state.account) {
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
      }
    }
    setData(ldata);
  }
  const projectClick = (address) => {
    loadProject === address ? setLoadProject("") : setLoadProject(address)
  }
  const tableOutput = async () => {
    let tableRows = data.map((c) => (
      <tr key={c.project}>
        <Card>
          <Card.Header style={{ padding: "1px", backgroundColor: "white" }}>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey={c.project}>
              <td style={{ textAlign: "left", width: "150px" }} onClick={() => { projectClick(c.project) }}>
                <div>
                  {c.projectName}
                </div>
                <div>
                  Ersteller: {c.groupName}
                </div>
              </td>
              <td style={{ width: "150px" }} onClick={() => { projectClick(c.project) }}>
                <div className="progress">
                  <div className="progress-bar bg-success" role="progressbar" style={{ width: c.percentage }} aria-valuenow={c.votes} aria-valuemin="0" aria-valuemax="100%"></div>
                </div>
                <div>
                  <center>
                    {c.votes}/{c.minVotes}
                  </center>
                </div>
              </td>
              <td style={{ textAlign: "right", width: "60px" }} onClick={() => { projectClick(c.project) }}>
                <div>
                  {new Date(c.endDate * 1000).toLocaleDateString('de-DE', dateOptions)}
                </div>
                <div>
                  {new Date(c.endDate * 1000).toLocaleTimeString('de-DE', timeOptions)}
                </div>
              </td>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={c.project}>
            <Card.Body style={{ padding: "5px" }}>
              {(loadProject === c.project) && <Project func={"getSingleProject"} address={c.project} />}
            </Card.Body>

          </Accordion.Collapse>
        </Card>
      </tr >
    ));
    setContent(tableRows);
  }

  const init = async () => {
    console.log("init")
    if (state.modal != toggleRefresh) {
      setToggleRefresh(state.modal);
      await getProjectAddresses();
      await loadData();
    }
    if (projectAddresses == "") {
      await getProjectAddresses();
    } else {
      if (data.length == "") {
        await loadData();
      } else {
        await tableOutput();
      }
    }
  }

  useEffect(async () => {
    await init();
  }, [loadProject, state.modal, data, projectAddresses])

  if (!content) {
    return (
      <CircularProgress />
    )
  }
  return (
    <div className='projectList'>
      <br />
      <Accordion>
        {content}
      </Accordion>
    </div>
  );
}

export default Projectlist;