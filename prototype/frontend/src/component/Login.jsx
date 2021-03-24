import { React, Component } from 'react'; 
import Web3 from "web3"; 
import { MetaMaskButton} from 'rimble-ui'; 

class Login extends Component {

    constructor(props) {
        super(props); 

        this.state = {
            account: '',
            isMetamask: false, 
        }

        this.connect = this.connect.bind(this); 
        this.passData = this.passData.bind(this); 

    }

    /*
   * metamask button for browser connection
   */
    connect = async () => {
        if (typeof web3 !== 'undefined') {
        console.log("web3 !== undefined");
        window.web3 = new Web3(window.web3.currentProvider)

    // Metamask connection
        if (window.web3.currentProvider.isMetaMask === true) {
            this.setState({isMetaMask: true})
        await window.ethereum.enable();
        this.setState({web3: window.web3});
        console.log("web3: " + this.state.web3);
        await window.web3.eth.getAccounts((error, accounts) => {
            if (accounts.length === 0) {
            console.log("no active accounts");
            this.setState({account: 'undefined'});
            } else {
            // it's ok
            console.log("found account");
            this.setState({account: accounts[0]});
            console.log(this.state.account)
            }
        });
        // for other providers
        } else {
        console.log("other web3 provider");
        // Another web3 provider
        }
        } else {
        alert("Please install browser wallet. e.g. metamask")
        console.log("no web3 provider");
        // No web 3 provider
        }

        await this.passData(); 
    }

    passData = async () => {
        this.props.setUserAccount(this.state.account); 
        this.props.setWeb3(this.state.web3); 
        this.props.setLoggedIn(); 

    }

    componentDidMount = () => {
        this.connect();
    }

    render() {
        return (
            <div>

                <p>Please connect your MetaMask Wallet. </p>
                <br /> 
                {false && <MetaMaskButton 
                    variant="contained" 
                    onClick={this.connect}

                > 
                    Connect 
                </MetaMaskButton> }
                <br /> 
            </div>
            
        )
    }

}

export default Login; 