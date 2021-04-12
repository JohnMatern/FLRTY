import { React, Component } from 'react';
import { Button } from '@material-ui/core'; 
import { ExitToAppOutlined } from '@material-ui/icons'; 

class Menu extends Component {

    // Logic for Logout is missing


    show = (s) => {
        this.props.show(s);
    }

    render() {
        return (
            <div className="settings">
                <h1>Menu</h1>
                <a href="#" onClick={() => { this.show("MyProjects") }}>My Projects</a><br />
                <a href="#" onClick={() => { this.show("MyGroups") }}>My Groups</a><br />
                
                <Button startIcon={<ExitToAppOutlined />}>
                    Logout
                </Button>
            </div>
        )    
  }
}

export default Menu;