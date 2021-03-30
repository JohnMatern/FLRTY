import { React, Component } from 'react';
import list from '../media/img/list.png'
import wallet from '../media/img/wallet.png'
import menu from '../media/img/menu.png'

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
                <button
                    onClick={() =>
                        this.onClick("Projectlist")}>
                    <img src={list} alt="img" width={40} height={30} />
                </button>
                <button
                    onClick={() =>
                        this.onClick("MokiSend")}>
                    <img src={wallet} alt="img" width={40} height={30} />
                </button>
                <button
                    onClick={() =>
                        this.onClick("Menu")}>
                    <img src={menu} alt="img" width={40} height={30} />
                </button>
            </div>
        )
    }
}

export default Menubar;