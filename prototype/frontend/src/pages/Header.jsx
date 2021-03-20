import { React, Component } from 'react'; 
import styled from 'styled-components'; 

const Wrapper = styled.section`
  text-align: center; 
`

const Headline = styled.h2`
  color: black; 
`

class Header extends Component {
  
  render() {
    return (
      <Wrapper>       
        <Headline>Flarity Prototyping Weekend  </Headline>
      </Wrapper>
    )
  }
}

export default Header;