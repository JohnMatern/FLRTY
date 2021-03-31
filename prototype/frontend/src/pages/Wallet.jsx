import { React, Component } from 'react';


class Wallet extends Component {

    render() {
        return (
            <div className="wallet">
                <h1>Wallet (send)</h1>
                {this.props.isUser &&
                    <div>
                        Account: {this.props.account} <br />
                        User: {this.props.username} <br />
                        Moki: {this.props.moki} <br />
                        Vote: {this.props.vote} <br />
                    </div>}
            </div>
        )
    }
}

export default Wallet;