import { Context } from '../../utils/Store'
import Projectlist from '../Forms/Project/Projectlist';
import SingleProject from '../Forms/Project/SingleProject'
import { useEffect, useContext, useState } from 'react';

const Project = (props) => {
  const [state, dispatch] = useContext(Context);
  const [returnValue, setReturnValue] = useState(<></>);

  const renderReturn = async () => {
    if (state.init) {
      switch (props.func) {
        case 'getProjects':         // argument: string
          setReturnValue(
              <Projectlist />
          );
          break;
        case 'getSingleProject':      // argument: name, returns: address
          setReturnValue(
            <SingleProject />
          );
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

export default Project;
