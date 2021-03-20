import React, { Component } from 'react'; 

import { FLRTY_ADDRESS, FLRTY_ABI } from '../utils/const'; 


import Web3 from "web3";

class Connect extends Component { 

  constructor(props) {
    super(props)
    this.state = { account: '' }
  }

    
  render() {
      return (
          <div className="connect">
          </div>
      )
  }

}

export default Connect; 