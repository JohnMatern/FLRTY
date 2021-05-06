import { Context } from '../../utils/Store'
import { Grouplist, SingleGroup, MyGrouplist } from '../Forms/Group/index'
import { useEffect, useContext, useState } from 'react';

const Group = (props) => {
  const [state, dispatch] = useContext(Context);
  const [returnValue, setReturnValue] = useState(<></>);

  const renderReturn = async () => {
    if (state.init) {
      switch (props.func) {
        case 'getGroups':         // argument: string
          setReturnValue(
            <Grouplist />
          );
          break;
        case 'getSingleGroup':      // argument: name, returns: address
          setReturnValue(
            <SingleGroup />
          );
          break;

        case 'getMyGroups':      // argument: name, returns: address
          setReturnValue(
            <MyGrouplist />
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

export default Group;
