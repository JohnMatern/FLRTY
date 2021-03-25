import React, { Component } from 'react';
import '../media/Styles/Style.scss';
import { Header, Footer, LoadBalance, Login, Send } from '../component/index'
import { Button } from '@material-ui/core';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      web3: '',
      tokenInstance: '',
      account: '',
      balance: 0.00,
      recipient: '',
      amount: 0.00,
      addressInfo: '',
      amountInfo: '',
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

  render() {

    return (
      <div className="app">

        <Header />

        <Login
          setUserAccount={this.setUserAccount}
          setWeb3={this.setWeb3}
          setLoggedIn={this.setLoggedIn}
        />

        <LoadBalance
          web3={this.state.web3}
          account={this.state.account}
        />

        <Send
          web3={this.state.web3}
          account={this.state.account}
        />

        <Footer />

      </div>
    )
  }
}

export default App;