import { React, Component } from 'react';
import { Button } from '@material-ui/core'; 
import { ExitToAppOutlined } from '@material-ui/icons'; 

class Settings extends Component {

    // Logic for Logout is missing

    render() {
        return (
            <div className="settings">
                <h1>Settings</h1>
                <Button startIcon={<ExitToAppOutlined />}>
                    Logout
                </Button>
            </div>
        )    
  }
}

export default Settings;