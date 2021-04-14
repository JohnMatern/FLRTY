import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { Context } from '../../utils/Store'
import { useEffect, useContext, useState } from 'react';
import { useHistory } from "react-router-dom";
import loading from '../../media/loading.gif'
import success from '../../media/success.png'
import err from '../../media/error.png'

const TxModal = (props) => {
  const [state, dispatch] = useContext(Context);
  const [heading, setHeading] = useState('Pending...');
  const [message, setMessage] = useState('Waiting for wallet interaction..');
  const [hash, setHash] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [img, setImg] = useState(loading);
  let history = useHistory();

  const handleClose = async () => {
    await dispatch({ type: 'SET_TX', payload: '' });
    await dispatch({ type: 'SET_MODAL', payload: false });
    history.push(window.location.pathname)
  }
 
  useEffect( async () => {
    state.web3.eth.sendTransaction(state.tx)
    .on("transactionHash", async (h) => {
      console.log("tx hash received");
      setHash(h);
      setMessage(<p>View on <a href={`https://rinkeby.etherscan.io/tx/${hash}`} target="_blank">etherscan</a></p>);
    })
    .on("confirmation", async () => {
      console.log("tx success");
      setHeading('Success');
      setImg(success);
      setBtnDisabled(false);
    })
    .on("error", async (error) => {
      console.log("tx error");
      setHeading('Error');
      setMessage(<><p>Ooops.. something went wrong</p><p>View on <a href={`https://rinkeby.etherscan.io/tx/${hash}`} target="_blank">etherscan</a></p></>)
      setImg(err);
      setBtnDisabled(false);
    })
  
  },[])

  return (
    <>
      <div className="txModal">
        <Dialog
          open={state.modal}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{heading}</DialogTitle>

          <DialogContent>
            <div>
              <center>
                <img src={img} alt="img" style={{ height: "120px", width: "120px" }} /> <br />
                {message} <br />
                <button onClick={handleClose} disabled={btnDisabled}>Close</button>
              </center>
            </div>
          </DialogContent>
        </Dialog>

      </div>
    </>
  );
}

export default TxModal;