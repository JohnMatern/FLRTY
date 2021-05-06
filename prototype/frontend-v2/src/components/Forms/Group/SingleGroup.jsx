import { RiCheckboxCircleFill } from 'react-icons/ri';
import { HiXCircle } from 'react-icons/hi';
import { VscLoading } from 'react-icons/vsc';
import { useEffect, useContext, useState } from 'react';
import { Context } from '../../../utils/Store'
import { CircularProgress } from '@material-ui/core';
import { useParams } from 'react-router-dom'

// const ProjectPage = () => {
//   let { address } = useParams();
const SingleGroup = () => {
  let { address } = useParams();
  const [state, dispatch] = useContext(Context);
  const [code, setCode] = useState("");
  const [img, setImg] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);

  const [title, setTitle] = useState(address);

  const changeHandler = async (e) => {
    e.preventDefault();
    let newValue = e.target.value;
    setCode(newValue);
    setImg(<VscLoading />)
    setTimeout(async () => {

      if (!true) {
        setImg(<HiXCircle />) // code invalid
        setBtnDisabled(true);
      } else {
        setImg(<RiCheckboxCircleFill />);
        setBtnDisabled(false);
      }
    }, 1000)
  }

  const send = async () => {
    const data = state.whitelist.methods.addUserByCode(code).encodeABI();
    const args = { from: state.account, to: '', data };
    await dispatch({ type: 'SET_TX', payload: args });
    await dispatch({ type: 'SET_MODAL', payload: true });
  }

  useEffect(async () => {

  }, [code, img, btnDisabled])

  if (title === '') {
    return (
      <CircularProgress />
    )
  }
  return (
    <div className="card">
      <div className="card-header">
        {title}
      </div>
      <div className="card-body">
        <h5 className="card-title">Special title treatment</h5>
        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" className="btn btn-primary">Go somewhere</a>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        a<br />
        <br />
        <br />
        b<br />
        <br />
        <br />
        <br />
        c<br />
        <br />
        <br />
        <br />
        d<br />
        <br />
        <br />
        <br />
        e<br />
        <br />
        <br />
        <br />
        f<br />
        <br />
        <br />
        <br />
        <br />
        g<br />
        <br />
        <br />
        <br />
        h
      </div>
    </div>
  );
}

export default SingleGroup;