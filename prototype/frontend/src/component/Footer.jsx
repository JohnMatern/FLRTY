import { React, Component } from 'react'; 
import { Menubar } from "./index.js"

class Footer extends Component {
  constructor(props) {
    super(props); 
    this.state = {}
  }
  render() {
    return (
      <div className='footer'>    
        {this.props.isUser && <Menubar show={this.props.show} /> }  
        <h2>From the Flarity Blockchain Prototype Squad with ❤️ </h2>
      </div>
    )
  }
}

export default Footer;