import { React, Component } from 'react'; 
import styled from 'styled-components'; 


const Wrapper = styled.section`
  text-align: center; 
`

const Footline = styled.h2`
  color: black; 
  font-family: 'Atak Bold'; 
`

class Footer extends Component {
  
  render() {
    return (
      <Wrapper>    
        <Footline>from flarity blockchain prototype squad with ❤️ </Footline>
        
      </Wrapper>
    )
  }
}

export default Footer;