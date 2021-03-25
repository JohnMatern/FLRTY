import { React, Component } from 'react'; 


class Header extends Component {
  
  render() {
    return (
      <div className='header'>       
        <h2>Flarity Blockchain Prototype </h2>
        Account: {this.props.account} <br />
        Moki: {this.props.moki} <br />
        Vote: {this.props.vote} <br />
      </div>
    )
  }
}

export default Header;