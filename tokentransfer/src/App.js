import { Component } from "react";
import { Biconomy } from "@biconomy/mexa";

const { config } = require("./config");
const Web3 = require("web3");
const sigUtil = require("eth-sig-util");

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
 name: config.data.tokenName,
 version: 1,
 chainId: config.data.chainId,
 verifyingContract: config.data.address   
};


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      rcp: ''
    };

    this.getSignatureParameters = this.getSignatureParameters.bind(this);
  }

  send = () => {
    this.executeMetaTransaction();
  }

  onChangeRcp = (e) => {
    e.preventDefault();
    this.setState({rcp: e.target.value});
}

onChangeAmount = (e) => {
    e.preventDefault();
    this.setState({amount: e.target.value});
}

onClickHandler = () => {
    this.send();
} 

metaTransfer = async () => {
  let functionSignature = this.state.contract.methods
    .transfer(this.state.rcp, this.state.amount)
    .encodeABI();
  this.executeMetaTransaction(functionSignature); 
}; 


connect = async () => {
  this.setState({biconomy: await new Biconomy(window.ethereum, { apiKey: config.data.apiKey })});
  this.setState({web3: await new Web3(this.state.biconomy)});
   
  this.state.biconomy.onEvent(this.state.biconomy.READY, async () => {
    // Initialize your dapp here like getting user accounts etc
   
    await window.ethereum.enable();
    this.setState({contract: await new this.state.web3.eth.Contract(config.data.abi, config.data.address)});
  }).onEvent(this.state.biconomy.ERROR, (error, message) => {
    // Handle error while initializing mexa
    console.log(error)
  });
}

componentDidMount = () => {
this.connect();
}



executeMetaTransaction = async (functionSignature) => {
  const accounts = await this.state.web3.eth.getAccounts();
  let userAddress = accounts[0];
  let nonce = await this.state.contract.methods.getNonce(userAddress).call();
  let message = {};
  message.nonce = parseInt(nonce);
  message.from = userAddress;
  message.functionSignature = functionSignature;
  const dataToSign = JSON.stringify({
      types: {
        EIP712Domain: domainType,
        MetaTransaction: metaTransactionType
      },
      domain: domainData,
      primaryType: "MetaTransaction",
      message: message
    });
    this.state.web3.eth.currentProvider.send(
      {
        jsonrpc: "2.0",
        id: 999999999999,
        method: "eth_signTypedData_v4",
        params: [userAddress, dataToSign]
      },
      function(error, response) {
        console.log(response.result)
         let { r, s, v } = this.getSignatureParameters(response.result);

          const recovered = sigUtil.recoverTypedSignature_v4({
            data: JSON.parse(dataToSign),
            sig: response.result
          });
          let tx = this.contract.methods
          .executeMetaTransaction(userAddress, functionSignature,
           r, s, v)
          .send({
            from: userAddress
          });
      }.bind(this)
    );
  };













getSignatureParameters = (signature) => {
  console.log("sig: "+signature)
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
            <input type="text" name="recipient" onChange={this.onChangeRcp}/><br />
            Amount:<br />
            <input type="number" name="amount" onChange={this.onChangeAmount}/><br />
            <button type="submit" value="Submit" onClick={this.onClickHandler}>send</button><br />
          </label>
 
        Recipient Address: {this.state.rcp} <br />
        Amount: {this.state.amount}
      </div>
    );
  }
}

export default App;