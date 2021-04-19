import { Context } from '../../utils/Store'
import NameInput from '../Forms/Userdata/NameInput';
import { useEffect, useContext, useState } from 'react';

const UserData = (props) => {
  const [state, dispatch] = useContext(Context);
  const [returnValue, setReturnValue] = useState(<></>);

  const isDisabled = () => {
    return ((state.inputUserAddress === '' || state.inputMokiValue === ''))
  }

  const renderReturn = async () => {
    if (state.init) {
      switch (props.func) {
        case 'addPhoto':        // argument: string
          setReturnValue(

          );
          break;
        case 'removePhoto':
          setReturnValue(

          );
          break;
        case 'getPhoto': //gibt bisher nur den string des fotos zurück
          setReturnValue(
            await state.userdata.methods.getPhoto(props.payload.address).call()
          );
          break;
        case 'addFriend':
          setReturnValue(

          );
          break;
        case 'removeFriend':
          setReturnValue(

          );
          break;
        case 'getFriends':
          setReturnValue(
            await state.userdata.methods.getFriends(props.payload.address).call()
          );
          break;
        case 'setName':         // argument: string
          setReturnValue(
            <div className="formDiv">
              <NameInput />
            </div>
          );
          break;
        case 'getName':
          setReturnValue(
            state.userdata.methods.getName(props.payload.address).call()
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

export default UserData;





// import { Context } from '../../utils/Store'
// import { useEffect, useContext, useState } from 'react';

// const UserData = (props) => {
//   const [state, dispatch] = useContext(Context);
//   const [returnValue, setReturnValue] = useState(<></>);

//   useEffect(async () => {
//     if (state.init) {
//       switch (props.func) {

//         // case 'balanceOf':
//         //     if (state.web3.utils.isAddress(props.payload.address)) {
//         //         setReturnValue(
//         //             Math.round(
//         //                 await state.moki.methods.balanceOf(props.payload.address).call() / 100
//         //             ).toFixed(2));
//         //     }
//         //     break;

//         // case 'transfer':
//         //     setReturnValue(<>transfer</>);
//         //     break;

//         // default:
//         //     setReturnValue(<>Error</>);

//         case 'addPhoto':        // argument: string
//           return await state.userdata.methods.addPhoto(payload).send({ from: state.account })
//         case 'removePhoto':
//           return;
//         case 'getPhoto':
//           return;
//         case 'addFriend':
//           return;
//         case 'removeFriend':
//           return;
//         case 'getFriends':
//           return;
//         case 'setName':         // argument: string
//           return await state.userdata.methods.setName(payload).send({ from: state.account }).on('transactionHash', (hash) => {
//             console.log("tx Hash: " + hash)
//           })
//           break;
//         case 'getName':
//           return;
//         case 'getAddress':      // argument: name, returns: address
//           return await state.userdata.methods.getAddress(payload.toLowerCase()).call();
//         default:
//           return;
//       }
//     }
//   }, [state])


//   return (
//     <>{returnValue}</>
//   );
// }

// export default UserData;



// // export const UserData = async (state, func, payload) => {
// //     //const state = useContext(Context)
// // //     if (state !== null) {
// //         switch (func) {
// //             case 'addPhoto':        // argument: string
// //                 return await state.userdata.methods.addPhoto(payload).send({ from: state.account })
// //             case 'removePhoto':
// //                 return;
// //             case 'getPhoto':
// //                 return;
// //             case 'addFriend':
// //                 return;
// //             case 'removeFriend':
// //                 return;
// //             case 'getFriends':
// //                 return;
// //             case 'setName':         // argument: string
// //                 return await state.userdata.methods.setName(payload).send({ from: state.account }).on('transactionHash', (hash) => {
// //                     console.log("tx Hash: " + hash)
// //                 })
// //             case 'getName':
// //                 return;
// //             case 'getAddress':      // argument: name, returns: address
// //                 return await state.userdata.methods.getAddress(payload.toLowerCase()).call();
// //             default:
// //                 return;
// //         }
// //     }
// // }