import { React, Component } from 'react'; 
import { Footer, CreateProject, ListProjects } from '../component/index'; 


class Projects extends Component {
  
  render() {
    return (
      <div className="projects">       
        <h1>Projects  </h1>
        <p>Und hier wird natuerlich eine List der aktiven Projekte benoetigt! </p>
        <ListProjects /> 
        <CreateProject /> 
        <Footer /> 
      </div>
    )
  }
}

export default Projects;