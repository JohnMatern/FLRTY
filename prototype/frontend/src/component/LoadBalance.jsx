import { React, Component } from 'react';
import Web3 from "web3";
import { MOKI, MOKI_ABI, VOTE, VOTE_ABI } from '../utils/const';
import M_moki from '../media/img/M_moki.png';


class LoadBalance extends Component {

    constructor(props) {
        super(props);

        this.state = {
            web3: '', 
            account: '', 
            balance: '', 

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
        
        this.setState({
            mokiInstance: await moki,
            mokiBalance: await (Math.round(mokiBalance) / 100).toFixed(2),
            voteInstance: await vote,
            voteBalance: await voteBalance,
        })
        this.props.setBalances(this.state.mokiBalance, this.state.voteBalance);
    }

    render() {
        return (
            <div className="loadBalance" style={{fontSize:'30px'}}>
                Balance: {this.state.balance}
            </div>
        )
    }
}

export default LoadBalance;