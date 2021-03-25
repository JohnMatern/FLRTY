import React, { Component } from 'react';
import '../media/Styles/Style.scss';
import Web3 from "web3";
import { MOKI, MOKI_ABI, VOTE, VOTE_ABI } from '../utils/const';
import { Button } from '@material-ui/core'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      web3: '',
      account: '',
      isMetamask: false,
      balance: '',
      userName: '',
      userRole: '',
      mokiInstance: '',
      mokiBalance: '',
      voteInstance: '',
      voteBalance: '',
      isLoggedIn: false, 
    }

    this.connect = this.connect.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.loadBalance = this.loadBalance.bind(this);
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
        this.setState({ web3: window.web3 });
        console.log("web3: " + this.state.web3);
        await window.web3.eth.getAccounts((error, accounts) => {
          if (accounts.length === 0) {
            console.log("no active accounts");
            this.setState({ account: 'undefined' });
          } else {
            // it's ok
            console.log("found account");
            this.setState({ account: accounts[0] });
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

    this.setState({
      mokiInstance: moki,
      mokiBalance: (Math.round(mokiBalance) / 100).toFixed(2),
      voteInstance: vote,
      voteBalance: voteBalance,
    })
  }

  render() {

    return (
      <div className="app">

        <div className="login">
          <h2>Login</h2>
          <p>Please connect your MetaMask Wallet. </p>
          <br />
          {true && <Button
            onClick={this.connect}
          >
            Connect
            </Button>
          }
          <br />
        </div>

        <br />
        <br />

        <div className="user">
          Username: {this.state.userName}
          <br />
          User Status: {this.state.userRole} {/**User, Access Hub, Admin?  */}
          <br />
          <div className="wallet">
            Balance Moki: {this.state.mokiBalance}
            Balance Vote: {this.state.voteBalance}
          </div>
        </div>

        <br />
        <br />

        <div className="projects">
          <h2>Projects</h2>
          <p>List of Projects</p>
          <br />
          <p>Create Own Project</p>
          <form>
            <label>Name</label>
            <input type='text' />
          </form>
        </div>

        <br />
        <br />
      </div>
    )
  }
}

export default App;