import React, { Component } from 'react';
import '../media/Styles/Style.scss'

class App extends Component {

  constructor(props) {
    super(props); 

    this.state = {
      web3: '', 
      account: '', 
      balance: '', 
      userName: '', 
      userRole: '', 
    }
  }

  render() {

    return (
      <div className="app">
        <div className="login">
          <h2>Login</h2>
          <button>Connect with wallet here</button>
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
        <div className="user">
          Username: {this.state.userName}
          <br/>
          User Status: {this.state.userRole} {/**User, Access Hub, Admin?  */}
          <br/>
          <div className="wallet">
            Balance Moki: {this.state.balanceMoki}
            Balance Vote: {this.state.balanceVote}
          </div>
        </div>
      </div>
    )
  }
}

export default App;