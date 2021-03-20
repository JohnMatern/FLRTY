import { React, Component } from 'react'; 
import styled from 'styled-components'; 

const Wrapper = styled.section`
  background-color: #ff675d; 
  border-radius: 20px; 
  padding: 2em; 
  margin: 1em; 
`


class Header extends Component {
  
  render() {
    return (
      <Wrapper>       
        <h1>Flarity Prototyping Weekend  </h1>
      </Wrapper>
    )
  }
}

export default Header;