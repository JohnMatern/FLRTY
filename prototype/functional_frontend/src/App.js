import React, { Component } from 'react';
import Web3 from 'web3';
import QRCode from 'qrcode.react';
import {data} from "./const.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      account: '0x0'
     };
  }

  componentDidMount = () => {
    this.connect();
  }

  connect = async () => {   
    window.web3 = new Web3(window.ethereum)   // neue web3 instanz
    await window.ethereum.enable();           // aktiviert das metamask browser plugin
    await window.web3.eth.getAccounts((error, accounts) => {    // liest das erste wallet in metamask aus
      if (accounts.length === 0) {
        console.log("no active accounts");
        // there is no active accounts in MetaMask
      } else {
        // it's ok
        console.log("ok");
        this.setState({account: accounts[0], web3: window.web3}); // speichert wallet und web3 instanz im state
      }
    });
    //this.setState({contract: await new window.web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)}); // lädt contract informationen und speichert sie im state
  }



  render() {
    return (
      <div style={{margin:"5px"}}>
        logged in: {this.state.account}
        <hr />
        <b>Anmelden:</b><br/>
        Wallet Adresse: {this.state.account}<br />
        <QRCode value={this.state.account} /> <br />
        Bitte melde dich bei einem AccessHub um deinen Account freizuschalten!

      </div>
    );
  }
}

export default App;
