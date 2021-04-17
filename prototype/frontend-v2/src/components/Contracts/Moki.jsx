import { Context } from '../../utils/Store'
import { TxModal } from '../index'
import { useEffect, useContext, useState } from 'react';
import { MOKI } from '../../utils/ContractData'
let regex = /^(?:[0-9]\d+|\d)(?:\.\d{0,2})?$/;

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
  const [errorAddress, setErrorAddress] = useState(' ');
  const [errorAmount, setErrorAmount] = useState(' ');
  const [btnDisabled, setbtnDisabled] = useState(true);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');


  const changeHandler = async (e) => {
    e.preventDefault();
    console.log("onChange")
    switch (e.target.name) {
      
      case 'recipient':
        let newRecipient = e.target.value;
        setRecipient(newRecipient);
        setTimeout( async () => {
          if (newRecipient.includes('0x')) {
            if (!state.web3.utils.isAddress(newRecipient)) {
              setErrorAddress('invalid recipient')
            } else {
              setErrorAddress('')
            }
          } else {
            let nameAddress = await state.userdata.methods.resolveName(newRecipient).call();
            if (nameAddress === "0x0000000000000000000000000000000000000000") {
              setErrorAddress('invalid recipient')
            } else {
              setErrorAddress('');
            }
          }
        }, 1000)
        break;
      
      case 'amount':
        let newValue = e.target.value;
        if (e.target.value.includes(',')) {
          newValue = e.target.value.replace(',', '.');
        }

        if (regex.test(newValue) && newValue > 0.00) {
          setErrorAmount('')
          let balance = await balanceOf(state.account);
          if (newValue > balance) setErrorAmount('insufficient funds.')
        } else {
          setErrorAmount('invalid amount.');
        }
        setAmount(newValue);
        break;
      default:
        setErrorAddress('Err: 101');
        break;
    }

    setTimeout(() => {
      console.log("btn")
      if (errorAddress === '' && errorAmount === '') {
        setbtnDisabled(false);
      } else {
        setbtnDisabled(true);
      }
    }, 1000)

  }

  const transfer = async () => {
    const data = state.moki.methods.transfer(state.account, amount * 100).encodeABI();
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
                <input
                  className="input input-long"
                  type="text"
                  name="recipient"
                  value={recipient}
                  onChange={changeHandler}
                /><div className="error">{errorAddress}</div>
              </p>
              <p>
                <label className="label">
                  Moki:
            </label>  &nbsp; &nbsp;
            <input
                  className="input input-short"
                  type="number"
                  name="amount"
                  value={amount}
                  onChange={changeHandler}
                /> &nbsp; &nbsp;
                <button className="btn" onClick={transfer} disabled={btnDisabled}>
                  senden
            </button>
              </p>
              <p className="error">{errorAmount}</p>
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
  }, [state.tx, state.init, recipient, amount, errorAmount, errorAddress, btnDisabled])


  return (
    <>{returnValue}</>
  );
}

export default Moki;