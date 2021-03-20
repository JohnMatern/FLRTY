import { React, Component } from 'react';
import styled from 'styled-components';
import Web3 from "web3";
import { EthAddress } from 'rimble-ui';
import { MFLRTY_ADDRESS, MFLRTY_ABI } from '../utils/const';

const StyledEthAddress = styled(EthAddress)`
    color: #fffd54; 
`


class LoadBalance extends Component {

    constructor(props) {
        super(props);

        this.state = {
            web3: '', 
            account: ''
        }

        this.manageState = this.manageState.bind(this); 
        this.onClickHandler = this.onClickHandler.bind(this); 
        this.loadBalance = this.loadBalance.bind(this); 
    }

    componentDidMount = () => {
        this.manageState(); 
    }

    manageState = async () => {
        this.setState({
            web3: await this.props.web3, 
            account: await this.props.account
        })
    }

    onClickHandler = async (event) => {
        event.preventDefault();
        if (Web3.utils.isAddress(this.state.recipient) && (this.state.amount > 0 && this.state.amount < this.props.balance)) {
            this.setState({ addressInfo: '', amountInfo: '' })
            this.props.send(this.state);
        } else {
            if (!Web3.utils.isAddress(this.state.recipient)) this.setState({ addressInfo: 'address invalid' });
            if (this.state.amount <= 0) this.setState({ amountInfo: 'amount too low' });
            if (this.state.amount > this.props.balance) this.setState({ amountInfo: 'unsifficient funds' });
        }

        this.send();
    }

    /*
   * load actual balance (FLRTY) in decimal and convert in full tokens (FLRTY)
   * save balance in FLRTY to state
   * 
   */
    loadBalance = async () => {

        const contract = new this.state.web3.eth.Contract(MFLRTY_ABI, MFLRTY_ADDRESS)
        const balance = await contract.methods.balanceOf(this.state.account).call()
        console.log(balance)
        this.setState({
            tokenInstance: contract,
            balance: Math.floor(Web3.utils.fromWei(balance, 'ether') * 10000) / 10000
        })

        console.log("tokenInstance: " + this.state.tokenInstance)
        console.log("balance: " + this.state.balance)

    }

    render() {
        return (
            <div>
                <StyledEthAddress address={this.state.account} textLabels />
                <p> Balance: {this.state.balance} FLRTY</p><br />
            </div>
        )
    }
}

export default LoadBalance;