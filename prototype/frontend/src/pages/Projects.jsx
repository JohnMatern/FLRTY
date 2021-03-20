import { React, Component } from 'react'; 
import styled from 'styled-components'; 
import { Footer } from '../component/index'; 

const PinkWrapper = styled.section`
  width: 30%; 
  background-color: #e64dc4; 
  border-radius: 20px; 
  text-align: center; 
  margin-left: 650px;
  padding: 2em; 
  font-family: sans-serif; 
`

class Projects extends Component {
  
  render() {
    return (
      <PinkWrapper>       
        <h1>Projects  </h1>
        <p>Und hier wird natuerlich eine List der aktiven Projekte benoetigt! </p>

        <Footer /> 
      </PinkWrapper>
    )
  }
}

export default Projects;