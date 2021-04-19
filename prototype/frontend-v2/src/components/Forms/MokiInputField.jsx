import { RiCheckboxCircleFill } from 'react-icons/ri';
import { HiXCircle } from 'react-icons/hi';
import { VscLoading } from 'react-icons/vsc';
import { useEffect, useContext, useState } from 'react';
import { Context } from '../../utils/Store'
let regex = /^(?:[0-9]\d+|\d)(?:\.\d{0,2})?$/;

const MokiInputField = () => {
  const [state, dispatch] = useContext(Context);
  const [amount, setAmount] = useState('');
  const [img, setImg] = useState('');


  const changeHandler = async (e) => {
    e.preventDefault();
    if (e.target.value.includes(',')) {
      newValue = e.target.value.replace(',', '.');
    }
    let newValue = e.target.value;
    setAmount(newValue);
    setImg(<VscLoading />)
    setTimeout(async () => {
      if (regex.test(newValue) && newValue > 0.00) {
        let balance = (await state.moki.methods.balanceOf(state.account).call() / 100
        ).toFixed(2);
        if (newValue*100 > balance*100) {
          setImg(<HiXCircle />)
          dispatch({ type: 'SET_INPUTMOKIVALUE', payload: '' });
        } else {
          setImg(<RiCheckboxCircleFill />);
          dispatch({ type: 'SET_INPUTMOKIVALUE', payload: newValue })
        }
      } else {
        setImg(<HiXCircle />);
        dispatch({ type: 'SET_INPUTMOKIVALUE', payload: '' });
      }
    }, 1000)

  }

  useEffect(async () => {
    await dispatch({ type: 'SET_INPUTMOKIVALUE', payload: '' });
  }, [])


  return (
    <>
      <input
        className="input input-short"
        type="number"
        name="amount"
        value={amount}
        onChange={changeHandler}
        onFocus={() => setImg(<VscLoading />)}
        onBlur={() => { if (amount === '') setImg(''); }}
      /> <div className={"formStatusIcon"}>{img}</div>
    </>
  );
}

export default MokiInputField;