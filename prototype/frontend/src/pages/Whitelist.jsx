import { React, Component } from 'react';
import QRCode from 'qrcode.react';

class Whitelist extends Component {

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
            <div className="whitelist">
                <h1>Please visit an AccessHub to get access</h1> <br />
                <QRCode value={this.props.account} size={256} />
            </div>
        )    
  }
}

export default Whitelist;