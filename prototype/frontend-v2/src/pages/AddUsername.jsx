import { Context } from '../utils/Store'
import { useEffect, useContext } from 'react';

const AddUsername = () => {
    const [state, dispatch] = useContext(Context);
    useEffect( async () => {
        //console.log(await UserData(state, 'getAddress', 'kurt'))
    })

    return (
        <div className="page">
            AddUsername
        </div>
    );
}

export default AddUsername;