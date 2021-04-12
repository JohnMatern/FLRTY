import { Context } from '../../utils/Store'
import { useEffect, useContext, useState } from 'react';

const UserData = (props) => {
  const [state, dispatch] = useContext(Context);
  const [returnValue, setReturnValue] = useState(<></>);

  useEffect(async () => {
    if (state.init) {
      switch (props.func) {

        // case 'balanceOf':
        //     if (state.web3.utils.isAddress(props.payload.address)) {
        //         setReturnValue(
        //             Math.round(
        //                 await state.moki.methods.balanceOf(props.payload.address).call() / 100
        //             ).toFixed(2));
        //     }
        //     break;

        // case 'transfer':
        //     setReturnValue(<>transfer</>);
        //     break;

        // default:
        //     setReturnValue(<>Error</>);

        case 'addPhoto':        // argument: string
          return await state.userdata.methods.addPhoto(payload).send({ from: state.account })
        case 'removePhoto':
          return;
        case 'getPhoto':
          return;
        case 'addFriend':
          return;
        case 'removeFriend':
          return;
        case 'getFriends':
          return;
        case 'setName':         // argument: string
          return await state.userdata.methods.setName(payload).send({ from: state.account }).on('transactionHash', (hash) => {
            console.log("tx Hash: " + hash)
          })
          break;
        case 'getName':
          return;
        case 'getAddress':      // argument: name, returns: address
          return await state.userdata.methods.getAddress(payload.toLowerCase()).call();
        default:
          return;
      }
    }
  }, [state])


  return (
    <>{returnValue}</>
  );
}

export default UserData;



// export const UserData = async (state, func, payload) => {
//     //const state = useContext(Context)
// //     if (state !== null) {
//         switch (func) {
//             case 'addPhoto':        // argument: string
//                 return await state.userdata.methods.addPhoto(payload).send({ from: state.account })
//             case 'removePhoto':
//                 return;
//             case 'getPhoto':
//                 return;
//             case 'addFriend':
//                 return;
//             case 'removeFriend':
//                 return;
//             case 'getFriends':
//                 return;
//             case 'setName':         // argument: string
//                 return await state.userdata.methods.setName(payload).send({ from: state.account }).on('transactionHash', (hash) => {
//                     console.log("tx Hash: " + hash)
//                 })
//             case 'getName':
//                 return;
//             case 'getAddress':      // argument: name, returns: address
//                 return await state.userdata.methods.getAddress(payload.toLowerCase()).call();
//             default:
//                 return;
//         }
//     }
// }