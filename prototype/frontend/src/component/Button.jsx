import React, { Component } from 'react';
import Butten from '@material-ui/core/Button';

import Connect from './Connect'

class Button extends Component {

    constructor(props) {
        super(props); 
        this.state = {
            isLoggedIn: true, 
            account: ''
        }

        this.handleClick = this.handleClick.bind(this); 
    }

    handleClick(e) {
        this.setState(state => ({
            isLoggedIn: !state.isLoggedIn
          }));
    }

    render() {
        return (
            <div className="button">
                <Butten 
                    variant="contained"
                    onClick={this.handleClick}
                >{this.props.content}</Butten>{this.state.isLoggedIn ? 'Stuff' : 'Please log into your crypto wallet. '}
            </div>
        );
    }
}
export default Button;