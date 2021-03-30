import { React, Component } from 'react';
import { Send, LoadBalance, MustWhitelist, AccountInfo } from '../component/index'


class Wallet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account: '',
        }

        this.loadData = this.loadData.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        this.setState({
            account: await this.props.account,
        })
    }

    render() {
        return (
            <div className="wallet">
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