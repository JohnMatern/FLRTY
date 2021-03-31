import { React, Component } from 'react';
import { Container } from '@material-ui/core'


class Wallet extends Component {

    render() {
        return (
            <div className="wallet">
                <h1>Wallet</h1>
                {this.props.isUser &&
                    <Container className="walletDetails">
                        Account: {this.props.account} <br />
                        User: {this.props.username} <br />
                        Moki: {this.props.moki} <br />
                        Vote: {this.props.vote} <br />
                    </Container>}
            </div>
        )
    }
}

export default Wallet;