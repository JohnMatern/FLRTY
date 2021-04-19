import { Context } from '../../utils/Store'
import { TxModal, UserAddressField, MokiInputField } from '../index'
import { useEffect, useContext, useState } from 'react';
import { MOKI } from '../../utils/ContractData';


// General:
// props:
//   func={'functionName'}
//   payload={{key: value}}

// Functions:

//   balanceOf:
//     props:
//       func={'balanceOf'}
//       payload={{address: <address>}}
//     returns balance: 12.34

//   transfer:
//     props:
//       func={'transfer'}
//       payload={}
//     returns form: An [    ], Moki [    ], (senden)

const Moki = (props) => {
  const [state, dispatch] = useContext(Context);
  const [returnValue, setReturnValue] = useState(<></>);

  const isDisabled = () => {
    return ((state.inputUserAddress === '' || state.inputMokiValue === ''))
  }

  const transfer = async () => {
    const data = state.moki.methods.transfer(state.inputUserAddress, state.inputMokiValue * 100).encodeABI();
    const args = { from: state.account, to: MOKI, data };
    await dispatch({ type: 'SET_TX', payload: args });
    await dispatch({ type: 'SET_MODAL', payload: true });
  }

  const balanceOf = async (address) => {
    return Math.round(
      await state.moki.methods.balanceOf(address).call() / 100
    ).toFixed(2);
  }

  const renderReturn = async () => {
    if (state.init) {
      switch (props.func) {
        case 'balanceOf':
          if (state.web3.utils.isAddress(props.payload.address)) {
            setReturnValue(await balanceOf(props.payload.address));
          } else {
            setReturnValue('Err: 100');
          }
          break;
        case 'transfer':
          setReturnValue(<>
            <div className="formDiv">
              <p>
                <label className="label">
                  An:
            </label>&nbsp; &nbsp;
                <UserAddressField />
              </p>
              <p>
                <label className="label">
                  Moki:
            </label>  &nbsp; &nbsp;
              <MokiInputField />&nbsp; &nbsp;
                <button className="btn" onClick={transfer} disabled={isDisabled()}>
                  senden
            </button>
              </p>
            </div>
            {state.modal && <TxModal />}
          </>);
          break;

        default:
          setReturnValue(<>Error</>);
      }
    }
  }

  useEffect(async () => {
    renderReturn();
  }, [state.tx, state.init, state.inputUserAddress, state.inputMokiValue])


  return (
    <>{returnValue}</>
  );
}

export default Moki;