import React, { Component } from 'react';
import '../media/Styles/Style.scss'

class App extends Component {

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
      </div>
    )
  }
}

export default App;