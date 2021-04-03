import { React, Component } from 'react';
import Web3 from "web3";
import {Button} from '@material-ui/core'; 

class Receive extends Component {

    constructor(props) {
        super(props);

        this.state = {
            recipient: '', 
            account: '', 
            amount: '', 
            balance: '', 
        }

    }
    render() {
        return (
            <div className="send">
                <h2>Receive</h2>
                QR Code Magic
            </div>
        )
    }

}

export default Receive;