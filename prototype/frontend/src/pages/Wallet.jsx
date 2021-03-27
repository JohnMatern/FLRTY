import { React, Component } from 'react';
import { Send, LoadBalance, MustWhitelist } from '../component/index'


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

    loadData = async() => {
        this.setState({
            account: await this.props.account, 
        })
    }

    render() {
        return (
            <div>
                <LoadBalance />
                <Send />
                <MustWhitelist account={this.state.account}/> 
            </div>
        )    
  }
}

export default Wallet;