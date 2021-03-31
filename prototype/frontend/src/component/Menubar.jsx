import { React, Component } from 'react';
import { Settings, AccountBalanceWalletRounded, Menu} from '@material-ui/icons'; 
import { Button } from '@material-ui/core'; 

class Menubar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    onClick = (value) => {
        this.props.show(value);
    }

    render() {
        return (
            <div className='menuBar'>
                <Button
                    onClick={() =>
                        this.onClick("Projectlist")}>
                    <Menu /> 
                </Button>
                <Button
                    onClick={() =>
                        this.onClick("MokiSend")}>
                    <AccountBalanceWalletRounded /> 
                </Button>
                <Button
                    onClick={() =>
                        this.onClick("Menu")}>
                    <Settings /> 
                </Button>
            </div>
        )
    }
}

export default Menubar;