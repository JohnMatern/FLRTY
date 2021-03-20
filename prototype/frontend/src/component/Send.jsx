import { React, Component } from 'react';
import styled from 'styled-components';
import Web3 from "web3";

const StyledInput = styled.input`
    padding: 2em; 
    border-radius: 15px; 
    border: none; 
    margin: 1em; 
    width: 80%; 
`

const StyledButton = styled.button`
    padding: 2em; 
    margin: 1em; 
    border-radius: 15px; 
    border: none; 
    background-color: #ff675d; 
    width: 90%; 
`

class Send extends Component {

    constructor(props) {
        super(props);

        this.state = {
            recipient: '', 
            account: '', 
            amount: '', 
            balance: '', 
        }

        this.send = this.send.bind(this);
    }

    /*
    * send magic
    */
    send = async () => {
        console.log("send();");
        console.log("recipient: " + this.state.recipient);
        console.log("amount" + this.state.amount);

        const account = this.state.account; 

        this.state.tokenInstance.methods.transfer(this.state.recipient, Web3.utils.toWei(this.state.amount))
            .send({
                from: account
            })
            .once('transactionHash', function (hash) {
                console.log(("transactionHash: "));
                console.log(hash);
            })
            .once('receipt', function (receipt) {
                console.log(("receipt: "));
                console.log(receipt);
            })
            .once('confirmation', function (confirmationNumber, receipt) {
                console.log("confirmation");
                console.log("confirmationNumber: " + confirmationNumber);
                console.log("receipt: " + receipt)
            })
            .on('error', console.error); // If a out of gas error, the second parameter is the receipt.

    }

    onChangeRcp = (e) => {
        e.preventDefault();

        const address = e.target.value;

        this.setState({
            recipient: address, 
        })
    }

    onChangeAmount = (e) => {
        e.preventDefault();

        console.log(e.target.value)

        const amount = e.target.value;
        console.log(amount)

        this.setState({
            amount: amount, 
        })
    }

    render() {
        return (
            <div>
                <label className="input">

                    <StyledInput
                        type="text"
                        name="recipient"
                        required={true}
                        placeholder="Recipient address"
                        onChange={this.onChangeRcp}
                    />

                    <br />

                    <StyledInput
                        type="decimal"
                        name="amount"
                        required={true}
                        placeholder="Amount to send"
                        onChange={this.onChangeAmount}
                    />

                    <br />

                    <StyledButton
                        type="submit"
                        value="Submit"
                        onClick={this.send}
                        icon="Send"
                    >
                        Send
                    </StyledButton>

                    <br />
                </label>
            </div>
        )
    }

}

export default Send;