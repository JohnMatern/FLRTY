import { RiCheckboxCircleFill } from 'react-icons/ri';
import { HiXCircle } from 'react-icons/hi';
import { VscLoading } from 'react-icons/vsc';
import { useEffect, useContext, useState } from 'react';
import { Context } from '../../utils/Store'

const AddressField = () => {
  const [state, dispatch] = useContext(Context);
  const [recipient, setRecipient] = useState('');
  const [img, setImg] = useState('');

  useEffect(async () => {
    await dispatch({ type: 'SET_INPUTUSERADDRESS', payload: '' });
  },[])

  const changeHandler = (e) => {
    e.preventDefault();
    let newRecipient = e.target.value;
    setRecipient(newRecipient);
    setImg(<VscLoading />)
    setTimeout( async () => {
      if (newRecipient.includes('0x')) {
        if (!state.web3.utils.isAddress(newRecipient)) {
          setImg(<HiXCircle />)
          dispatch({ type: 'SET_INPUTUSERADDRESS', payload: '' });
        } else {
          setImg(<RiCheckboxCircleFill />)
          dispatch({ type: 'SET_INPUTUSERADDRESS', payload: newRecipient });
        }
      } else {
        let nameAddress = await state.userdata.methods.resolveName(newRecipient).call();
        if (nameAddress === "0x0000000000000000000000000000000000000000") {
          setImg(<HiXCircle />)
          dispatch({ type: 'SET_INPUTUSERADDRESS', payload: '' });
        } else {
          setImg(<RiCheckboxCircleFill />);
          dispatch({ type: 'SET_INPUTUSERADDRESS', payload: newRecipient });
        }
      }
    }, 1000)
  }

  return (
    <>
      <input
        className="input input-long"
        type="text"
        name="recipient"
        value={recipient}
        onChange={changeHandler}
        onFocus={() => setImg(<VscLoading />)}
        onBlur={() => {if(recipient === '') setImg('');} }
      /> <div className={"formStatusIcon"}>{img}</div>
    </>
  );
}

export default AddressField;