import { React, Component } from 'react'; 
import styled from 'styled-components'; 

const Wrapper = styled.section`
  background-color: #ff675d; 
  padding: 2em; 
  border-radius: 20px; 
  margin: 1em; 
`

class Footer extends Component {
  
  render() {
    return (
      <Wrapper>    
        <h1>From Flarity Prototype Squad with ❤️</h1>
      </Wrapper>
    )
  }
}

export default Footer;