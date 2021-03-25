import { React, Component } from 'react'; 
import { Footer } from '../component/index'; 



class Settings extends Component {
  
  render() {
    return (
      <div className="settings">       
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
      </div>
    )
  }
}

export default Settings;