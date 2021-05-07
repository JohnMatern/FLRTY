import { useEffect, useContext, useState } from 'react';
import { Context } from '../../../utils/Store'
import { MANAGER } from '../../../utils/ContractData';
import { TxModal } from '../../index'

const EndProject = (props) => {
  const [state, dispatch] = useContext(Context);
  const [canEnd, setCanEnd] = useState(false);

  const end = async () => {
    const data = state.manager.methods.endProject(props.address).encodeABI();
    const args = { from: state.account, to: MANAGER, data };
    await dispatch({ type: 'SET_TX', payload: args });
    await dispatch({ type: 'SET_MODAL', payload: true });
  }

  const init = async () => {
    let blockNumber = await state.web3.eth.getBlockNumber();
    let timestamp = await state.web3.eth.getBlock(blockNumber);
    let endDate = await state.project.methods.getEndDate(props.address).call();
    let projectCreator = await state.project.methods.getCreator(props.address).call();
    if(endDate < timestamp.timestamp && projectCreator == state.account) setCanEnd(true);
  }

  useEffect(async () => {
    init();
  }, [state.modal, canEnd])

  return (
    <div style={{ textAlign: "left", width: "98%" }}>
        { canEnd &&<>
            Projekt beenden: &nbsp;

            <button className="" onClick={end}>
              beenden
           </button> </>}
      {state.modal && <TxModal />}
    </div>
  );
}

export default EndProject;