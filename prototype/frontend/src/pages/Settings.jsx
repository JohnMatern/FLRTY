import { React, Component } from 'react'; 
import styled from 'styled-components'; 

const Wrapper = styled.section`
  border-radius: 20px; 
`


class Settings extends Component {
  
  render() {
    return (
      <Wrapper>       
        <h1>Settings  </h1>
      </Wrapper>
    )
  }
}

export default Settings;