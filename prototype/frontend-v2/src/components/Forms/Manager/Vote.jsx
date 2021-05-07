import { useEffect, useContext, useState } from 'react';
import { Context } from '../../../utils/Store'
import { MANAGER } from '../../../utils/ContractData';
import { TxModal } from '../../index'

const Vote = (props) => {
  const [state, dispatch] = useContext(Context);

  const [currentVotes, setCurrenVotes] = useState(0);
  const [toVote, setToVote] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [toggleRefresh, setToggleRefresh] = useState(state.modal);
  const [canVote, setCanVote] = useState(false);

  const vote = async () => {
    const data = state.manager.methods.voteForProject(props.address, toVote).encodeABI();
    const args = { from: state.account, to: MANAGER, data };
    await dispatch({ type: 'SET_TX', payload: args });
    await dispatch({ type: 'SET_MODAL', payload: true });
  }

  const calcCurrentVotes = (n) => {
    let result = 0;
    while (n > 0) {
      result = result + Math.pow(n, 2);
      n--;
    }
    return result;
  }

  const loadData = async () => {
    let blockNumber = await state.web3.eth.getBlockNumber();
    let timestamp = await state.web3.eth.getBlock(blockNumber);
    let endDate = await state.project.methods.getEndDate(props.address).call();
    if(endDate > timestamp.timestamp) setCanVote(true);
    let cVotes = await state.store.methods.getVoteHistory(props.address, state.account).call();
    setCurrenVotes(calcCurrentVotes(cVotes));
    let tVote = Math.pow(++cVotes, 2);
    let availableVotes = await state.vote.methods.balanceOf(state.account).call();
    if (availableVotes >= tVote) {
      setToVote(tVote);
      setBtnDisabled(false)
    } else {
      setToVote("nicht genügend")
    }
  }

  const init = async () => {
    if (state.modal != toggleRefresh) {
      setToggleRefresh(state.modal);
      loadData();
    }
    if (currentVotes === "" || toVote === "") {
      loadData();
    }
  }

  useEffect(async () => {
    init();
  }, [btnDisabled, currentVotes, state.modal, canVote])

  return (
    <div>
      <td>
        <th style={{ textAlign: "left", width: "180px" }}>
          Deine bisherigen Stimmen: {currentVotes}
        </th>
        <th style={{ width: "100px" }}>&nbsp;</th>
        <tr style={{ textAlign: "left" }}>
        { !canVote && <td>Votingzeitraum ist abgelaufen.</td>}
        { canVote && <> <td>
            Jetzt abstimmen: {toVote} Votes &nbsp;
          </td>

          <td>
            <button className="" onClick={vote} disabled={btnDisabled}>
              vote
           </button>
          </td> </>}
        </tr>
      </td>
      {state.modal && <TxModal />}
    </div>
  );
}

export default Vote;