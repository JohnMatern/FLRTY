import { React, Component } from 'react'; 
 
// import { Connect } from '../component/index'
// import Button from '../component/Button'
//import Button from '@material-ui/core/Button';
import Web3 from "web3"; 

import { MetaMaskButton, EthAddress, Button, Input } from 'rimble-ui'; 
import {MFLRTY_ADDRESS, MFLRTY_ABI } from '../utils/const'; 

 
 
class Main extends Component {
 
  constructor(props) {
    super(props); 
    this.state = {
      isLoggedIn: false, 
      web3: 'undefined', 
      tokenInstance: 'undefined', 
      account: 'undefined', 
      balance: 0.00, 
      recipient: 'undefined', 
      amount: 0.00, 
      addressInfo: '',
      amountInfo: ''
    }
    
    this.connect = this.connect.bind(this); 
    this.send = this.send.bind(this); 
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
      await window.ethereum.enable();
      this.setState({web3: window.web3});
      console.log("web3: " + this.state.web3);
      window.web3.eth.getAccounts((error, accounts) => {
        if (accounts.length === 0) {
          console.log("no active accounts");
          // there is no active accounts in MetaMask
          this.setState({account: accounts[0]})
        } else {
          // it's ok
          console.log("found account");
          this.setState({account: accounts[0], isLoggedIn: true});
          console.log(this.state.account);
          this.loadBalance();
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

  /*
   * load actual balance (FLRTY) in decimal and convert in full tokens (FLRTY)
   * save balance in FLRTY to state
   * 
   */
  loadBalance = async () => {
    
    const contract = new this.state.web3.eth.Contract(MFLRTY_ABI, MFLRTY_ADDRESS)
    const blance = await contract.methods.balanceOf(this.state.account).call()
    console.log(blance)
    this.setState({
      tokenInstance: contract, 
      balance: Math.floor(Web3.utils.fromWei(blance, 'ether')*10000)/10000
    })
    
    console.log("tokenInstance: " + this.state.tokenInstance)
    console.log("balance: " + this.state.balance)

  }

  /*
   * send magic
   */
  send = async () => {
    console.log("send();"); 
    console.log("recipient: "+this.state.recipient);
    console.log("amount"+this.state.amount);

    const account = this.state.account

    this.state.tokenInstance.methods.transfer(this.state.recipient, Web3.utils.toWei(this.state.amount))
    .send({
      from: account
    })
    .once('transactionHash', function(hash){
      console.log(("transactionHash: "));
      console.log(hash);
    })
    .once('receipt', function(receipt){
      console.log(("receipt: "));
      console.log(receipt);
    })
    .once('confirmation', function(confirmationNumber, receipt){ 
      console.log("confirmation");
      console.log("confirmationNumber: "+confirmationNumber);
      console.log("receipt: "+receipt)
    })
    .on('error', console.error); // If a out of gas error, the second parameter is the receipt.

  }
 
  onChangeRcp = (e) => {
    e.preventDefault();

    const address = e.target.value; 

    this.setState({
      recipient: address
    })
  }
  
  onChangeAmount = (e) => {
    e.preventDefault();

    console.log(e.target.value)

    const amnt = e.target.value; 
    console.log(amnt)
  
    this.setState({
      amount: amnt
    })
  }

  onClickHandler = async (event) => {
    event.preventDefault();
    if(Web3.utils.isAddress(this.state.recipient) && (this.state.amount > 0 && this.state.amount < this.props.balance)) {
      this.setState({addressInfo: '', amountInfo: ''})
      this.props.send(this.state);
    } else {
      if(!Web3.utils.isAddress(this.state.recipient)) this.setState({addressInfo: 'address invalid'});
      if(this.state.amount <= 0) this.setState({amountInfo: 'amount too low'});
      if(this.state.amount > this.props.balance) this.setState({amountInfo: 'unsifficient funds'});
    }

    this.send(); 
  }

  
  render() {
    return (
      <div className="main">       
        <MetaMaskButton variant="contained" onClick={this.connect}> Connect </MetaMaskButton> <br />
        <p> Is Logged In: {this.state.isLoggedIn ? 'yes' : 'njet'}</p><br />
        <EthAddress address={this.state.account} /> {/*textLabels*/}
        <p> Balance: {this.state.balance} FLRTY</p><br />
          <label className="input">

            <Input 
              type="text" 
              name="recipient" 
              required={true}
              placeholder="Recipient address"
              onChange={this.onChangeRcp}
            />

            <br/> 
            
            <Input 
              type="decimal" 
              name="amount" 
              required={true}
              placeholder="Amount to send"
              onChange={this.onChangeAmount}
            />

            <br/> 

            <Button 
              type="submit" 
              value="Submit" 
              onClick={this.send} 
              icon="Send"
            >
              Send
            </Button>

            <br/> 

          </label>
 
        Recipient Address: {this.state.recipient} <br />
        Amount: {this.state.amount}
 

      </div>
    )
  }
}
 
export default Main;