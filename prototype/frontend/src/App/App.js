import React, { Component } from 'react';
import '../media/Styles/Style.scss';
import { Header, Footer, LoadBalance, Login, Send, MustWhitelist, Projects } from '../component/index'
import { Button,Container } from '@material-ui/core';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      web3: '',
      tokenInstance: '',
      account: '',
      moki: 0.00,
      vote: 0.00,
      recipient: '',
      amount: 0.00,
      addressInfo: '',
      amountInfo: '',
      isUser: false,
    }

    this.setUserAccount = this.setUserAccount.bind(this);
    this.setWeb3 = this.setWeb3.bind(this);
    this.setLoggedIn = this.setLoggedIn.bind(this);

  }

  toggleShowLogin = () => {
    this.setState({
      showLogin: !this.state.showLogin
    })
  }

  setWeb3 = (w) => {
    this.setState({
      web3: w,
    })
  }

  setUserAccount = (a) => {
    this.setState({
      account: a,
    })
  }

  setLoggedIn = () => {
    this.setState({
      isLoggedIn: true,
    })
  }

  setToken = (currency, currencyInstance, vote, voteInstance) => {
    this.setState({
      moki: currency,
      mokiInstance: currencyInstance,
      vote: vote,
      voteInstance: voteInstance,
    })
  }

  setWhitelist = (whitelist) => {
    this.setState({
      whitelist: whitelist
    })
  }  
  
  setStore = (store) => {
    this.setState({
      store: store
    })
  }
  
  setGroupInstance = (group) => {
    this.setState({
      groupInstance: group
    })
  }

  setProjectInstance = (project) => {
    this.setState({
      projectInstance: project
    })
  }
  

  afterLogin = async () => {
    this.setState({
      isUser: await this.state.whitelist.methods.isUser(this.state.account).call()
    })
  }

  render() {

    return (
      <div className="app">
        <Container maxWidth="md" className="appContainer">
          <Header moki={this.state.moki} vote={this.state.vote} account={this.state.account} />
          {!this.state.isLoggedIn &&
            <Login
              setUserAccount={this.setUserAccount}
              setWeb3={this.setWeb3}
              setLoggedIn={this.setLoggedIn}
              setToken={this.setToken}
              setWhitelist={this.setWhitelist}
              setStore={this.setStore}
              setGroupInstance={this.setGroupInstance}
              setProjectInstance={this.setProjectInstance}
              afterLogin={this.afterLogin}
            />}

          {!this.state.isUser && this.state.isLoggedIn && <MustWhitelist account={this.state.account} />}
          {this.state.isUser && this.state.isLoggedIn && <Send />}

          {this.state.isUser && this.state.isLoggedIn && <Projects store={this.state.store} group={this.state.groupInstance} project={this.state.projectInstance}/>}
          <Footer />


        </Container>


      </div>
    )
  }
}

export default App;