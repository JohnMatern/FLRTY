import { Context } from '../../utils/Store'
import { useEffect, useContext, useState } from 'react';

const Moki = (props) => {
  const [state, dispatch] = useContext(Context);
  const [returnValue, setReturnValue] = useState(<></>);

  const renderReturn = async () => {
    if (state.init) {
      switch (props.func) {

        case 'balanceOf':
          if (state.web3.utils.isAddress(props.payload.address)) {
            setReturnValue(
              Math.round(
                await state.moki.methods.balanceOf(props.payload.address).call() / 100
              ).toFixed(2));
          }
          break;

        case 'transfer':
          setReturnValue(<>
            <div className="form">
              <p>
                <label className="label">
                  An: 
            </label>&nbsp; &nbsp;
                <input className="input input-long">

                </input>
              </p><p>
                <label className="label">
                  Moki:
            </label>  &nbsp; &nbsp;
                <input className="input input-short">

                </input>  &nbsp; &nbsp;
                <button className="btn">
                  senden
            </button>
              </p>
            </div>
          </>);
          break;

        default:
          setReturnValue(<>Error</>);
      }
    }
  }

  useEffect(async () => {
    renderReturn();
  }, [state])


  return (
    <>{returnValue}</>
  );
}

export default Moki;