import { React, Component } from 'react'; 
import styled from 'styled-components'; 
import { Footer } from '../component/index'; 

const GreenWrapper = styled.section`
  width: 30%; 
  background-color: #119962; 
  border-radius: 20px; 
  text-align: center; 
  margin-left: 650px;
  padding: 2em; 
  font-family: sans-serif; 
`


class Home extends Component {
  
  render() {
    return (
      <GreenWrapper>       
        <h1>Home  </h1>
        <p>Hier sollen aktive Dinge angezeigt werden. Vielleicht eine Art kleines Dashboard. Die letzten Projekte, die man unterstuetzt hat. Oder die aktiven Projekte im Umkreis. </p>
        <Footer /> 
      </GreenWrapper>
    )
  }
}

export default Home;