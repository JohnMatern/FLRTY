import { React, Component } from 'react'; 
import styled from 'styled-components'; 
import { Footer } from '../component/index'; 

const RedWrapper = styled.section`
  width: 30%; 
  background-color: #ff675d; 
  border-radius: 20px; 
  text-align: center; 
  margin-left: 650px;
  padding: 2em; 
  font-family: sans-serif; 
`


class Settings extends Component {
  
  render() {
    return (
      <RedWrapper>       
        <h1>Settings  </h1>
        <br /> 
        <p>Hier sollen Dinge hin, die man einstellen kann. </p>

        <br /> 
        <br /> 

        <p>Zum Beispiel einen Darkmode 😏</p>

        <br /> 
        <br /> 

        <p>Bada bim bada boom!</p>

        <br /> 
        <br /> 

        <p>Oder zb der Umkreis, in dem einen Projekte angezeigt werden koennen. </p>

        <Footer /> 
      </RedWrapper>
    )
  }
}

export default Settings;