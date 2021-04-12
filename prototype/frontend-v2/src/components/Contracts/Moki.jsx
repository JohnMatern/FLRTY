import { Context } from '../../utils/Store'
import { useEffect, useContext, useState } from 'react';

const Moki = (props) => {
    const [state, dispatch] = useContext(Context);
    const [returnValue, setReturnValue] = useState(<></>);

    useEffect(async () => {
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
                    setReturnValue(<>transfer</>);
                    break;
                
                default:
                    setReturnValue(<>Error</>);
            }
        }
    }, [state])


    return (
        <>{returnValue}</>
    );
}

export default Moki;