import { React, Component } from 'react'; 
import Web3 from "web3"; 
import { Button } from '@material-ui/core'
import { MOKI, MOKI_ABI, VOTE, VOTE_ABI, WHITELIST, WHITELIST_ABI } from '../utils/const';

class Login extends Component {

    constructor(props) {
        super(props); 

        this.state = {
            account: '',
            isMetamask: false, 
        }

        this.connect = this.connect.bind(this); 
        this.passData = this.passData.bind(this); 

    }

    /*
   * metamask button for browser connection
   */
    connect = async () => {
        if (typeof web3 !== 'undefined') {
        console.log("web3 !== undefined");
        window.web3 = new Web3(window.web3.currentProvider)

    // Metamask connection
        if (window.web3.currentProvider.isMetaMask === true) {
            this.setState({isMetaMask: true})
        await window.ethereum.enable();
        this.setState({web3: window.web3});
        console.log("web3: " + this.state.web3);
        await window.web3.eth.getAccounts((error, accounts) => {
            if (accounts.length === 0) {
            console.log("no active accounts");
            this.setState({account: 'undefined'});
            } else {
            // it's ok
            console.log("found account");
            this.setState({account: accounts[0]});
            console.log(this.state.account)
            }
        });
        // for other providers
        } else {
        console.log("other web3 provider");
        // Another web3 provider
        }
        } else {
        alert("Please install browser wallet. e.g. metamask")
        console.log("no web3 provider");
        // No web 3 provider
        }
        await this.loadBalance();
        await this.loadWhitelist();
        await this.passData(); 
        this.props.afterLogin();
    }

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
        
    }

    loadWhitelist = async () => {
        const whitelist = new this.state.web3.eth.Contract(WHITELIST_ABI, WHITELIST)

        await this.setState({
            whitelist: whitelist
        })
    }

    passData = async () => {
        this.props.setUserAccount(this.state.account); 
        this.props.setWeb3(this.state.web3); 
        this.props.setLoggedIn();
        this.props.setToken(this.state.mokiBalance, this.state.mokiInstance, this.state.voteBalance, this.state.voteInstance); 
        this.props.setWhitelist(this.state.whitelist);
    }

    render() {
        return (
            <div>

                <p>Please connect your MetaMask Wallet. </p>
                <br /> 
                <Button 
                    onClick={this.connect} > 
                    Connect 
                </Button> 
                <br /> 
            </div>
            
        )
    }

}

export default Login; 