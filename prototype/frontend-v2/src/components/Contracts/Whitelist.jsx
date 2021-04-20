import { Context } from '../../utils/Store'
import AddUserByCode from '../Forms/Whitelist/AddUserByCode';
import { useEffect, useContext, useState } from 'react';

const Whitelist = (props) => {
  const [state, dispatch] = useContext(Context);
  const [returnValue, setReturnValue] = useState(<></>);

  const renderReturn = async () => {
    if (state.init) {
      switch (props.func) {
        case 'addAdmin':
          setReturnValue(

          );
          break;
        case 'removeAdmin':
          setReturnValue(

          );
          break;
        case 'removeAccessHub':
          setReturnValue(
            
          );
          break;
        case 'addUser':
          setReturnValue(

          );
          break;
        case 'removeUser':
          setReturnValue(

          );
          break;
        case 'addInviteCode':
          setReturnValue(
            
          );
          break;
        case 'removeInviteCode':         // argument: string
          setReturnValue(
            <div className="formDiv">
              
            </div>
          );
          break;
        case 'addMultipleInviteCodes':
          setReturnValue(
           
          );
          break;
        case 'addUserByCode':      // argument: name, returns: address
          setReturnValue(
            <AddUserByCode />
          );
          break;
        case 'initAddresses':      // argument: name, returns: address
          setReturnValue(
            
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

export default Whitelist;
