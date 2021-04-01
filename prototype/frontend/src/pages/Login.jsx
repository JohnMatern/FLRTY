import { React, Component } from 'react';
import Web3 from "web3";
import { Button } from '@material-ui/core'
import { MOKI, MOKI_ABI, VOTE, VOTE_ABI, WHITELIST, 
        WHITELIST_ABI, STORE, STORE_ABI, DEPLOYPROJECT_ABI, 
        DEPLOYPROJECT, DEPLOYGROUP_ABI, DEPLOYGROUP, 
        MANAGER_ABI, MANAGER, USERDATA_ABI, USERDATA } from '../utils/const';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            account: '',
            web3: '',
            json: '',
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
                this.setState({ isMetaMask: true })
                await window.ethereum.enable();
                await this.setState({ web3: window.web3 });
                console.log("web3: " + this.state.web3);
                await window.web3.eth.getAccounts(async (error, accounts) => {
                    if (accounts.length === 0) {
                        console.log("no active accounts");
                        this.setState({ account: 'undefined' });
                    } else {
                        // it's ok
                        console.log("found account");
                        await this.setState({ account: accounts[0] });
                        console.log(this.state.account)
                        await this.loadData();
                        await this.passData(this.state.json);
                        await this.checkUser();
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
        
    }


    checkUser = async () => {
        if(!this.state.json.isUser) {
            this.props.show("Whitelist");
            return;
        }
        if(this.state.json.username === "") {
            this.props.show("AddUsername");
        } else {
            this.props.show("Projects")
        }
        return;
    }

    loadData = async () => {

        let moki = await new this.state.web3.eth.Contract(MOKI_ABI, MOKI);
        let vote = await new this.state.web3.eth.Contract(VOTE_ABI, VOTE);
        let whitelist = await new this.state.web3.eth.Contract(WHITELIST_ABI, WHITELIST);
        let userdata = await new this.state.web3.eth.Contract(USERDATA_ABI, USERDATA);

        const json = {
            "web3": this.state.web3,
            "account": this.state.account,

            "mokiContract": moki,
            "voteContract": vote,
            "whitelistContract": whitelist,
            "managerContract": new this.state.web3.eth.Contract(MANAGER_ABI, MANAGER),
            "userdataContract": userdata,
            "storeContract": new this.state.web3.eth.Contract(STORE_ABI, STORE),
            "dGroupContract": new this.state.web3.eth.Contract(DEPLOYGROUP_ABI, DEPLOYGROUP),
            "dProjectContract": new this.state.web3.eth.Contract(DEPLOYPROJECT_ABI, DEPLOYPROJECT),

            "username": await userdata.methods.getName(this.state.account).call(),
            "mokiAmount": await moki.methods.balanceOf(this.state.account).call(),
            "voteAmount": await vote.methods.balanceOf(this.state.account).call(),

            "isUser": await whitelist.methods.isUser(this.state.account).call(),
            "isAccessHub": await whitelist.methods.isAccessHub(this.state.account).call(),
            "isAdmin": await whitelist.methods.isAdmin(this.state.account).call(),
        }

        await this.setState({json: json})
        console.log("loadData:")
        console.log(json);
        return;
    }

    passData = async (json) => {
        await this.props.setStateData(json);
    }

    render() {
        return (
            <div className="login">
                <h2>Login</h2>
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