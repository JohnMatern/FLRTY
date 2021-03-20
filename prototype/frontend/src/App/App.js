import { React, Component } from 'react'; 
import '../media/Style.scss';

import { Footer, Header, Main } from '../pages/index';

class App extends Component {
  
  render() {
    return (
      <div className="app">       
        <Header /> 
        <Main /> 
        <Footer /> 
      </div>
    )
  }
}

export default App;