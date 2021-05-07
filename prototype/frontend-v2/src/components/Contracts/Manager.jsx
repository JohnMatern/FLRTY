import { Context } from '../../utils/Store'
import { CreateProject, EditProject } from '../Forms/Project/index'
import { CreateGroup } from '../Forms/Group/index'; 
import Vote from '../Forms/Manager/Vote'
import EndProject from '../Forms/Manager/EndProject'
import { useEffect, useContext, useState } from 'react';

const Manager = (props) => {
  const [state, dispatch] = useContext(Context);
  const [returnValue, setReturnValue] = useState(<></>);

  const renderReturn = async () => {
    if (state.init) {
      switch (props.func) {
        case 'createProject':
          setReturnValue(
            <CreateProject />
          )
          break;

          case 'editProject': 
          setReturnValue(
            <EditProject /> 
          )
          break; 
          case 'createGroup':
            setReturnValue(
              <CreateGroup />
            )
            break;
          case 'vote':
            setReturnValue(
              <Vote address={props.address}/>
            )
            break;
          case "endProject":
            setReturnValue(
              <EndProject address={props.address}/>
            )
            break;
        default:
          setReturnValue(<>Error</>);
      }
    }
  }

  useEffect(async () => {
    renderReturn();
  }, [state.tx, state.init])


  return (
    <>{returnValue}</>
  );
}

export default Manager;
