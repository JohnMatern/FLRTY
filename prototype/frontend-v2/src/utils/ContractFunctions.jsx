export const UserData = async (state, func, payload) => {
    //const state = useContext(Context)
    if (state !== null) {
        switch (func) {
            case 'addPhoto':        // argument: string
                return await state.userdata.methods.addPhoto(payload).send({ from: state.account })
            case 'removePhoto':
                return;
            case 'getPhoto':
                return;
            case 'addFriend':
                return;
            case 'removeFriend':
                return;
            case 'getFriends':
                return;
            case 'setName':         // argument: string
                return await state.userdata.methods.setName(payload).send({ from: state.account }).on('transactionHash', (hash) => {
                    console.log("tx Hash: " + hash)
                })
            case 'getName':
                return;
            case 'getAddress':      // argument: name, returns: address
                return await state.userdata.methods.getAddress(payload.toLowerCase()).call();
            default:
                return;
        }
    }
}