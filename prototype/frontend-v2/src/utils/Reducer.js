const Reducer = (state, action) => {
	switch (action.type) {
		case 'SET_INIT':
			return {
				...state,
				init: action.payload
			}
		case 'SET_WEB3':
			return {
				...state,
				web3: action.payload
			};
		case 'SET_PROVIDER':
			return {
				...state,
				provider: action.payload
			};
		case 'SET_ACCOUNT':
			return {
				...state,
				account: action.payload
			};
		case 'SET_MOKI':
			return {
				...state,
				moki: action.payload
			};
		case 'SET_VOTE':
			return {
				...state,
				vote: action.payload
			};
		case 'SET_WHITELIST':
			return {
				...state,
				whitelist: action.payload
			};
		case 'SET_MANAGER':
			return {
				...state,
				manager: action.payload
			};
		case 'SET_USERDATA':
			return {
				...state,
				userdata: action.payload
			};
		case 'SET_STORE':
			return {
				...state,
				store: action.payload
			};
		case 'SET_GROUP':
			return {
				...state,
				group: action.payload
			};
		case 'SET_PROJECT':
			return {
				...state,
				project: action.payload
			};
		case 'SET_USERNAME':
			return {
				...state,
				username: action.payload
			};
		case 'SET_MOKIAMOUNT':
			return {
				...state,
				mokiAmount: Math.round(action.payload / 100).toFixed(2)
			};
		case 'SET_VOTEAMOUNT':
			return {
				...state,
				voteAmount: action.payload
			};
		case 'SET_ISUSER':
			return {
				...state,
				isUser: action.payload
			};
		case 'SET_ISACCESSHUB':
			return {
				...state,
				isAccessHub: action.payload
			};
		case 'SET_ISADMIN':
			return {
				...state,
				isAdmin: action.payload
			};
		case 'SET_MODAL':
			return {
				...state,
				modal: action.payload
			}
		case 'SET_TX':
			return {
				...state,
				tx: action.payload
			}
		case 'SET_INPUTUSERADDRESS':
		return {
			... state,
			inputUserAddress: action.payload
		}
		case 'SET_INPUTMOKIVALUE':
			return {
				...state,
				inputMokiValue: action.payload
			}
		default:
			return state;
	}
};

export default Reducer;