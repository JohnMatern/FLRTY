import { React, Component } from 'react'; 
import styled from 'styled-components'; 

const Wrapper = styled.section`
  border-radius: 20px; 
`


class Projects extends Component {
  
  render() {
    return (
      <Wrapper>       
        <h1>Projects  </h1>
      </Wrapper>
    )
  }
}

export default Projects;