import { React, Component } from 'react';
import { Person, AccountBalanceWalletRounded, Menu} from '@material-ui/icons'; 
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
                        this.onClick("Projects")}>
                    <Menu /> 
                </Button>
                <Button
                    onClick={() =>
                        this.onClick("Wallet")}>
                    <AccountBalanceWalletRounded /> 
                </Button>
                <Button
                    onClick={() =>
                        this.onClick("Menu")}>
                    <Person /> 
                </Button>
            </div>
        )
    }
}

export default Menubar;