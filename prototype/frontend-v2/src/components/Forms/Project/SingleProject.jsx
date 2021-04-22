import { RiCheckboxCircleFill } from 'react-icons/ri';
import { HiXCircle } from 'react-icons/hi';
import { VscLoading } from 'react-icons/vsc';
import { useEffect, useContext, useState } from 'react';
import { Context } from '../../../utils/Store'
import { CircularProgress } from '@material-ui/core';
import { useParams } from 'react-router-dom'

// const ProjectPage = () => {
//   let { address } = useParams();
const SingleProject = () => {
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
    <div class="card">
      <div class="card-header">
        {title}
      </div>
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  );
}

export default SingleProject;