import { React, Component } from 'react';
import Web3 from "web3";
import { MOKI, MOKI_ABI, VOTE, VOTE_ABI } from '../utils/const';
import M_moki from '../media/img/M_moki.png';


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
        await this.setState({
            web3: await this.props.web3, 
            account: await this.props.account
        })
        this.loadBalance();
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

        const moki = new this.state.web3.eth.Contract(MOKI_ABI, MOKI)
        const vote = new this.state.web3.eth.Contract(VOTE_ABI, VOTE)
        const mokiBalance = await moki.methods.balanceOf(this.state.account).call()
        const voteBalance = await vote.methods.balanceOf(this.state.account).call()
        
        await this.setState({
            mokiInstance: moki,
            mokiBalance: (Math.round(mokiBalance) / 100).toFixed(2),
            voteInstance: vote,
            voteBalance: voteBalance,
        })
        this.props.setBalances(this.state.mokiBalance, this.state.voteBalance);
    }

    render() {
        return (
            <div className="loadBalance" style={{fontSize:'30px'}}>
            </div>
        )
    }
}

export default LoadBalance;