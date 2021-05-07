import { useEffect, useContext, useState } from 'react';
import { Context } from '../../../utils/Store'
import { CircularProgress } from '@material-ui/core';
import { useParams } from 'react-router-dom'
import { Manager } from '../../index'
import {BiEditAlt} from 'react-icons/bi'
// const ProjectPage = () => {
//   let { address } = useParams();
const SingleProject = (props) => {
  let { address } = useParams();
  const [state, dispatch] = useContext(Context);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("")
  const [group, setGroup] = useState("");
  const [groupMember, setGroupMember] = useState("");
  const [creator, setCreator] = useState("");

  const loadData = async () => {
    let projectName = await state.project.methods.getName(address).call();
    let projectDesc = await state.project.methods.getDesc(address).call();
    let projectGroup = await state.project.methods.getGroup(address).call();
    let groupName = await state.group.methods.getName(projectGroup).call();
    let userList = await state.group.methods.getUserList(projectGroup).call();
    let creator = await state.project.methods.getCreator(address).call();
    let userNames = [];
    for (let i = 0; i < userList.length; i++) {
      if (userList[i] != "0x0000000000000000000000000000000000000000") {
        let username = await state.userdata.methods.getName(userList[i]).call();
        userNames.push(username);
      }
    }
    console.log(userNames)
    setGroupMember(userNames.join());
    setTitle(projectName);
    setDesc(projectDesc);
    setGroup(groupName);
    setCreator(creator)
  }

  useEffect(async () => {
    if (!address) {
      address = props.address;
    }
    if (address) {
      loadData();
    }
  })

  if (title === '' && desc == '') {
    return (
      <CircularProgress />
    )
  }
  return (
    <>
      <div style={{ color: "lightgrey" }}>
        {props.address}
      </div>
      <div className="card">
        <div className="card-header">
          {title} {creator === state.account && <BiEditAlt />}
        </div>
        <div className="card-body">
          <p className="card-text">
            <table style={{width: "100%"}}>
              <tr>
                Erstellt durch: {group} <br />
              </tr>
              <tr>
                Mitglieder: {groupMember}
              </tr>
              <tr>
                &nbsp;
              </tr>
              <tr>
                Beschreibung: {creator === state.account && <BiEditAlt />}
              </tr>
              <tr>
                &nbsp;
              </tr>
              <tr>
                {desc}
              </tr>
            </table>
          </p>
          <Manager func="vote" address={props.address} />
          <br />
          <Manager func="endProject" address={props.address} />
        </div>
      </div>
    </>
  );
}

export default SingleProject;