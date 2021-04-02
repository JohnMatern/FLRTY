import React, { Component } from 'react';
import '../media/Styles/Style.scss';
import { Header, Footer, Menubar } from '../component/index'
import { Container } from '@material-ui/core';
import { Login, AddUsername, Whitelist, Projects, Settings, Wallet, SingleProject } from '../pages/index'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      web3: '',
      account: '',

      mokiContract: '',
      voteContract: '',
      whitelistContract: '',
      managerContract: '',
      userdataContract: '',
      storeContract: '',
      dProjectContract: '',
      dGroupContract: '',

      username: '',
      mokiAmount: '',
      voteAmount: '',

      isUser: false,
      isAccessHub: false,
      isAdmin: false,

      toggle: true,
      address: '0',
      show: {
        Login: true,
        AddUsername: false,
        Projects: false,
        SingleProject: false,
        MokiReceive: false,
        Wallet: false,
        Groups: false,
        GroupDetails: false,
        AddUser: false,
        AddAccessHub: false,
        Whitelist: false,
        Menu: false,
      }
    }
    this.show = this.show.bind(this);

  }

  // example:
  // toShow = "AddUsername"
  // shows AddUsername page
  show = (toShow) => {
    console.log("show me: " + toShow)
    Object.keys(this.state.show).forEach((key => {
      this.state.show[key] = false;                 // just for interest: an dieser stelle funktioniert this.setState(..) nicht, wieso auch immer :D
    }))
    this.state.show[toShow] = true;
    this.setState({ toggle: !this.state.toggle })
    console.log(this.state.show)
  }

  // example: 
  // key = account
  // value = "0x1234567890..."
  // sets this.state.account to "0x1234567890..."
  setKey = (key, value) => {
    this.setState({ toShow: value });
    return;
  }

  // sets all data to state after login
  setStateData = async (json) => {
    this.setState({
      web3: json.web3,
      account: json.account,

      mokiContract: json.mokieContract,
      voteContract: json.voteContract,
      whitelistContract: json.whitelistContract,
      managerContract: json.managerContract,
      userdataContract: json.userdataContract,
      storeContract: json.storeContract,
      dProjectContract: json.dProjectContract,
      dGroupContract: json.dGroupContract,

      username: json.username,
      mokiAmount: json.mokiAmount,
      voteAmount: json.voteAmount,

      isUser: json.isUser,
      isAccessHub: json.isAccessHub,
      isAdmin: json.isAdmin,
    })
  }

  // saves the address for specific group or project detailpages 
  addressHandler = (address) => {
    this.setState({ address: address })
  }

  render() {

    return (
      <div className="app">
        <Container maxWidth="md" className="appContainer">
          <Header />

          {this.state.show.Login &&
            <Login
              show={this.show}
              setStateData={this.setStateData}
            />}



          {this.state.show.Whitelist &&
            <Whitelist
              account={this.state.account}
            />}

          {this.state.show.AddUsername &&
            <AddUsername
              show={this.show}
              setKey={this.setKey}
              web3={this.state.web3}
              account={this.state.account}
              userdataContract={this.state.userdataContract}
            />}

          {this.state.show.Projects &&
            <Projects
              show={this.show}
              web3={this.state.web3}
              store={this.state.storeContract}
              group={this.state.dGroupContract}
              project={this.state.dProjectContract}
              vote={this.state.voteContract}
              addressHandler={this.addressHandler} />
          }
          {this.state.show.SingleProject &&
            <SingleProject
              web3={this.state.web3}
              account={this.state.account}
              store={this.state.storeContract}
              group={this.state.dGroupContract}
              project={this.state.dProjectContract}
              vote={this.state.voteContract}
              manager={this.state.managerContract}
              address={this.state.address} />
          }

          {this.state.show.Wallet &&
            <Wallet
              moki={this.state.mokiAmount}
              vote={this.state.voteAmount}
              account={this.state.account}
              username={this.state.username}
              isUser={this.state.isUser}
            />
          }
          {this.state.show.Menu &&
            <Settings />
          }

          <br />

          {this.state.isUser &&
            <Menubar
              show={this.show}
              isUser={this.state.isUser}
            />}

          <Footer />
        </Container>


      </div>
    )
  }
}

export default App;