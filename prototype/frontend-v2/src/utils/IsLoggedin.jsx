import { Context } from './Store'
import { useContext } from 'react';
import { Redirect } from 'react-router';

const IsLoggedin = () => {
    const [state, dispatch] = useContext(Context);
    if (state === 'undefined' || state.account === '') { 
        return <Redirect push to="/login" />
    } 
    return <></>
}

export default IsLoggedin;