import { React, Component } from 'react'; 
var QRCode = require('qrcode.react');

class MustWhitelist extends Component {
  
  render() {
    return (
      <div className='header'>       
        Dude, please Whitelist! <br/>
        <QRCode value={this.props.account} size={256}/>
      </div>
    )
  }
}

export default MustWhitelist;