import { React, Component } from 'react';
import styled from 'styled-components';
import { Login, Send, LoadBalance, Header, Footer } from '../component/index';
import { Grid } from '@material-ui/core';

const GreenWrapper = styled.section`
  width: 30%; 
  background-color: #fffd54; 
  border-radius: 20px; 
  text-align: center; 
  margin-left: 650px;
  padding: 2em; 
  font-family: sans-serif; 
`

const PinkWrapper = styled.section`
  background-color: #e64dc4; 
  width: 80%; 
  height: 800px; 
  border-radius: 20px; 
  padding: 2em; 
  margin: 1em; 
`

class Wallet extends Component {

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

  setUserAccount = (a) => {
    this.setState({
      account: a,
    })
  }

  setWeb3 = (web3) => {
    this.setState({
      web3: web3,
    })
  }

  setLoggedIn = () => {
    this.setState({
      isLoggedIn: true,
    })
  }


  render() {

    if (!this.state.isLoggedIn) {
      return (
        <div className="wallet">
          <Login
            setUserAccount={this.setUserAccount}
            setWeb3={this.setWeb3}
            setLoggedIn={this.setLoggedIn}
          />
        </div>
      )
    } else {
      return (
        <div className="wallet">
          <Grid
            container
            direction='column'
            justify='center'
            alignItems='center'
          >
            <Grid item xs={12}>
              <h2>Wallet</h2> 
            </Grid>

            <Grid item xs={12}>
              <div className="send">
               <Send
                  web3={this.state.web3}
                  account={this.state.account}
                />
                 <LoadBalance
                  web3={this.state.web3}
                  account={this.state.account}
                />
              </div>
            </Grid>

            <Grid item xs={12}>
              <Footer />
            </Grid>
          </Grid>
        </div>
      )
    }
  }
}

export default Wallet;