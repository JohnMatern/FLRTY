import { React, Component } from 'react'; 
import styled from 'styled-components'; 

const Wrapper = styled.section`
  border-radius: 20px; 
`


class Wallet extends Component {
  
  render() {
    return (
      <Wrapper>       
        <h1>Wallet  </h1>
      </Wrapper>
    )
  }
}

export default Wallet;