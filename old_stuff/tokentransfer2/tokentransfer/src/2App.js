import React, { useState, useEffect } from "react";
import "react-notifications/lib/notifications.css";
import Web3 from "web3";
import { Component } from "react";
import { Biconomy } from "@biconomy/mexa";
import WalletConnectProvider from "@walletconnect/web3-provider";
let sigUtil = require("eth-sig-util");
const { config } = require("./config");
let provider = new WalletConnectProvider({
  infuraId: "09bab57197a241c0a3f998bb0d80691b",
});

 
const domainType = [
  { name: "name", type: "string" },
  { name: "version", type: "string" },
  { name: "chainId", type: "uint256" },
  { name: "verifyingContract", type: "address" }
];
const metaTransactionType = [
  { name: "nonce", type: "uint256" },
  { name: "from", type: "address" },
  { name: "functionSignature", type: "bytes" }
];
let domainData = {
  name: "TEST",
  version: "1",
  chainId: 4,
  verifyingContract: config.data.address
};
 
let web3, biconomyObj, contract;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      rcp: '',
      web3: 'undefined'
    };
 
    this.getSignatureParameters = this.getSignatureParameters.bind(this);
  }
 
  send = () => {
    this.metaTransfer();
  }
 
  onChangeRcp = (e) => {
    e.preventDefault();
    this.setState({ rcp: e.target.value });
  }
 
  onChangeAmount = (e) => {
    e.preventDefault();
    this.setState({ amount: this.state.web3.utils.toWei(e.target.value, 'ether')});
  }
 
  onClickHandler = () => {
    this.send();
  }
 
  metaTransfer = async () => {
    console.log("rcp: "+this.state.rcp+" amount: "+this.state.amount)
    let functionSignature = this.state.contract.methods
      .transfer(this.state.rcp, this.state.amount)
      .encodeABI();
      console.log("function signature:");
      console.log(functionSignature)
    this.executeMetaTransaction(functionSignature);
  };
 
 
  connect = async () => {
    await provider.enable();
    biconomyObj = new Biconomy(provider, {apiKey: config.data.apiKey});
    //biconomyObj = new Biconomy(window["ethereum"],{apiKey: config.data.apiKey, debug: true});    
    web3 = new Web3(biconomyObj);
    
    biconomyObj.onEvent(biconomyObj.READY, async () => {
      // Initialize your dapp here like getting user accounts etc
      this.setState({ biconomy: biconomyObj});

      this.setState({ web3: web3 });
      //await window.ethereum.enable();

      contract = await new web3.eth.Contract(config.data.abi, config.data.address) ;
      this.setState({ contract: contract});
    }).onEvent(biconomyObj.ERROR, (error, message) => {
      // Handle error while initializing mexa
      console.log(error)
    });

    let accounts= await web3.eth.getAccounts();
    this.setState({account: accounts[0]})
    console.log("logged in as: "+this.state.account)
  }
 
  componentDidMount = () => {
    this.connect();
  }
 
  executeMetaTransaction = async (functionSignature) => {
    let nonce = await this.state.contract.methods.getNonce(this.state.account).call();
    console.log("nonce: "+nonce);
    let message = {};
    message.nonce = parseInt(nonce);
    message.from = this.state.account;
    message.functionSignature = functionSignature;
 
    let stateInstance = this.state;
 
    console.log("message:");
    console.log(message)
 
    const dataToSign = JSON.stringify({
      types: {
        EIP712Domain: domainType,
        MetaTransaction: metaTransactionType
      },
      domain: domainData,
      primaryType: "MetaTransaction",
      message: message
    });
 
    console.log("data to sign:");
    console.log(dataToSign);
 
 
    this.state.web3.eth.currentProvider.send(
      {
        jsonrpc: "2.0",
        id: 999999999999,
        method: "eth_signTypedData_v4",
        params: [message.from, dataToSign]
      },
 
      async function (error, response) {
        let result = await response.result;
        console.log("response result: ")
        console.log(result)
        let { r, s, v } = this.getSignatureParameters(result);
        console.log("r: "+r);
        console.log("s: "+s);
        console.log("v: "+v);
        console.log("ecRecover:")
        stateInstance.web3.eth.personal.ecRecover(message, result);
        const recovered = sigUtil.recoverTypedSignature_v4({
          data: JSON.parse(dataToSign),
          sig: response.result
        });
        console.log(message.from)
        let tx = stateInstance.contract.methods
          .executeMetaTransaction(message.from, functionSignature,
            r, s, v)
          .send({
            from: message.from
          });
          console.log("tx:")
          console.log(tx)
      }.bind(this)
 
    );
 
  }
 
  getSignatureParameters = (signature) => {
    console.log("sig: " + signature)
    if (!this.state.web3.utils.isHexStrict(signature)) {
      throw new Error(
        'Given value "'.concat(signature, '" is not a valid hex string.')
      );
    }
    var r = signature.slice(0, 66);
    var s = "0x".concat(signature.slice(66, 130));
    var v = "0x".concat(signature.slice(130, 132));
    v = this.state.web3.utils.hexToNumber(v);
    if (![27, 28].includes(v)) v += 27;
    console.log("r: "+r);
    console.log("s: "+s);
    console.log("v: "+v);
    return {
      r: r,
      s: s,
      v: v
    };
  };
 
 
  render() {
    return (
      <div class="app">
        <label>
          Recipient Address: <br />
          <input type="text" name="recipient" onChange={this.onChangeRcp} /><br />
            Amount:<br />
          <input type="number" name="amount" onChange={this.onChangeAmount} /><br />
          <button type="submit" value="Submit" onClick={this.onClickHandler}>send</button><br />
        </label>
 
        Recipient Address: {this.state.rcp} <br />
        Amount: {(this.state.web3 !== 'undefined') && this.state.web3.utils.fromWei(this.state.amount,'ether')}
        <br />
      </div>
    );
  }
}
 
export default App;