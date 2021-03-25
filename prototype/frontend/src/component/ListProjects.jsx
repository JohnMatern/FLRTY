import { React, Component } from 'react'; 
import styled from 'styled-components'; 
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button } from '@material-ui/core'; 
import Picture from '../media/img/diy_picture.jpg'

class ListProjects extends Component {
  
  constructor (props) {
    super(props); 

    this.state = {
      projects: [], 
    }
  }


  render() {
    return (
      <div className="list_projects">
          <h2>List Projects</h2>
          <div className="project_card"> 
            {this.state.projects.map((project) => 
              <Card>
                <CardActionArea>
                  <CardMedia 
                    image={Picture}
                    title="Title!"
                  />
                  <CardContent>
                    <h3>{project.title}</h3>
                    <p>{project.text}</p>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button>Abstimmen</Button>
                  <Button>Mehr erfahren</Button>
                </CardActions>
              </Card>
            )}
          </div>
      </div>
    )
  }
}

export default ListProjects;