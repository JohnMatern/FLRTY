import { React, Component } from 'react';
import styled from 'styled-components'; 
import { Login, Send, LoadBalance } from '../component/index'; 

const Wrapper = styled.section`
  background-color: #e64dc4; 
  height: 800px; 
  width: 80%; 
  border-radius: 20px; 
  padding: 2em; 
  margin: 1em; 
`

class Main extends Component {

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
      return <Login
        setUserAccount={this.setUserAccount}
        setWeb3={this.setWeb3}
        setLoggedIn={this.setLoggedIn}
      />
    } else {
      return (
        <Wrapper>

          <LoadBalance
            web3={this.state.web3}
            account={this.state.account}
          />

          <Send
            web3={this.state.web3}
            account={this.state.account}
          />
        </Wrapper>
      )
    }
  }
}

export default Main;