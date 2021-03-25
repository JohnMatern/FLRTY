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
      recipient: '',
      amount: '',
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
            <br /> 
            Balance Vote: {this.state.voteBalance}
          </div>

          <div className="send">
            <label className="input">

              <input
                type="text"
                name="recipient"
                required={true}
                placeholder="Recipient address"
                onChange={this.onChangeRcp}
              />

              <br />

              <input
                type="decimal"
                name="amount"
                required={true}
                placeholder="Amount to send"
                onChange={this.onChangeAmount}
              />

              <br />

              <Button
                type="submit"
                value="Submit"
                onClick={this.send}
                icon="Send"
              >
                Send
              </Button>

              <br />
            </label>
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