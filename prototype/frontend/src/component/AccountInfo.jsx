import { React, Component } from 'react';


class AccountInfo extends Component {

  render() {
    return (
      <div className='accountInfo'>
        <h2>Flarity Blockchain Prototype </h2>
        {this.props.isUser &&
          <div>
            Account: {this.props.account} <br />
            User: {this.props.username} <br />
            Moki: {this.props.moki} <br />
            Vote: {this.props.vote} <br />
          </div>}
      </div>
    )
  }
}

export default AccountInfo;