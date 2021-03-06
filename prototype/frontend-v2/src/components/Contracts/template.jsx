import { Context } from '../../utils/Store'
import NameInput from '../Forms/Userdata/NameInput';
import { useEffect, useContext, useState } from 'react';

const template = (props) => {
  const [state, dispatch] = useContext(Context);
  const [returnValue, setReturnValue] = useState(<></>);

  const renderReturn = async () => {
    if (state.init) {
      switch (props.func) {
        case 'setName':         // argument: string
          setReturnValue(
            <div className="formDiv">
              <NameInput />
            </div>
          );
          break;
        case 'getAddress':      // argument: name, returns: address
          setReturnValue(
            state.userdata.methods.getName(props.payload.name).call()
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

export default template;
