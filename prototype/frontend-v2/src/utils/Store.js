import React, {createContext, useReducer} from "react";
import Reducer from './Reducer';

const initialState = {
    init: false,
    web3: '',
    provider: '',
    account: '',
    moki: '',
    vote: '',
    whitelist: '',
    manager: '',
    userdata: '',
    store: '',
    group: '',
    project: '',
    username: '',
    mokiAmount: '',
    voteAmount: '',
    isUser: false,
    isAccessHub: false,
    isAdmin: false,
    modal: false,
    tx: '',
    error: '',
    inputUserAddress: '',
};

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;